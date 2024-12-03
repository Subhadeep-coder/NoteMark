import { app, BrowserWindow, dialog, WebFrameMain } from "electron";
import { fileEncoding, welcomeFileName } from "../../shared/constants";
import { NoteInfo } from "../../shared/models";
import { ChangeStorage, ChangeTheme, CreateNote, DeleteNote, FrameWindowAction, GetNotes, GetStorage, GetTheme, ReadNote, WriteNote } from "../../shared/types";
import { copyFile, ensureDir, ensureFile, mkdir, readdir, readFile, remove, stat, writeFile } from "fs-extra";
import path from "path";
import { isEmpty } from 'lodash';
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset';

export const getRootDir = async () => {
    const basePath = app.getAppPath();
    const resources = path.join(basePath, "resources");
    const configFolder = path.join(resources, "config");
    const settingsFile = path.join(configFolder, "settings.json");
    const exists = await stat(settingsFile).then(() => true).catch(() => false);
    if (!exists) {
        await mkdir(configFolder, { recursive: true });
        const defaultContent = {
            theme: "DARK",
            basePath: resources,
        };
        await ensureFile(settingsFile);
        await writeFile(settingsFile, JSON.stringify(defaultContent, null, 2), { encoding: fileEncoding });
    }
    const fileContents = await readFile(settingsFile, { encoding: fileEncoding });
    const data = JSON.parse(fileContents);
    return data["basePath"];
}

export const getNotes: GetNotes = async () => {
    const rootDir = await getRootDir();
    await ensureDir(rootDir);
    const notesFileNames = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false,
    });

    const notes = notesFileNames.filter((filename) => filename.endsWith(".md"));

    if (isEmpty(notes)) {
        const content = await readFile(welcomeNoteFile, { encoding: fileEncoding });

        await writeFile(`${rootDir}/${welcomeFileName}`, content, { encoding: fileEncoding });
        notes.push(welcomeFileName);
    }

    return Promise.all(notes.map(getNoteInfo));
}

export const getNoteInfo = async (filename: string): Promise<NoteInfo> => {
    const fileStats = await stat(`${await getRootDir()}/${filename}`);

    return {
        title: filename.replace(/\.md$/, ''),
        lastEditTime: fileStats.mtimeMs
    };
}

export const readNote: ReadNote = async (filename: string) => {
    const rootDir = await getRootDir();
    return readFile(`${rootDir}/${filename}.md`, {
        encoding: fileEncoding
    });
}

export const writeNote: WriteNote = async (filename, content) => {
    const rootDir = await getRootDir();

    return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding });
}

export const createNote: CreateNote = async () => {
    const rootDir = await getRootDir();
    await ensureDir(rootDir);

    const { canceled, filePath } = await dialog.showSaveDialog({
        title: "New Note",
        defaultPath: `${rootDir}/Untitled.md`,
        buttonLabel: 'Create',
        properties: ["showOverwriteConfirmation"],
        showsTagField: false,
        filters: [
            {
                name: "Markdown",
                extensions: ["md"]
            }
        ]
    });

    if (canceled || !filePath) {
        return false;
    }

    const { name: filename, dir: parentDir } = path.parse(filePath);

    if (parentDir !== rootDir) {
        await dialog.showMessageBox({
            type: "error",
            title: "Note Creation Failed",
            message: `All notes must be saved under ${rootDir}.
            Avoid using other directories!`
        });
        return false;
    }

    await writeFile(filePath, "", { encoding: fileEncoding });

    return filename;
}

export const deleteNote: DeleteNote = async (filename) => {
    const rootDir = await getRootDir();

    const { response } = await dialog.showMessageBox({
        type: "warning",
        title: "Delete Note",
        message: `Are you sure you want to delete ${filename}`,
        buttons: ["Delete", "Cancel"],
        defaultId: 1,
        cancelId: 1
    });

    if (response === 1) {
        return false;
    }

    await remove(`${rootDir}/${filename}.md`);
    return true;
}

export function isDev(): boolean {
    return process.env.NODE_ENV === 'development';
}

export function validateEventFrom(frame: WebFrameMain) {
    if (isDev() && new URL(frame.url).host === "localhost:5173") {
        return;
    }
    // if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    //     throw new Error("Malicious event");
    // }
}

export const handleFrameActions = (action: FrameWindowAction, mainWindow: BrowserWindow) => {
    switch (action) {
        case "CLOSE":
            mainWindow.close();
            break;
        case "MAXIMIZE":
            mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
            break;
        case "MINIMIZE":
            mainWindow.minimize();
            break;
    }
}

export const changeTheme: ChangeTheme = async (theme) => {
    const rootDir = await getRootDir();
    await ensureDir(path.join(rootDir, "config"));
    const filePath = path.join(rootDir, "config", "settings.json");
    await ensureFile(filePath);
    const configFileContents = await readFile(filePath, {
        encoding: fileEncoding,
    });

    let content = {};
    if (configFileContents) {
        content = JSON.parse(configFileContents);
    }
    content["theme"] = theme;
    await writeFile(filePath, JSON.stringify(content, null, 2), { encoding: fileEncoding });
}

export const getTheme: GetTheme = async () => {
    const rootDir = await getRootDir();
    await ensureDir(path.join(rootDir, "config"));
    const filePath = path.join(rootDir, "config", "settings.json");
    await ensureFile(filePath);

    const configFileContents = await readFile(filePath, {
        encoding: fileEncoding,
    });
    let content = {};
    if (configFileContents) {
        content = JSON.parse(configFileContents);
    }

    return content["theme"];
}

export const changeStorage: ChangeStorage = async () => {

    const { canceled, filePaths } = await dialog.showOpenDialog({
        title: "Select Folder",
        properties: ["createDirectory", "openDirectory"],
        message: "Please select a folder to store your data"
    });

    if (canceled) {
        console.log("Folder selection was canceled.");
        return "";
    }

    const selectedFolderPath = filePaths[0];
    console.log("Selected folder:", selectedFolderPath);

    const { response } = await dialog.showMessageBox({
        title: "Confirm Folder Selection",
        message: `You selected the folder:\n${selectedFolderPath}\n\nDo you want to proceed?`,
        buttons: ["Confirm", "Cancel"],
        defaultId: 0,
        cancelId: 1,
        type: "question",
    });

    if (response === 1) {
        console.log("Folder selection was canceled by the user.");
        return "";
    }
    console.log("Folder confirmed. Proceeding with additional actions...");
    const basePath = await getRootDir();
    await mkdir(selectedFolderPath, { recursive: true });
    const newBasePath = path.join(selectedFolderPath, "resources");
    await copyFolders(basePath, newBasePath);
    const content = JSON.parse(await readFile(path.join(newBasePath, "config", "settings.json"), { encoding: fileEncoding }));
    content["basePath"] = newBasePath;
    await writeFile(path.join(newBasePath, "config", "settings.json"), JSON.stringify(content, null, 2), { encoding: fileEncoding });
    return newBasePath;
}

const copyFolders = async (source: string, destination: string) => {
    const entries = await readdir(source, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(source, entry.name);
        const destPath = path.join(destination, entry.name);

        if (entry.isDirectory()) {
            await mkdir(destPath, { recursive: true });

            await copyFolders(srcPath, destPath);
        } else if (entry.isFile()) {
            await copyFile(srcPath, destPath);
        }
    }
}

export const getStorage: GetStorage = async () => {
    return await getRootDir();
}
import { dialog } from "electron";
import { appDirectoryName, fileEncoding, welcomeFileName } from "../../shared/constants";
import { NoteInfo } from "../../shared/models";
import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from "../../shared/types";
import { ensureDir, readdir, readFile, remove, stat, writeFile } from "fs-extra";
import { homedir } from "os"
import path from "path";
import { isEmpty } from 'lodash';
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset';

export const getRootDir = () => {
    return path.join(homedir(), appDirectoryName);
}

export const getNotes: GetNotes = async () => {
    const rootDir = getRootDir();
    await ensureDir(rootDir);
    const notesFileNames = await readdir(rootDir, {
        encoding: fileEncoding,
        withFileTypes: false,
    });

    const notes = notesFileNames.filter((filename) => filename.endsWith(".md"));

    if (isEmpty(notes)) {
        console.info('No Notes found!');
        const content = await readFile(welcomeNoteFile, { encoding: fileEncoding });

        await writeFile(`${rootDir}/${welcomeFileName}`, content, { encoding: fileEncoding });
        notes.push(welcomeFileName);
    }

    return Promise.all(notes.map(getNoteInfo));
}

export const getNoteInfo = async (filename: string): Promise<NoteInfo> => {
    const fileStats = await stat(`${getRootDir()}/${filename}`);

    return {
        title: filename.replace(/\.md$/, ''),
        lastEditTime: fileStats.mtimeMs
    };
}

export const readNote: ReadNote = async (filename: string) => {
    const rootDir = getRootDir();
    return readFile(`${rootDir}/${filename}.md`, {
        encoding: fileEncoding
    });
}

export const writeNote: WriteNote = async (filename, content) => {
    const rootDir = getRootDir();

    console.info(`Writing note with the filename: ${filename}`);

    return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding });
}

export const createNote: CreateNote = async () => {
    const rootDir = getRootDir();
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
        console.info(`Note Creation Cancelled`);
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

    console.info(`Creating note: ${filePath}`);

    await writeFile(filePath, "", { encoding: fileEncoding });

    return filename;
}

export const deleteNote: DeleteNote = async (filename) => {
    const rootDir = getRootDir();

    const { response } = await dialog.showMessageBox({
        type: "warning",
        title: "Delete Note",
        message: `Are you sure you want to delete ${filename}`,
        buttons: ["Delete", "Cancel"],
        defaultId: 1,
        cancelId: 1
    });

    if (response === 1) {
        console.info('Note deletion cancelled');
        return false;
    }

    console.info(`Deleting Note: ${filename}`);
    await remove(`${rootDir}/${filename}.md`);
    return true;
}
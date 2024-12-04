import { ChangeFont, ChangeStorage, ChangeTheme, CreateNote, DeleteNote, FrameAction, GetFont, GetNotes, GetStorage, GetTheme, ReadNote, WriteNote } from "@shared/types";
import { contextBridge, ipcRenderer } from "electron";

if (!process.contextIsolated) {
  throw new Error(`contextIsolation must be enabled in the BrowserWindow`);
}


try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke("get:notes", ...args),
    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke("read:note", ...args),
    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke("write:note", ...args),
    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke("create:note", ...args),
    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke("delete:note", ...args),
    frameAction: (...args: Parameters<FrameAction>) => ipcRenderer.invoke("frame:action", ...args),
    changeTheme: (...args: Parameters<ChangeTheme>) => ipcRenderer.invoke("change:theme", ...args),
    getTheme: (...args: Parameters<GetTheme>) => ipcRenderer.invoke("get:theme", ...args),
    changeLocation: (...args: Parameters<ChangeStorage>) => ipcRenderer.invoke("change:location", ...args),
    getLocation: (...args: Parameters<GetStorage>) => ipcRenderer.invoke("get:location", ...args),
    changeFont: (...args: Parameters<ChangeFont>) => ipcRenderer.invoke("change:font", ...args),
    getFont: (...args: Parameters<GetFont>) => ipcRenderer.invoke("get:font", ...args),
  })
} catch (error) {
  console.log(error);
}
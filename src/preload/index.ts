import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from "@shared/types";
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
  })
} catch (error) {
  console.log(error);
}
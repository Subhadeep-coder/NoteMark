import { ElectronAPI } from '@electron-toolkit/preload'
import { ChangeStorage, ChangeTheme, CreateNote, DeleteNote, FrameAction, GetNotes, GetStorage, GetTheme, ReadNote, WriteNote } from '@shared/types'

declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      locale: string,
      getNotes: GetNotes,
      readNote: ReadNote,
      writeNote: WriteNote,
      createNote: CreateNote,
      deleteNote: DeleteNote,
      frameAction: FrameAction,
      changeTheme: ChangeTheme,
      getTheme: GetTheme,
      changeLocation: ChangeStorage,
      getLocation: GetStorage,
    }
  }
}

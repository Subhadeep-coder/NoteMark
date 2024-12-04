import { ElectronAPI } from '@electron-toolkit/preload'
import { ChangeFont, ChangeStorage, ChangeTheme, CreateNote, DeleteNote, FrameAction, GetFont, GetNotes, GetStorage, GetTheme, ReadNote, WriteNote } from '@shared/types'

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
      changeFont: ChangeFont
      getFont: GetFont,
    }
  }
}

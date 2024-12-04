import { NoteContent, NoteInfo } from "./models";

export type GetNotes = () => Promise<NoteInfo[]>;
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>;
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>;
export type CreateNote = () => Promise<NoteInfo['title'] | false>;
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>;
export type FrameAction = (action: FrameWindowAction) => void;
export type FrameWindowAction = "CLOSE" | "MAXIMIZE" | "MINIMIZE";
export type SettingsTab = "THEME" | "LOCATION" | "FONT";
export type Themes = "BLUE" | "ORANGE" | "PURPLE" | "GREEN" | "DARK" | "LIGHT" | "GLASS";
export type ChangeTheme = (theme: Themes) => Promise<void>;
export type GetTheme = () => Promise<Themes>;
export type ChangeStorage = () => Promise<string>;
export type GetStorage = () => Promise<string>;
export type Fonts = "INTER" | "ROBOTO" | "OPEN_SANS" | "MONTSERRAT" | "LATO" | "POPPINS" | "NUNITO" | "RALEWAY" | "UBUNTU" | "YUJI_MAI" | "PLAYFAIR_DISPLAY" | "HACHI_MARU_POP" | "MONO";
export type ChangeFont = (font: Fonts) => Promise<void>;
export type GetFont = () => Promise<Fonts>;
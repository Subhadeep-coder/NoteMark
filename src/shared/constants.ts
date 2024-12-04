export const appDirectoryName = "NoteMark";
export const fileEncoding = "utf8";
export const autosaveTime = 3000;
export const welcomeFileName = "Welcome.md";
export enum SettingsTab {
    THEME = "THEME",
    LOCATION = "LOCATION",
    FONT = "FONT"
};
export const settingsList = [
    {
        id: 0,
        title: "Theme",
        enum: SettingsTab.THEME
    },
    {
        id: 1,
        title: "File Location",
        enum: SettingsTab.LOCATION
    },
    {
        id: 2,
        title: "Font",
        enum: SettingsTab.FONT
    },
];
export const themeColors = {
    BLUE: '#3b82f6',
    ORANGE: '#f97316',
    DARK: '#1f2937',
    PURPLE: '#8b5cf6',
    GREEN: '#10b981',
    LIGHT: '#f3f4f6',
    GLASS: "#ffffff80"
}
export const fontOptions = {
    INTER: 'font-inter',
    ROBOTO: 'font-roboto',
    OPEN_SANS: 'font-open-sans',
    MONTSERRAT: 'font-montserrat',
    LATO: 'font-lato',
    POPPINS: 'font-poppins',
    NUNITO: 'font-nunito',
    RALEWAY: 'font-raleway',
    UBUNTU: 'font-ubuntu',
    YUJI_MAI: 'font-yuji-mai',
    PLAYFAIR_DISPLAY: 'font-playfair-display',
    HACHI_MARU_POP: 'font-hachi-maru-pop',
    MONO: "font-mono",
};
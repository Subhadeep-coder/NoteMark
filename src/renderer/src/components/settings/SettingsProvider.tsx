import React, { createContext, useContext, useEffect, useState } from 'react';
import { SettingsTab, } from '@shared/constants';
import { Fonts, Themes } from '@shared/types';
import { changeFont, changeTheme } from '@renderer/utils';

type SettingsContextType = {
    selectedSettingsIndex: number;
    settingsTab: SettingsTab;
    theme: Themes;
    storage: string;
    font: Fonts;
    handleSettingSelect: (index: number, enumTab: SettingsTab) => void;
    setTheme: (theme: Themes) => void;
    setStorage: (storage: string) => void;
    setFont: (font: Fonts) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedSettingsIndex, setSelectedSettingsIndex] = useState(0);
    const [settingsTab, setSettingsTab] = useState<SettingsTab>(SettingsTab.THEME);
    const [theme, setTheme] = useState<Themes>("DARK");
    const [storage, setStorage] = useState<string>("");
    const [font, setFont] = useState<Fonts>("MONO");

    useEffect(() => {
        document.body.classList.add("bg-slate-600");
        document.body.classList.add("font-mono");
        const handleUpdateThemeAndFont = async () => {
            const prevTheme = await window.context.getTheme();
            setTheme(prevTheme);
            changeTheme(prevTheme);
            const prevFont = await window.context.getFont();
            setFont(prevFont);
            changeFont(prevFont);
        }

        handleUpdateThemeAndFont();
    }, [])

    useEffect(() => {
        const handleGetLocation = async () => {
            const path = await window.context.getLocation();
            setStorage(path);
        }
        handleGetLocation();
    }, [])

    const handleSettingSelect = (index: number, enumTab: SettingsTab) => {
        setSelectedSettingsIndex(index);
        setSettingsTab(enumTab);
    };

    return (
        <SettingsContext.Provider value={{ selectedSettingsIndex, settingsTab, handleSettingSelect, setTheme, theme, storage, setStorage, font, setFont }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettingsList = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettingsList must be used within a SettingsProvider');
    }
    return context;
};

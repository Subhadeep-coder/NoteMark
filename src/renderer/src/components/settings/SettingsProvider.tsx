import React, { createContext, useContext, useEffect, useState } from 'react';
import { SettingsTab, } from '@shared/constants';
import { Themes } from '@shared/types';
import { changeTheme } from '@renderer/utils';

type SettingsContextType = {
    selectedSettingsIndex: number;
    settingsTab: SettingsTab;
    theme: Themes;
    storage: string;
    handleSettingSelect: (index: number, enumTab: SettingsTab) => void;
    setTheme: (theme: Themes) => void;
    setStorage: (storage: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedSettingsIndex, setSelectedSettingsIndex] = useState(0);
    const [settingsTab, setSettingsTab] = useState<SettingsTab>(SettingsTab.THEME);
    const [theme, setTheme] = useState<Themes>("DARK");
    const [storage, setStorage] = useState<string>("");

    useEffect(() => {
        document.body.classList.add("bg-slate-600");
        const handleUpdateTheme = async () => {
            const prevTheme = await window.context.getTheme();
            setTheme(prevTheme);
            changeTheme(prevTheme);
        }

        handleUpdateTheme();
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
        <SettingsContext.Provider value={{ selectedSettingsIndex, settingsTab, handleSettingSelect, setTheme, theme, storage, setStorage }}>
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

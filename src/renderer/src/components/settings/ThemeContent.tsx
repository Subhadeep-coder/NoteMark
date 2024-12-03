import { changeTheme, cn } from '@renderer/utils';
import { themeColors } from '@shared/constants';
import { Divider } from '../Divider';
import { Themes } from '@shared/types';
import { useSettingsList } from './SettingsProvider';


export const ThemeContent = () => {
    const { setTheme, theme: currentTheme } = useSettingsList();
    const handleChange = async (theme: string) => {
        await window.context.changeTheme(theme as Themes);
        setTheme(theme as Themes);
        changeTheme(theme as Themes);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Select Theme</h2>

                {/* Current Theme Display */}
                <div className="flex justify-center mb-8">
                    <div
                        className="w-24 h-24 rounded-full shadow-lg flex items-center justify-center"
                        style={{ backgroundColor: themeColors[currentTheme] }}
                    >
                        <span className={cn("font-semibold capitalize", {
                            "text-black": currentTheme === "LIGHT",
                            "text-white": currentTheme === "DARK",
                        })}>
                            {currentTheme}
                        </span>
                    </div>
                </div>

                <Divider />

                {/* Theme Options */}
                <div className="grid grid-cols-3 gap-4">
                    {Object.entries(themeColors)
                        .filter(([theme]) => theme !== currentTheme)
                        .map(([theme, color]) => (
                            <button
                                key={theme}
                                className="w-full aspect-square rounded-full shadow-md transform transition-all 
                                           hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                                style={{
                                    backgroundColor: color,
                                    boxShadow: `0 4px 6px rgba(0,0,0,0.1)`
                                }}
                                onClick={() => handleChange(theme)}
                            >
                                <span className={cn(`font-semibold capitalize`, {
                                    "text-black": theme === "LIGHT",
                                    "text-white": theme === "DARK",
                                })}>{theme}</span>
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
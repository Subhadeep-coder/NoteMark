import { fontOptions } from '@shared/constants';
import { FaCheck } from 'react-icons/fa6';
import { useSettingsList } from './SettingsProvider';
import { Fonts } from '@shared/types';
import { changeFont } from '@renderer/utils';

export const FontContent = () => {
    const { font: currentFont, setFont } = useSettingsList();
    const handleChange = async (font: string) => {
        await window.context.changeFont(font as Fonts);
        setFont(font as Fonts);
        changeFont(font as Fonts);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Select Font</h2>

                {/* Current Font Display */}
                <div className="flex justify-center mb-8">
                    <div
                        className="w-24 h-24 rounded-full bg-blue-500 shadow-lg flex items-center justify-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-12 h-12 stroke-white"
                            fill="none"
                            strokeWidth="1.5"
                        >
                            <path stroke="currentColor" d="M4.5 7V5.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1.5M4.5 7h15m-15 0v9.5a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-9.5m-15 0h15" />
                            <path stroke="currentColor" d="M8.25 10.5h7.5" />
                            <path stroke="currentColor" d="M8.25 13.5h7.5" />
                        </svg>
                    </div>
                </div>

                {/* Font Options */}
                <div className="overflow-y-auto max-h-[50vh] pr-2">
                    <div className="grid grid-cols-3 gap-4">
                        {Object.entries(fontOptions)
                            .map(([font, fontClass]) => {
                                return (
                                    <button
                                        key={font}
                                        onClick={() => handleChange(font)}
                                        className={`w-full aspect-square rounded-lg shadow-md 
                                            flex items-center justify-center relative
                                            ${font === currentFont
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 hover:bg-blue-100 text-gray-800'}
                                            transform transition-all hover:scale-105 
                                            focus:outline-none focus:ring-2 
                                            focus:ring-blue-300`}
                                    >
                                        <span className={`font-semibold text-sm ${font === currentFont ? 'text-white' : 'text-gray-800'} ${fontClass}`}>
                                            {font.replaceAll("_", " ")}
                                        </span>
                                        {font === currentFont && (
                                            <div className="absolute bottom-2 right-2">
                                                <FaCheck className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
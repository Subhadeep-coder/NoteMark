import { selectedNoteAtom } from '@renderer/store';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge'

type Props = {
    className: string;
}

export const FloatingNoteTitle = ({ className, ...props }: Props) => {
    const selectedNote = useAtomValue(selectedNoteAtom);
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(
                new Intl.DateTimeFormat(window.context.locale, {
                    hour: '2-digit',
                    minute: '2-digit',
                    hourCycle: 'h23',
                }).format(now)
            );
        };

        updateTime();
        const intervalId = setInterval(updateTime, 60000);

        return () => clearInterval(intervalId);
    }, []);

    if (!selectedNote) {
        return null;
    }

    return (
        <div className={twMerge("flex justify-center", className)}{...props}>
            <span className='text-gray-400'>{currentTime} : {selectedNote.title}</span>
        </div>
    )
}
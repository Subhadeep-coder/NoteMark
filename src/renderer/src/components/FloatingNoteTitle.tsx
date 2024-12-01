import { selectedNoteAtom } from '@renderer/store';
import { useAtomValue } from 'jotai';
import { twMerge } from 'tailwind-merge'

type Props = {
    className: string;
}

export const FloatingNoteTitle = ({ className, ...props }: Props) => {
    const selectedNote = useAtomValue(selectedNoteAtom);

    if (!selectedNote) {
        return null;
    }

    return (
        <div className={twMerge("flex justify-center", className)}{...props}>
            <span className='text-gray-400'>{selectedNote.title}</span>
        </div>
    )
}
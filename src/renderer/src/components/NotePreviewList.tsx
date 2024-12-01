import { NotePreview } from './NotePreview';
import { twMerge } from 'tailwind-merge';
import { useNotesList } from '@renderer/hooks/useNotesList';
import { isEmpty } from 'lodash';

type Props = {
    className: string;
    onSelect: () => void;
}

export const NotePreviewList = ({ className, onSelect, ...props }: Props) => {

    const { notes, handleNoteSelect, selectedNoteIndex } = useNotesList({ onSelect });

    if (!notes) return null;

    if (isEmpty(notes)) {
        return (
            <ul className={twMerge("pt-4 text-center", className)} {...props}>
                <span>No Notes Yet!</span>
            </ul>
        )
    }

    return (
        <ul className={className} {...props}>
            {
                notes.map((note, index) => {
                    return (
                        <NotePreview
                            key={index}
                            isActive={selectedNoteIndex === index}
                            onClick={handleNoteSelect(index)}
                            {...note}
                        />
                    )
                })
            }
        </ul>
    )
}
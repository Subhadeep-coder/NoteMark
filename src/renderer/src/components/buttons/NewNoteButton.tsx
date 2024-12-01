import { useSetAtom } from 'jotai';
import { ActionButton } from './ActionButton';
import { LuFileSignature } from 'react-icons/lu';
import { createEmptyNoteAtom } from '@renderer/store';

type Props = {}

export const NewNoteButton = ({ ...props }: Props) => {

    const createEmptyNote = useSetAtom(createEmptyNoteAtom);

    const handleCreate = async () => {
        await createEmptyNote();
    }

    return (
        <ActionButton {...props} onClick={handleCreate}>
            <LuFileSignature className='w-4 h-4 text-zinc-300' />
        </ActionButton>
    )
}
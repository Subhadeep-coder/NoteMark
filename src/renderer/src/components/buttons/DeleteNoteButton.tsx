import { useSetAtom } from "jotai";
import { ActionButton } from "./ActionButton";
import { FaRegTrashCan } from 'react-icons/fa6';
import { deleteNoteAtom } from "@/store";

type Props = {}

export const DeleteNoteButton = ({ ...props }: Props) => {

    const deleteNote = useSetAtom(deleteNoteAtom);

    const handleDelete = async () => {
        await deleteNote();
    }

    return (
        <ActionButton {...props} onClick={handleDelete}>
            <FaRegTrashCan className="w-4 h-4 text-zinc-300" />
        </ActionButton>
    )
}
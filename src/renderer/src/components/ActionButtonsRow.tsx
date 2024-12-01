import { DeleteNoteButton, NewNoteButton } from './buttons';

type Props = {
    className: string;
}

export const ActionButtonsRow = ({ className, ...props }: Props) => {
    return (
        <div className={className} {...props}>
            <NewNoteButton />
            <DeleteNoteButton />
        </div>
    )
}
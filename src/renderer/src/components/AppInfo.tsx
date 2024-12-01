import { DeleteNoteButton, NewNoteButton, SettingsButton } from './buttons';
type Props = {
    className: string;
}

export const AppInfo = ({ className, ...props }: Props) => {
    return (
        <div className={className} {...props}>
            <h1 className='text-2xl'>NoteMark</h1>
            <SettingsButton />
        </div>
    )
}
import { DeleteNoteButton, NewNoteButton, SettingsButton } from './buttons';
type Props = {
    className: string;
    settingsTab: boolean;
    setSettingsTab: (param: boolean) => void;
}

export const AppInfo = ({ className, settingsTab, setSettingsTab, ...props }: Props) => {
    return (
        <div className={className} {...props}>
            <h1 className='text-2xl'>
                {settingsTab ? "Settings" : "NoteMark"}
            </h1>
            <SettingsButton
                className="transition rotate-90 duration-200"
                isOpen={settingsTab}
                onOpen={setSettingsTab}
            />
        </div>
    )
}
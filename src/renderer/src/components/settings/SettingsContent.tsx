import { SettingsTab } from '@shared/constants';
import { twMerge } from 'tailwind-merge'
import { ThemeContent } from './ThemeContent';
import { StorageContent } from './StorageContent';
import { useSettingsList } from './SettingsProvider';

type Props = {
    className: string;
}

export const SettingsContent = ({ className, ...props }: Props) => {

    const { settingsTab } = useSettingsList();

    return (
        <div className={twMerge("flex-1 overflow-auto", className)}{...props}>
            {
                settingsTab === SettingsTab.THEME ? (
                    <ThemeContent />
                ) : (
                    <StorageContent />
                )
            }
        </div>
    )
}
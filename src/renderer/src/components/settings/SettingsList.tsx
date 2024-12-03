import { settingsList, SettingsTab } from '@shared/constants';
import { SettingsListItem } from './SettingsListItem';
import { useSettingsList } from './SettingsProvider';

type Props = {
    className: string;
}

export const SettingsList = ({ className, ...props }: Props) => {

    const { handleSettingSelect, selectedSettingsIndex, settingsTab } = useSettingsList();

    return (
        <ul className={className} {...props}>
            {
                settingsList.map((item) => {
                    return (
                        <SettingsListItem
                            key={item.id}
                            isActive={selectedSettingsIndex === item.id}
                            onClick={() => {
                                handleSettingSelect(item.id, item.enum);
                            }}
                            title={item.title}
                        />
                    )
                })
            }
        </ul>
    )
}
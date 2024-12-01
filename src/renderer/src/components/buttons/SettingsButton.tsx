import { ActionButton } from "./ActionButton";
import { IoSettingsSharp } from "react-icons/io5";

type Props = {}

export const SettingsButton = ({ ...props }: Props) => {

    return (
        <ActionButton {...props} className="border-none">
            <IoSettingsSharp className="w-6 h-6 text-zinc-400" />
        </ActionButton>
    )
}
import { twMerge } from "tailwind-merge";
import { ActionButton } from "./ActionButton";
import { IoSettingsSharp } from "react-icons/io5";

type Props = {
    isOpen: boolean;
    onOpen: (param: boolean) => void;
    className?: string;
}

export const SettingsButton = ({ isOpen, onOpen, className, ...props }: Props) => {

    return (
        <ActionButton
            className={twMerge("border-none", className)}
            onClick={() => onOpen(!isOpen)}
            {...props}
        >
            <IoSettingsSharp className="w-6 h-6 text-zinc-400" />
        </ActionButton>
    )
}
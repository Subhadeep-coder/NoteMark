import { cn } from '@renderer/utils';
import { ComponentProps } from 'react';

type Props = {
    className?: string;
    isActive?: boolean;
    onClick?: (index: number) => void;
} & ComponentProps<"div">;

export const SettingsListItem = ({ title, isActive = false, className, ...props }: Props) => {
    return (
        <div className={cn("cursor-pointer px-2.5 py-3 rounded-md transition-colors duration-75",
            {
                "bg-zinc-400/75": isActive,
                "hover:bg-zinc-500/75": !isActive
            }
        )}
            {...props}
        >
            <h3 className='mb-1 font-bold truncate'>{title}</h3>
        </div>
    )
}
import { cn, formatDateFromMs } from '@renderer/utils';
import { NoteInfo } from '@shared/models'
import { ComponentProps } from 'react';

type Props = NoteInfo & {
    className?: string;
    isActive?: boolean;
    onClick?: (index: number) => void;
} & ComponentProps<"div">;

export const NotePreview = ({ title, lastEditTime, isActive = false, className, ...props }: Props) => {
    const date = formatDateFromMs(lastEditTime);
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
            <span className='inline-block w-full mb-2 text-xs font-light text-left'>{date}</span>
        </div>
    )
}
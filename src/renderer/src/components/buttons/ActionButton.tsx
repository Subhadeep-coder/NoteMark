import React from 'react'
import { twMerge } from 'tailwind-merge';

type Props = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const ActionButton = ({ children, className, onClick, ...props }: Props) => {
    return (
        <button
            className={twMerge("px-2 py-1 rounded-md border border-zinc-400/50 hover:border-zinc-600/50 transition-colors duration-100", className)}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}
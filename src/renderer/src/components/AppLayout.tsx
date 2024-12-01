import React, { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge';

export const RootLayout = ({ className, children, ...props }: ComponentProps<"main">) => {
    return (
        <main className={twMerge("flex flex-row h-screen", className)} {...props}>
            {children}
        </main>
    )
}

type Props = {
    children: React.ReactNode;
    className: string;
}

export const Sidebar = ({ children, className, ...props }: Props) => {
    return (
        <aside className={twMerge("w-[250px] mt-2 overflow-auto h-[100vh + 10px]", className)} {...props}>
            {children}
        </aside>
    )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<"div">>(({ className, children, ...props }, ref) => {
    return (
        <div ref={ref} className={twMerge("flex-1 overflow-auto", className)}{...props}>
            {children}
        </div>
    )
})

Content.displayName = "Cotent";
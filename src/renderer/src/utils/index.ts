import { Themes } from '@shared/types';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(...args));
}

const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "UTC"
});

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms);

export const changeTheme = (theme: Themes) => {
    const body = document.body;
    while (body.classList.length > 0) {
        body.classList.remove(body.classList[0]);
    }
    body.classList.value = "";
    switch (theme) {
        case "BLUE":
            body.classList.add("bg-blue-600");
            break;
        case "DARK":
            body.classList.add("bg-slate-600");
            break;
        case "GREEN":
            body.classList.add("bg-green-600");
            break;
        case "LIGHT":
            body.classList.add("bg-white");
            body.classList.add("text-black");
            break;
        case "ORANGE":
            body.classList.add("bg-orange-600");
            break;
        case "PURPLE":
            body.classList.add("bg-purple-600");
            break;
        case "GLASS":
            break;
        default:
            body.classList.add("bg-slate-600");
            break;
    }
}
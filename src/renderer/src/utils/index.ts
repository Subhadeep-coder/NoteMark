import { Fonts, Themes } from '@shared/types';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(...args));
}

const dateFormatter = (timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone) => new Intl.DateTimeFormat(window.context.locale, {
    dateStyle: "short",
    timeStyle: "short",
    timeZone
});

export const formatDateFromMs = (ms: number) => dateFormatter().format(ms);

export const changeTheme = (theme: Themes) => {
    const body = document.body;
    // while (body.classList.length > 0) {
    //     body.classList.remove(body.classList[0]);
    // }
    // body.classList.value = "";
    body.className = body.className
        .split(" ")
        .filter((cls) => !/^bg-|^text-/.test(cls))
        .join(" ");
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

export const changeFont = (font: Fonts) => {
    const body = document.body;
    // while (body.classList.length > 0) {
    //     body.classList.remove(body.classList[0]);
    // }
    // body.classList.value = "";
    body.className = body.className
        .split(" ")
        .filter((cls) => !/^font-/.test(cls))
        .join(" ");
    switch (font) {
        case "INTER":
            body.classList.add("font-inter");
            break;
        case "LATO":
            body.classList.add("font-lato");
            break;
        case "MONO":
            body.classList.add("font-mono");
            break;
        case "MONTSERRAT":
            body.classList.add("font-montserrat");
            break;
        case "NUNITO":
            body.classList.add("font-nunito");
            break;
        case "OPEN_SANS":
            body.classList.add("font-open-sans");
            break;
        case "POPPINS":
            body.classList.add("font-poppins");
            break;
        case "RALEWAY":
            body.classList.add("font-raleway");
            break;
        case "UBUNTU":
            body.classList.add("font-ubuntu");
            break;
        case "YUJI_MAI":
            body.classList.add("font-yuji-mai");
            break;
        case "ROBOTO":
            body.classList.add("font-roboto");
            break;
        case "HACHI_MARU_POP":
            body.classList.add("font-hachi-maru-pop");
            break;
        case "PLAYFAIR_DISPLAY":
            body.classList.add("font-playfair-display");
            break;
        default:
            body.classList.add("font-mono");
            break;
    }
}
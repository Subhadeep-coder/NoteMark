import { MDXEditorMethods } from "@mdxeditor/editor";
import { saveNoteAtom, selectedNoteAtom } from "@renderer/store"
import { autosaveTime } from "@shared/constants";
import { NoteContent } from "@shared/models";
import { useAtomValue, useSetAtom } from "jotai"
import { throttle } from "lodash";
import { useRef } from "react";

export const useMarkdownEditor = () => {
    const selectedNote = useAtomValue(selectedNoteAtom);
    const saveNote = useSetAtom(saveNoteAtom);
    const editorRef = useRef<MDXEditorMethods>(null);

    const handleAutoSave = throttle(
        async (content: NoteContent) => {
            if (!selectedNote)
                return;

            await saveNote(content);

        },
        autosaveTime,
        {
            leading: false,
            trailing: true
        }
    )

    const handleBlur = async () => {
        if (!selectedNote) return;
        handleAutoSave.cancel();
        const content = editorRef.current?.getMarkdown();
        if (content != null) {
            await saveNote(content);
        }
    }
    return {
        selectedNote,
        handleAutoSave,
        editorRef,
        handleBlur
    };
}
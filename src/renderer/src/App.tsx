import { useRef } from "react";
import { ActionButtonsRow, AppInfo, Content, Divider, DraggableTopBar, FloatingNoteTitle, MarkdownEditor, NotePreviewList, RootLayout, Sidebar } from "./components";

function App() {
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const handleResetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0);
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          <AppInfo className="flex justify-between mb-6" />
          <Divider />
          <ActionButtonsRow className="flex justify-between mt-1" />
          <NotePreviewList className="mt-3 space-y-1" onSelect={handleResetScroll} />
        </Sidebar>
        <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
          <FloatingNoteTitle className="pt-2" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App

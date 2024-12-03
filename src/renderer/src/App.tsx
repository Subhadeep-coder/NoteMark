import { useRef, useState } from "react";
import { ActionButtonsRow, AppInfo, Content, Divider, DraggableTopBar, FloatingNoteTitle, MarkdownEditor, NotePreviewList, RootLayout, SettingsContent, SettingsList, SettingsProvider, Sidebar } from "./components";

function App() {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [settingsTab, setSettingsTab] = useState<boolean>(false);

  const handleResetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0);
  }

  return (
    <>
      <SettingsProvider>
        <DraggableTopBar />
        <RootLayout>
          <Sidebar className="p-2">
            <AppInfo
              className="flex justify-between mb-6"
              settingsTab={settingsTab}
              setSettingsTab={setSettingsTab}
            />
            <Divider />
            {
              settingsTab ? (
                <SettingsList className="mt-3 space-y-1" />
              ) : (
                <>
                  <ActionButtonsRow className="flex justify-between mt-1" />
                  <NotePreviewList className="mt-3 space-y-1" onSelect={handleResetScroll} />
                </>
              )
            }
          </Sidebar>
          {
            settingsTab ? (
              <SettingsContent className="border-l bg-zinc-900/50 border-l-white/20" />
            ) : (
              <Content ref={contentContainerRef} className="border-l bg-zinc-900/50 border-l-white/20">
                <FloatingNoteTitle className="pt-2" />
                <MarkdownEditor />
              </Content>

            )
          }
        </RootLayout>
      </SettingsProvider>
    </>
  )
}

export default App

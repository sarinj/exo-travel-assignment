import { SidebarTrigger } from "@/components/ui/sidebar"

export default function AppTopBar() {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center border-b border-(--brand-border) bg-white px-3 sm:px-4 backdrop-blur supports-backdrop-filter:bg-background/70">
      <SidebarTrigger className="h-9 w-9 shrink-0 p-0 md:hidden" />
    </header>
  )
}

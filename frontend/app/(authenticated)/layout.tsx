import AppSidebar from "@/components/layout/AppSidebar"
import AppTopBar from "@/components/layout/AppTopBar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppTopBar />
        <div className="flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

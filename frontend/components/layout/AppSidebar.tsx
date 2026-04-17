"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const primaryItems = [
  { label: "Overview", href: "#", icon: LayoutDashboard, active: false },
  { label: "Customers", href: "/customers", icon: Users, active: true },
  { label: "Settings", href: "#", icon: Settings, active: false },
]

const secondaryItems = [
  { label: "Support", href: "#", icon: CircleHelp },
  { label: "Logout", href: "/login", icon: LogOut },
]

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-r border-gray-200"
    >
      <SidebarHeader className="px-3 pb-2 pt-5 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:pt-3">
        <div className="flex w-full items-center justify-between group-data-[collapsible=icon]:justify-center">
          <Link
            href="/customers"
            className="flex items-center justify-center rounded-lg p-2 group-data-[collapsible=icon]:hidden"
          >
            <Image
              src="/EXO_logo_green.png"
              alt="EXO logo"
              className="h-auto w-24 ml-2"
              width={90}
              height={32}
            />
          </Link>
          <SidebarTrigger className="h-9 w-9 shrink-0 p-0" />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 group-data-[collapsible=icon]:px-1">
        <SidebarGroup className="pt-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {primaryItems.map((item) => {
                const Icon = item.icon
                const isActive =
                  item.href !== "#" &&
                  item.active &&
                  pathname.startsWith(item.href)

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="h-9 rounded-xl text-[15px] px-3 font-medium text-(--brand-primary) hover:bg-primary-50 data-[active=true]:bg-secondary-200 data-[active=true]:text-(--brand-primary) group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:[&>svg]:mx-0"
                    >
                      <Link href={item.href}>
                        <Icon className="h-4.5 w-4.5" />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4 pt-2 group-data-[collapsible=icon]:px-1">
        <SidebarMenu>
          {secondaryItems.map((item) => {
            const Icon = item.icon

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  className="h-9 rounded-xl text-[15px] font-medium text-(--brand-primary) hover:bg-primary-50 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:[&>svg]:mx-0"
                >
                  <Link href={item.href}>
                    <Icon className="h-4.5 w-4.5" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

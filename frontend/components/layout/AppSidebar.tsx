"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Package,
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
} from "@/components/ui/sidebar"

const primaryItems = [
  { label: "Pipeline", href: "#", icon: LayoutDashboard, active: false },
  { label: "Customers", href: "/customers", icon: Users, active: true },
  { label: "Inventory", href: "#", icon: Package, active: false },
  { label: "Settings", href: "#", icon: Settings, active: false },
]

const secondaryItems = [
  { label: "Support", href: "#", icon: CircleHelp },
  { label: "Logout", href: "#", icon: LogOut },
]

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-r border-[rgba(2,79,66,0.12)]"
    >
      <SidebarHeader className="px-3 pb-2 pt-5">
        <Link href="/customers" className="flex justify-center rounded-lg p-2">
          <Image
            src="/EXO_logo_green.png"
            alt="EXO logo"
            className="h-auto w-22.5"
            width={90}
            height={32}
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup className="pt-1">
          <SidebarGroupContent>
            <SidebarMenu>
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
                      className="h-9 rounded-xl text-[15px] font-medium text-(--brand-primary) hover:bg-[color-mix(in_oklab,var(--brand-primary)_8%,white)] data-[active=true]:bg-[color-mix(in_oklab,var(--brand-secondary)_28%,white)] data-[active=true]:text-(--brand-primary)"
                    >
                      <Link href={item.href}>
                        <Icon className="h-4.5 w-4.5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4 pt-2">
        <SidebarMenu>
          {secondaryItems.map((item) => {
            const Icon = item.icon

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  className="h-9 rounded-xl text-[15px] font-medium text-(--brand-primary) hover:bg-[color-mix(in_oklab,var(--brand-primary)_8%,white)]"
                >
                  <Link href={item.href}>
                    <Icon className="h-4.5 w-4.5" />
                    <span>{item.label}</span>
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

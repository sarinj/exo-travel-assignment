"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export default function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <Link
          href="/customers"
          className="flex items-center gap-3 rounded-md p-2"
        >
          <Image
            src="https://storage.googleapis.com/exo24_public/EXO_logo_green.png"
            alt="EXO logo"
            className="rounded-md"
            width={28}
            height={28}
          />
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-xs font-bold tracking-[0.2em] text-(--brand-secondary)">
              EXO CRM
            </p>
            <p className="text-xs text-slate-500">Dashboard</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/customers")}
                >
                  <Link href="/customers">
                    <Users />
                    <span>Customers</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "../ui/sidebar";
import { Home, Upload, ClipboardList, BarChart2, User } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const items = [
  { title: "Dashboard", icon: Home },
  { title: "Upload Certificate", icon: Upload },
  { title: "Verification History", icon: ClipboardList },
  { title: "Reports", icon: BarChart2 },
];

export function SidebarLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        <Sidebar className="w-64 bg-[#22143a] text-white" collapsible="icon">
          <SidebarContent>
            <div className="px-4 py-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-white/10 flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold">Certiai</div>
                </div>
              </div>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <div className="px-3 text-xs text-white/70">Main</div>
              </SidebarGroupLabel>

              <SidebarMenu>
                {items.map((it) => (
                  <SidebarMenuItem key={it.title}>
                    <SidebarMenuButton
                      className="text-white/90"
                      asChild
                      tooltip={it.title}
                    >
                      <a href="#" className="flex items-center gap-3">
                        <it.icon className="h-5 w-5" />
                        <span>{it.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarFooter>
              <div className="px-3 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded bg-white/10 flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">Jayden</div>
                    <div className="text-xs text-white/60">Admin</div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}

export default SidebarLayout;

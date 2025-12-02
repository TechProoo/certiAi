import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  LayoutDashboard,
  FileText,
  Clock,
  ChartNoAxesColumn,
} from "lucide-react";

const items = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Upload Certificate", icon: FileText },
  { title: "Verification History", icon: Clock },
  { title: "Reports", icon: ChartNoAxesColumn },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState<string>(items[0].title);

  return (
    <aside
      className={`flex flex-col bg-[#130D3A] text-slate-100 transition-all duration-200 ${
        collapsed ? "w-20" : "w-62"
      } h-screen border-r border-slate-800`}
    >
      <div className="flex items-center gap-3 px-4 py-4">
        {!collapsed && (
          <div>
            <div className="text-2xl font-semibold">CertiAi</div>
          </div>
        )}
        <button
          aria-label="toggle"
          onClick={() => setCollapsed((v) => !v)}
          className="ml-auto text-slate-300 hover:text-white p-2 rounded"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-1 py-4">
        <ul className="space-y-2">
          {items.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.title;

            return (
              <li key={it.title} className="relative">
                <button
                  onClick={() => setActive(it.title)}
                  className={`
                    relative w-full flex items-center gap-3 px-5 py-3 
                    rounded-xl text-sm transition-all duration-200
                    ${
                      isActive
                        ? "bg-[linear-gradient(90deg,#221B52_0%,#1A1540_100%)] text-white shadow-[inset_0_0_12px_rgba(0,0,0,0.25)]"
                        : "text-slate-300 hover:bg-[#1A1642] hover:text-white"
                    }
                  `}
                >
                  {isActive && (
                    <span
                      className="
                      absolute left-0 top-0 bottom-0 h-auto 
                      w-1 rounded-l-sm
                      bg-white/90 shadow-md
                    "
                    />
                  )}
                  <Icon
                    className={`${isActive ? "text-white" : "text-[#A8AAAB]"}`}
                    size={18}
                  />

                  {!collapsed && (
                    <span
                      className={`${
                        isActive ? "font-medium" : "text-[#A8AAAB]"
                      }`}
                    >
                      {it.title}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-xs">
            <User />
          </div>
          {!collapsed && (
            <div className="text-sm">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-slate-400">john@example.com</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

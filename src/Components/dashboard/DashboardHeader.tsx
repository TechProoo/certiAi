import { AppWindow, CircleUserRound, LogOut, Search } from "lucide-react";
import Image from "../../assets/889df31f76ad06a56f5f6753c0d142651be87951.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function DashboardHeader() {
  return (
    <header className="w-full border-b px-8 py-2 bg-[#F8FAFC] flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <AppWindow />
          <h1>Dashboard</h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-64 group">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-9 pl-10 pr-3 rounded-md border border-transparent bg-white text-sm text-[#130D3A] placeholder-gray-400 transition-all duration-200 ease-in-out focus:outline-none focus:shadow-sm focus:border-[#130D3A]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors duration-200 group-focus-within:text-gray-600" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">Hello Jayden</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild aria-label="Open user menu">
            <button className="rounded-full border p-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300">
              <img
                src={Image}
                alt="User"
                width={36}
                height={36}
                className="rounded-full"
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-cover">
            {/* Non-interactive profile header */}
            <div className="px-3 py-2">
              <div className="flex items-center gap-3">
                <img
                  src={Image}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full border border-[#EAECF0]"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-slate-900">
                    Olaoluwa Emmanuel
                  </span>
                  <span className="text-xs text-slate-500">ola@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="my-1 border-t border-[#EAECF0]" />

            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <CircleUserRound size={16} />
                <span>View profile</span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="text-rose-600">
              <div className="flex items-center gap-2">
                <LogOut  size={16}/>
                <span>Log out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

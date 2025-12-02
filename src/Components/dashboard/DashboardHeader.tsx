import { AppWindow, Search } from "lucide-react";
import Image from "../../assets/889df31f76ad06a56f5f6753c0d142651be87951.jpg";

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
        <img
          src={Image}
          alt="User"
          width={32}
          height={32}
          className="rounded-full border"
        />
      </div>
    </header>
  );
}

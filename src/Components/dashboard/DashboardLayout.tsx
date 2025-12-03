import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { InteractiveMenu } from "../ui/modern-mobile-menu";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-[#ffffff] text-white">
      {/* Desktop sidebar: hidden on small screens */}
      <div className="hidden md:sticky md:top-0 md:h-screen md:block">
        <Sidebar />
      </div>

      <main className="flex-1">
        <DashboardHeader />
        <div className="p-8">{children}</div>
      </main>

      {/* Mobile interactive menu: show only on small screens; fixed bottom */}
      <div className="md:hidden fixed left-0 right-0 bottom-4 px-4">
        <InteractiveMenu />
      </div>
    </div>
  );
}

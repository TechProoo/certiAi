import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-[#ffffff] text-white">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      <main className="flex-1">
        <DashboardHeader />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

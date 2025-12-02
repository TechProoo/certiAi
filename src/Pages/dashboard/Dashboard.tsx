import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { ShieldCheck, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const stats = [
  {
    title: "Total Verified",
    value: "1,247",
    hint: "Total certificates verified",
    icon: ShieldCheck,
    bg: "from-blue-50 to-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "Authentic",
    value: "876",
    hint: "Authentic certificates",
    icon: CheckCircle,
    bg: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    title: "Suspicious",
    value: "120",
    hint: "Suspicious certificates",
    icon: AlertTriangle,
    bg: "from-amber-50 to-amber-100",
    iconColor: "text-amber-700",
  },
  {
    title: "Flagged",
    value: "120",
    hint: "Flagged / Forged",
    icon: XCircle,
    bg: "from-rose-50 to-rose-100",
    iconColor: "text-rose-700",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <header className="py-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome Jayden
          </h2>
          <p className="text-sm text-slate-500">
            Here's what's happening with your certificate verifications today.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="rounded-xl p-6 bg-white shadow-sm border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">{s.title}</div>
                    <div className="text-2xl font-extrabold mt-3 text-slate-900">
                      {s.value}
                    </div>
                  </div>

                  <div className="h-12 w-12 rounded-xl flex items-center justify-center bg-white/60 shadow-sm">
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center ${s.iconColor} bg-white`}
                    >
                      <Icon size={18} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-slate-400">{s.hint}</div>
              </div>
            );
          })}
        </section>

        <section className="mb-8">
          <h3 className="text-sm font-medium text-slate-700 mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm border flex items-center gap-4">
              <div className="h-10 w-10 flex items-center justify-center rounded border bg-blue-50 text-blue-600">
                ⇪
              </div>
              <div>
                <div className="text-sm font-medium">Upload Certificate</div>
                <div className="text-xs text-slate-400">
                  Upload a new certificate file for verification
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm border flex items-center gap-4">
              <div className="h-10 w-10 flex items-center justify-center rounded border bg-emerald-50 text-emerald-600">
                API
              </div>
              <div>
                <div className="text-sm font-medium">API Documentation</div>
                <div className="text-xs text-slate-400">
                  Integrate verification with our API
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm border flex items-center gap-4">
              <div className="h-10 w-10 flex items-center justify-center rounded border bg-amber-50 text-amber-600">
                ⬇
              </div>
              <div>
                <div className="text-sm font-medium">Download Reports</div>
                <div className="text-xs text-slate-400">
                  Export verification reports
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-between p-4 border-b">
            <h4 className="font-medium text-slate-800">Recent Verifications</h4>
            <div className="flex items-center gap-3">
              <Input placeholder="Search" className="w-60" />
              <Button variant="outline">Filter by</Button>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-slate-500 border-b">
                <tr>
                  <th className="py-3 px-4">Date and Time</th>
                  <th className="py-3 px-4">Certificate ID</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 px-4 text-xs text-slate-500">
                      22 Jan 2022 | 11:30 AM
                    </td>
                    <td className="py-3 px-4">CERT-2024-12345</td>
                    <td className="py-3 px-4">Emma William</td>
                    <td className="py-3 px-4">{(i + 1) * 1000}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-800">
                        Authentic
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">•••</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 text-center border-t">
            <Button variant="link">View all Verifications →</Button>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}

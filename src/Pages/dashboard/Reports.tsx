"use client";

import { AlertTriangle, CheckCircle, ShieldCheck, XCircle } from "lucide-react";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const stats = [
  {
    title: "Total Verified",
    value: "1,247",
    icon: ShieldCheck,
    bg: "linear-gradient(135deg, rgba(15, 98, 254, 0.1) 0%, rgba(0, 182, 240, 0.05) 100%)",
    iconColor: "text-blue-700",
    iconBg: "#0F62FE1A",
  },
  {
    title: "Authentic",
    value: "876",
    hint: "Authentic certificates",
    bg: "linear-gradient(135deg, rgba(0, 201, 80, 0.1) 0%, rgba(5, 223, 114, 0.05) 100%)",
    icon: CheckCircle,
    iconColor: "text-emerald-700",
    iconBg: "#00C9501A",
  },
  {
    title: "Suspicious",
    value: "120",
    hint: "Suspicious certificates",
    icon: AlertTriangle,
    bg: "linear-gradient(135deg, rgba(240, 177, 0, 0.1) 0%, rgba(253, 199, 0, 0.05) 100%)",
    iconColor: "text-amber-700",
    iconBg: "#F0B1001A",
  },
  {
    title: "Flagged",
    value: "120",
    hint: "Flagged / Forged",
    icon: XCircle,
    bg: "linear-gradient(135deg, rgba(251, 44, 54, 0.1) 0%, rgba(255, 100, 103, 0.05) 100%)",
    iconColor: "text-rose-700",
    iconBg: "#FB2C361A",
  },
];

// barData removed; per-range data is provided by `barDataForRange`

const lineData = [
  { month: "Jan", authentic: 200, suspicious: 120, forged: 80 },
  { month: "Feb", authentic: 480, suspicious: 200, forged: 130 },
  { month: "Mar", authentic: 600, suspicious: 330, forged: 220 },
  { month: "Apr", authentic: 680, suspicious: 360, forged: 180 },
  { month: "May", authentic: 760, suspicious: 420, forged: 240 },
  { month: "Jun", authentic: 820, suspicious: 460, forged: 300 },
  { month: "Jul", authentic: 860, suspicious: 520, forged: 360 },
  { month: "Aug", authentic: 900, suspicious: 560, forged: 400 },
  { month: "Sep", authentic: 880, suspicious: 520, forged: 420 },
  { month: "Oct", authentic: 920, suspicious: 580, forged: 460 },
  { month: "Nov", authentic: 940, suspicious: 620, forged: 500 },
  { month: "Dec", authentic: 980, suspicious: 680, forged: 540 },
];

export default function Reports() {
  const [range, setRange] = useState<"today" | "week" | "month" | "all">(
    "today"
  );

  const ranges = [
    { key: "today", label: "Today" },
    { key: "week", label: "This week" },
    { key: "month", label: "This month" },
    { key: "all", label: "All time" },
  ] as const;

  const barDataForRange = useMemo(() => {
    switch (range) {
      case "today":
        return [
          { name: "January", value: 40 },
          { name: "February", value: 60 },
          { name: "March", value: 22 },
        ];
      case "week":
        return [
          { name: "January", value: 140 },
          { name: "February", value: 260 },
          { name: "March", value: 120 },
        ];
      case "month":
        return [
          { name: "January", value: 400 },
          { name: "February", value: 600 },
          { name: "March", value: 220 },
        ];
      case "all":
      default:
        return [
          { name: "January", value: 1000 },
          { name: "February", value: 1500 },
          { name: "March", value: 700 },
        ];
    }
  }, [range]);

  const lineDataForRange = useMemo(() => {
    // keep same months but scale by range
    const multiplier =
      range === "today"
        ? 0.02
        : range === "week"
        ? 0.15
        : range === "month"
        ? 0.6
        : 1;
    return lineData.map((d) => ({
      month: d.month,
      authentic: Math.round(d.authentic * multiplier),
      suspicious: Math.round(d.suspicious * multiplier),
      forged: Math.round(d.forged * multiplier),
    }));
  }, [range]);

  const barColors = ["#00C853", "#F6B73C", "#FF6B6B"]; // green, yellow, red

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto pt-6 pb-12">
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Reports</h2>
            <p className="text-sm text-slate-500">
              View and Download verification Activities summary
            </p>
          </div>

          <div className="flex items-center gap-2">
            {ranges.map((r) => (
              <button
                key={r.key}
                onClick={() => setRange(r.key)}
                className={`px-3 py-1 text-sm rounded-md border ${
                  range === r.key
                    ? "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
                    : "bg-white text-slate-700"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-20">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="rounded-xl p-6 shadow-sm border"
                style={{ background: s.bg }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">{s.title}</div>
                    <div className="text-2xl font-extrabold mt-3 text-slate-900">
                      {s.value}
                    </div>
                  </div>

                  <div className="h-12 w-12 rounded-xl flex items-center justify-center">
                    <div
                      className={`h-12 w-12 rounded-lg flex items-center justify-center ${s.iconColor}`}
                      style={{ background: s.iconBg }}
                    >
                      <Icon size={18} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className="bg-white border rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-sm font-medium text-slate-700 mb-4 text-center">
            Verification Status Breakdown
          </h3>
          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barDataForRange}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {barDataForRange.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={barColors[index % barColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-700">
              Verification Volume Over Time
            </h3>
            <div>
              <button className="px-3 py-1 text-xs border rounded-md border-[#EAECF0] text-[#344054] bg-white">
                Export
              </button>
            </div>
          </div>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineDataForRange}
                margin={{ top: 10, right: 40, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="authentic"
                  stroke="#00C853"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="suspicious"
                  stroke="#FFB74D"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="forged"
                  stroke="#FF6B6B"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

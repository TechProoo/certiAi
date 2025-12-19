"use client";

import {
  AlertTriangle,
  CheckCircle,
  ShieldCheck,
  XCircle,
  FileQuestion,
  UploadCloud,
} from "lucide-react";
import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { useState, useMemo, useEffect } from "react";
import { verificationAPI } from "../../api";
import type { DashboardStats } from "../../api/verification.api";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
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
  ComposedChart,
  Area,
  Line,
} from "recharts";

export default function Reports() {
  const [range, setRange] = useState<"today" | "week" | "month" | "all">("all");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await verificationAPI.getDashboardStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (err: any) {
        console.error("Failed to fetch reports data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const ranges = [
    { key: "today", label: "Today" },
    { key: "week", label: "This week" },
    { key: "month", label: "This month" },
    { key: "all", label: "All time" },
  ] as const;

  const hasData = stats && stats.totalVerified > 0;

  // Mock data for charts (will be replaced with real backend data later)
  const lineData = useMemo(() => {
    if (!hasData) return [];

    const multiplier =
      range === "today"
        ? 0.02
        : range === "week"
        ? 0.15
        : range === "month"
        ? 0.6
        : 1;

    const baseData = [
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

    return baseData.map((d) => ({
      month: d.month,
      authentic: Math.round(d.authentic * multiplier),
      suspicious: Math.round(d.suspicious * multiplier),
      forged: Math.round(d.forged * multiplier),
    }));
  }, [range, hasData]);

  const barDataForRange = useMemo(() => {
    if (!hasData) return [];

    return [
      { name: "Authentic", value: stats?.authentic || 0 },
      { name: "Suspicious", value: stats?.suspicious || 0 },
      { name: "Forged", value: stats?.forged || 0 },
    ];
  }, [stats, hasData]);

  const barColors = ["#00C853", "#F6B73C", "#FF6B6B"];
  const fmt = (v: any) => (typeof v === "number" ? v.toLocaleString() : v);

  const statsCards = [
    {
      title: "Total Verified",
      value: stats?.totalVerified || 0,
      icon: ShieldCheck,
      bg: "linear-gradient(135deg, rgba(15, 98, 254, 0.1) 0%, rgba(0, 182, 240, 0.05) 100%)",
      iconColor: "text-blue-700",
      iconBg: "#0F62FE1A",
    },
    {
      title: "Authentic",
      value: stats?.authentic || 0,
      icon: CheckCircle,
      bg: "linear-gradient(135deg, rgba(0, 201, 80, 0.1) 0%, rgba(5, 223, 114, 0.05) 100%)",
      iconColor: "text-emerald-700",
      iconBg: "#00C9501A",
    },
    {
      title: "Suspicious",
      value: stats?.suspicious || 0,
      icon: AlertTriangle,
      bg: "linear-gradient(135deg, rgba(240, 177, 0, 0.1) 0%, rgba(253, 199, 0, 0.05) 100%)",
      iconColor: "text-amber-700",
      iconBg: "#F0B1001A",
    },
    {
      title: "Flagged",
      value: stats?.forged || 0,
      icon: XCircle,
      bg: "linear-gradient(135deg, rgba(251, 44, 54, 0.1) 0%, rgba(255, 100, 103, 0.05) 100%)",
      iconColor: "text-rose-700",
      iconBg: "#FB2C361A",
    },
  ];

  return (
    <DashboardLayout>
      {loading && <Loader />}

      {!loading && (
        <div className="max-w-6xl mx-auto pb-12 sm:px-6 lg:px-0">
          {/* ------------ HEADER ------------ */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                Reports
              </h2>
              <p className="text-sm text-slate-500">
                View & Download verification summaries
              </p>
            </div>

            {/* Filter Buttons (scrollable on mobile) - only show if there's data */}
            {hasData && (
              <div className="flex items-center gap-2 overflow-x-auto px-1 sm:px-0">
                {ranges.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setRange(r.key)}
                    className={`shrink-0 px-3 py-1 text-xs sm:text-sm rounded-md border ${
                      range === r.key
                        ? "bg-blue-50 text-blue-700 border-blue-200 shadow"
                        : "bg-white text-slate-700 border-[#EAECF0]"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* EMPTY STATE */}
          {!hasData ? (
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="py-20 px-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                    <FileQuestion size={32} className="text-slate-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No Reports Available
                </h3>
                <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                  You don't have any verification data yet. Upload and verify
                  certificates to generate comprehensive reports and analytics.
                </p>
                <Link
                  to="/dashboard/upload"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-md hover:bg-slate-800 transition"
                >
                  <UploadCloud size={18} />
                  Upload Certificate
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* ------------ STATS GRID ------------ */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {statsCards.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.title}
                      className="rounded-xl p-5 shadow-sm border"
                      style={{ background: s.bg }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-slate-400">{s.title}</p>
                          <p className="text-xl md:text-2xl font-extrabold mt-3 text-slate-900">
                            {s.value.toLocaleString()}
                          </p>
                        </div>

                        <div
                          className={`h-12 w-12 rounded-lg flex items-center justify-center ${s.iconColor}`}
                          style={{ background: s.iconBg }}
                        >
                          <Icon size={18} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>

              {/* ------------ BAR CHART ------------ */}
              <div className="bg-white border rounded-lg shadow-sm p-0 sm:p-6 mb-10">
                <h3 className="text-sm font-medium text-slate-700 mb-4 text-center sm:text-left">
                  Verification Status Breakdown
                </h3>

                <div className="h-60 sm:h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barDataForRange}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "#64748B", fontSize: 12 }}
                      />
                      <YAxis tickFormatter={(v) => fmt(v)} />
                      <Tooltip formatter={(v) => fmt(v)} />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {barDataForRange.map((_, i) => (
                          <Cell
                            key={i}
                            fill={barColors[i % barColors.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* ------------ LINE CHART ------------ */}
              <div className="bg-white border rounded-lg shadow-sm p-0 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                  <h3 className="text-sm font-medium text-slate-700">
                    Verification Volume Over Time
                  </h3>

                  <button className="px-3 py-1 text-xs border rounded-md">
                    Export
                  </button>
                </div>

                <div className="h-[280px] sm:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={lineData}>
                      <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(v) => fmt(v)} />
                      <Tooltip formatter={(v) => fmt(v)} />
                      <Legend />

                      {/* AREA background */}
                      <Area
                        type="monotone"
                        dataKey="authentic"
                        stroke="transparent"
                        fill="#00C85320"
                      />
                      <Area
                        type="monotone"
                        dataKey="suspicious"
                        stroke="transparent"
                        fill="#FFB74D20"
                      />
                      <Area
                        type="monotone"
                        dataKey="forged"
                        stroke="transparent"
                        fill="#FF6B6B20"
                      />

                      {/* LINE foreground */}
                      <Line
                        type="monotone"
                        dataKey="authentic"
                        stroke="#00C853"
                        dot
                      />
                      <Line
                        type="monotone"
                        dataKey="suspicious"
                        stroke="#FFB74D"
                        dot
                      />
                      <Line
                        type="monotone"
                        dataKey="forged"
                        stroke="#FF6B6B"
                        dot
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

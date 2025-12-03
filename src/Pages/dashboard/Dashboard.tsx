"use client";

import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { useState } from "react";
// Using native inputs/buttons here; remove unused UI imports
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  UploadCloud,
  BookOpen,
  Download,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

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

const initialTableData = [
  {
    id: "CERT-2024-12345",
    date: "22 Jan 2022 | 11:30 AM",
    certificateId: "CERT-2024-12345",
    name: "Emma William",
    confidence: 92,
    status: "Authentic",
  },
  {
    id: "CERT-2024-12346",
    date: "22 Jan 2022 | 11:30 AM",
    certificateId: "CERT-2024-12346",
    name: "John Doe",
    confidence: 85,
    status: "Authentic",
  },
  {
    id: "CERT-2024-12347",
    date: "22 Jan 2022 | 11:30 AM",
    certificateId: "CERT-2024-12347",
    name: "Aisha Bello",
    confidence: 78,
    status: "Authentic",
  },
  {
    id: "CERT-2024-12348",
    date: "22 Jan 2022 | 11:30 AM",
    certificateId: "CERT-2024-12348",
    name: "Michael Okon",
    confidence: 62,
    status: "Suspicious",
  },
  {
    id: "CERT-2024-12349",
    date: "22 Jan 2022 | 11:30 AM",
    certificateId: "CERT-2024-12349",
    name: "Chinedu Nwosu",
    confidence: 28,
    status: "Forged",
  },
  {
    id: "CERT-2024-12350",
    date: "22 Jan 2022 | 11:30 AM",
    certificateId: "CERT-2024-12350",
    name: "Fatima Yusuf",
    confidence: 66,
    status: "Suspicious",
  },
  {
    id: "CERT-2024-12351",
    date: "22 Jan 2022 | 11:30 AM",
    certificateId: "CERT-2024-12351",
    name: "Samuel Kofi",
    confidence: 91,
    status: "Authentic",
  },
  {
    id: "CERT-2024-12352",
    date: "22 Jan 2022 | 11:30 AM",
    certificateId: "CERT-2024-12352",
    name: "Grace Eze",
    confidence: 59,
    status: "Suspicious",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState(initialTableData);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // visible rows (placeholder for future filtering/pagination)
  const visible = rows;
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto pt-6">
        {/* HEADER */}
        <header className="py-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Welcome Jayden
          </h2>
          <p className="text-sm text-slate-500">
            Here's what's happening with your certificate verifications today.
          </p>
        </header>

        {/* STATS */}
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

        {/* QUICK ACTIONS */}
        <section className="mb-20">
          <h3 className="text-sm font-medium text-slate-700 mb-3">
            Quick Actions
          </h3>

          <div className="md:w-10/12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Upload */}
              <div className="relative p-4 bg-white rounded-xl shadow-sm border overflow-hidden">
                <span className="absolute -inset-3 rounded-lg blur-3xl opacity-20 bg-blue-100" />
                <div className="relative h-10 w-10 flex items-center justify-center rounded-md bg-blue-50 text-blue-600">
                  <UploadCloud size={18} />
                </div>
                <div className="mt-2 text-sm font-medium text-slate-900">
                  Upload Certificate
                </div>
              </div>

              {/* Docs */}
              <div className="relative p-4 bg-white rounded-xl shadow-sm border overflow-hidden">
                <span className="absolute -inset-3 rounded-lg blur-3xl opacity-20 bg-emerald-100" />
                <div className="relative h-10 w-10 flex items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                  <BookOpen size={18} />
                </div>
                <div className="mt-2 text-sm font-medium text-slate-900">
                  API Documentation
                </div>
              </div>

              {/* Reports */}
              <div className="relative p-4 bg-white rounded-xl shadow-sm border overflow-hidden">
                <span className="absolute -inset-3 rounded-lg blur-3xl opacity-20 bg-amber-100" />
                <div className="relative h-10 w-10 flex items-center justify-center rounded-md bg-amber-50 text-amber-600">
                  <Download size={18} />
                </div>
                <div className="mt-2 text-sm font-medium text-slate-900">
                  Download Reports
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TABLE */}
        <section className="bg-white rounded-lg shadow-sm border">
          {/* TABLE HEADER */}
          <div className="flex items-center justify-between p-4 border-b">
            <h4 className="font-medium text-slate-800">Recent Verifications</h4>
            <div className="flex items-center gap-3">
              <input
                placeholder="Search"
                className="w-60 rounded-sm border border-[#EAECF0] px-3 py-2 text-sm focus:outline-none focus:border-[#727273] text-[#727273] focus:ring-[#EAECF0] focus:ring-offset-1"
              />
              <button className="border rounded-sm px-3 py-2 text-xs font-bold border-[#EAECF0] text-[#344054]  focus:border-[#727273] focus:outline-none focus:ring-[#727273] focus:ring-offset-1">
                Filter by
              </button>
            </div>
          </div>

          {/* TABLE BODY */}
          <div className="p-4">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full w-full table-auto hidden md:table">
                <thead className="bg-slate-50">
                  <tr className="text-left text-xs text-slate-500">
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Certificate ID</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Confidence</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>

                <tbody className="border-[#EAECF0]">
                  {visible.map((row) => (
                    <tr
                      key={row.id}
                      className="text-sm border-t border-[#EAECF0]"
                    >
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {row.date}
                      </td>
                      <td className="px-6 py-4 text-[#344054]">
                        {row.certificateId}
                      </td>
                      <td className="px-6 py-4 text-[#344054]">{row.name}</td>
                      <td className="px-6 py-4 text-[#344054]">
                        {row.confidence}%
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            row.status === "Authentic"
                              ? "bg-emerald-100 text-emerald-800"
                              : row.status === "Suspicious"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-slate-400 hover:text-slate-600">
                            <MoreHorizontal size={18} />
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onSelect={() =>
                                navigate(`/dashboard/verification/${row.id}`)
                              }
                            >
                              View Verification
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Download Analysis
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-rose-600"
                              onSelect={() => {
                                setSelectedId(row.id);
                                setDeleteOpen(true);
                              }}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile View (Cards) */}
              <div className="md:hidden space-y-4">
                {visible.map((row) => (
                  <div
                    key={row.id}
                    className="border border-[#EAECF0] rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>{row.date}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] ${
                          row.status === "Authentic"
                            ? "bg-emerald-100 text-emerald-800"
                            : row.status === "Suspicious"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>

                    <div className="mt-2 text-sm text-[#344054]">
                      <p>
                        <span className="font-medium">Name:</span> {row.name}
                      </p>
                      <p>
                        <span className="font-medium">Certificate ID:</span>{" "}
                        {row.certificateId}
                      </p>
                      <p>
                        <span className="font-medium">Confidence:</span>{" "}
                        {row.confidence}%
                      </p>
                    </div>

                    <div className="mt-3 flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="text-slate-400 hover:text-slate-600">
                          <MoreHorizontal size={18} />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            onSelect={() =>
                              navigate(`/dashboard/verification/${row.id}`)
                            }
                          >
                            View Verification
                          </DropdownMenuItem>
                          <DropdownMenuItem>Download Analysis</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-rose-600"
                            onSelect={() => {
                              setSelectedId(row.id);
                              setDeleteOpen(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-4 text-center flex justify-center border-t">
            <button className="border-[#EAECF0] border flex gap-2 justify-center focus:border-[#727273] items-center text-xs font-bold rounded-sm px-3 py-2  text-[#344054]">
              View all Verifications <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </div>
      {/* Delete confirmation modal */}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setDeleteOpen(false)}
          />

          <div className="relative bg-white rounded-md text-center shadow-lg w-[420px]">
            <div className="p-4 border-b">
              <h3 className="text-base font-semibold text-[#101828]">
                Delete Verification Result
              </h3>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                Are you sure you want to Delete this verification Result
              </p>
              <div className="flex gap-3 justify-center mt-5">
                <button
                  className="px-10 py-2 rounded-md bg-emerald-600 text-white"
                  onClick={() => {
                    setSelectedId(null);
                    setDeleteOpen(false);
                  }}
                >
                  No, Cancel
                </button>

                <button
                  className="px-10 py-2 rounded-md bg-rose-600 text-white"
                  onClick={() => {
                    if (selectedId)
                      setRows((prev) =>
                        prev.filter((r) => r.id !== selectedId)
                      );
                    setSelectedId(null);
                    setDeleteOpen(false);
                  }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

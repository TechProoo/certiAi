"use client";

import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { useState, useEffect } from "react";
import { authAPI, verificationAPI } from "../../api";
import type { DashboardStats } from "../../api/verification.api";
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
  FileQuestion,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../Components/Loader";

export default function Dashboard() {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const currentUser = authAPI.getCurrentUser();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        console.error("Failed to fetch dashboard stats:", err);
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await verificationAPI.deleteVerification(id);
      // Refresh stats after deletion
      const response = await verificationAPI.getDashboardStats();
      if (response.success) {
        setStats(response.data);
      }
      setDeleteOpen(false);
      setSelectedId(null);
    } catch (err: any) {
      console.error("Failed to delete verification:", err);
    }
  };

  const visible = stats?.recentVerifications || [];

  return (
    <DashboardLayout>
      {loading && <Loader />}

      {!loading && (
        <div className="max-w-6xl mx-auto px-0 pb-15 ">
          {/* HEADER */}
          <header className="pb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              Welcome {currentUser?.fullName || "User"}
            </h2>
            <p className="text-sm text-slate-500">
              Here's what's happening with your certificate verifications today.
            </p>
          </header>

          {/* STATS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
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
                hint: "Authentic certificates",
                bg: "linear-gradient(135deg, rgba(0, 201, 80, 0.1) 0%, rgba(5, 223, 114, 0.05) 100%)",
                icon: CheckCircle,
                iconColor: "text-emerald-700",
                iconBg: "#00C9501A",
              },
              {
                title: "Suspicious",
                value: stats?.suspicious || 0,
                hint: "Suspicious certificates",
                icon: AlertTriangle,
                bg: "linear-gradient(135deg, rgba(240, 177, 0, 0.1) 0%, rgba(253, 199, 0, 0.05) 100%)",
                iconColor: "text-amber-700",
                iconBg: "#F0B1001A",
              },
              {
                title: "Flagged",
                value: stats?.forged || 0,
                hint: "Flagged / Forged",
                icon: XCircle,
                bg: "linear-gradient(135deg, rgba(251, 44, 54, 0.1) 0%, rgba(255, 100, 103, 0.05) 100%)",
                iconColor: "text-rose-700",
                iconBg: "#FB2C361A",
              },
            ].map((s) => {
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

          {/* QUICK ACTIONS */}
          <section className="mb-16">
            <h3 className="text-sm font-medium text-slate-700 mb-4">
              Quick Actions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {/* Upload */}
              <Link
                to="/dashboard/upload"
                className="relative p-4 bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition cursor-pointer"
              >
                <span className="absolute -inset-3 rounded-lg blur-3xl opacity-20 bg-blue-100" />
                <div className="relative h-10 w-10 flex items-center justify-center rounded-md bg-blue-50 text-blue-600">
                  <UploadCloud size={18} />
                </div>
                <div className="mt-2 text-sm font-medium text-slate-900">
                  Upload Certificate
                </div>
              </Link>

              {/* Docs */}
              <a
                href="/api-docs"
                className="relative p-4 bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition cursor-pointer"
              >
                <span className="absolute -inset-3 rounded-lg blur-3xl opacity-20 bg-emerald-100" />
                <div className="relative h-10 w-10 flex items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                  <BookOpen size={18} />
                </div>
                <div className="mt-2 text-sm font-medium text-slate-900">
                  API Documentation
                </div>
              </a>

              {/* Reports */}
              <Link
                to="/dashboard/reports"
                className="relative p-4 bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition cursor-pointer"
              >
                <span className="absolute -inset-3 rounded-lg blur-3xl opacity-20 bg-amber-100" />
                <div className="relative h-10 w-10 flex items-center justify-center rounded-md bg-amber-50 text-amber-600">
                  <Download size={18} />
                </div>
                <div className="mt-2 text-sm font-medium text-slate-900">
                  Download Reports
                </div>
              </Link>
            </div>
          </section>

          {/* TABLE */}
          <section className="bg-white rounded-lg shadow-sm border ">
            {/* TABLE HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-2 border-b">
              <h4 className="font-medium text-slate-800">
                Recent Verifications
              </h4>

              {visible.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
                  <input
                    placeholder="Search"
                    className="w-full sm:w-60 rounded-sm border border-[#EAECF0] px-3 py-2 text-sm focus:outline-none focus:border-[#727273] text-[#727273]"
                  />

                  <button className="border w-full sm:w-auto rounded-sm px-3 py-2 text-xs font-bold border-[#EAECF0] text-[#344054]">
                    Filter by
                  </button>
                </div>
              )}
            </div>

            {/* EMPTY STATE */}
            {visible.length === 0 && (
              <div className="py-20 px-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center">
                    <FileQuestion size={32} className="text-slate-400" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  No Verifications Yet
                </h3>
                <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto">
                  You haven't uploaded any certificates for verification. Upload
                  your first certificate to get started with AI-powered
                  verification.
                </p>
                <Link
                  to="/dashboard/upload"
                  className="inline-flex items-center gap-2  text-white px-6 py-3 rounded-md bg-slate-800 transition"
                >
                  <UploadCloud size={16} />
                  Upload Certificateee
                </Link>
              </div>
            )}

            {/* TABLE BODY */}
            {visible.length > 0 && (
              <div className="w-full overflow-x-auto">
                <table className="min-w-full hidden md:table">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs text-slate-500">
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">File Name</th>
                      <th className="px-6 py-3">Type</th>
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
                          {new Date(row.createdAt).toLocaleDateString()} |{" "}
                          {new Date(row.createdAt).toLocaleTimeString()}
                        </td>
                        <td className="px-6 py-4 text-[#344054]">
                          {row.fileName}
                        </td>
                        <td className="px-6 py-4 text-[#344054]">
                          {row.certificateType}
                        </td>
                        <td className="px-6 py-4 text-[#344054]">
                          {row.confidenceScore
                            ? `${row.confidenceScore.toFixed(1)}%`
                            : "Pending"}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              row.status === "AUTHENTIC"
                                ? "bg-emerald-100 text-emerald-800"
                                : row.status === "SUSPICIOUS"
                                ? "bg-amber-100 text-amber-800"
                                : row.status === "FORGED"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-blue-100 text-blue-700"
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
                        <span>
                          {new Date(row.createdAt).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] ${
                            row.status === "AUTHENTIC"
                              ? "bg-emerald-100 text-emerald-800"
                              : row.status === "SUSPICIOUS"
                              ? "bg-amber-100 text-amber-800"
                              : row.status === "FORGED"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {row.status}
                        </span>
                      </div>

                      <div className="mt-2 text-sm text-[#344054]">
                        <p>
                          <span className="font-medium">File:</span>{" "}
                          {row.fileName}
                        </p>
                        <p>
                          <span className="font-medium">Type:</span>{" "}
                          {row.certificateType}
                        </p>
                        <p>
                          <span className="font-medium">Confidence:</span>{" "}
                          {row.confidenceScore
                            ? `${row.confidenceScore.toFixed(1)}%`
                            : "Pending"}
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
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FOOTER */}
            {visible.length > 0 && (
              <div className="p-4 text-center flex justify-center border-t">
                <Link
                  to="/dashboard/history"
                  className="border-[#EAECF0] border flex gap-2 justify-center items-center text-xs font-bold rounded-sm px-3 py-2 text-[#344054] hover:bg-slate-50 transition"
                >
                  View all Verifications <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </section>
        </div>
      )}

      {/* MODAL */}
      {deleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setDeleteOpen(false)}
          />

          <div className="relative bg-white rounded-md shadow-lg w-full max-w-sm mx-auto">
            <div className="p-4 border-b">
              <h3 className="text-base font-semibold text-[#101828]">
                Delete Verification Result
              </h3>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-600 mb-4">
                Are you sure you want to delete this verification result? This
                action cannot be undone.
              </p>

              <div className="flex gap-3 justify-center mt-5">
                <button
                  className="px-8 py-2 rounded-md bg-slate-200 text-slate-900 hover:bg-slate-300 transition"
                  onClick={() => {
                    setDeleteOpen(false);
                    setSelectedId(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  className="px-8 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 transition"
                  onClick={() => {
                    if (selectedId) {
                      handleDelete(selectedId);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

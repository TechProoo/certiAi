import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { useEffect, useState } from "react";
import {
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
  FileQuestion,
  UploadCloud,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { verificationAPI } from "../../api";
import type { VerificationData } from "../../api/verification.api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu";
import Loader from "../../Components/Loader";

export default function VerificationHistory() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verifications, setVerifications] = useState<VerificationData[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const pageSize = 10;

  // Fetch verification history from backend
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await verificationAPI.getHistory(page, pageSize);
        if (response.success) {
          setVerifications(response.data.verifications);
          setTotalCount(response.data.pagination.total);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [page]);

  const handleDelete = async (id: string) => {
    try {
      await verificationAPI.deleteVerification(id);
      // Refresh the list
      const response = await verificationAPI.getHistory(page, pageSize);
      if (response.success) {
        setVerifications(response.data.verifications);
        setTotalCount(response.data.pagination.total);
      }
      setDeleteOpen(false);
      setSelectedId(null);
    } catch (error) {
      console.error("Failed to delete verification:", error);
    }
  };

  const filtered = verifications.filter(
    (r) =>
      r.fileName.toLowerCase().includes(query.toLowerCase()) ||
      r.certificateType.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const currentPage = filtered;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto pt-6 pb-12">
        <h2 className="text-2xl font-semibold mb-2 text-slate-900">
          Verification History
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          A log of all past certificate verification Result
        </p>

        <section className="bg-white rounded-lg shadow-sm border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-1 border-b gap-3">
            <h4 className="font-medium text-slate-800">
              Verification History Table
            </h4>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full md:w-60 rounded-sm border border-[#EAECF0] px-3 py-2 text-sm focus:outline-none focus:border-[#727273] text-[#727273] focus:ring-[#EAECF0] focus:ring-offset-1"
              />
              <button className="hidden sm:inline-flex border rounded-sm px-3 py-2 text-xs font-bold border-[#EAECF0] text-[#344054]  focus:border-[#727273] focus:outline-none focus:ring-[#727273] focus:ring-offset-1">
                Filter by
              </button>
            </div>
          </div>

          <div className="p-1">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader />
              </div>
            ) : verifications.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                  <FileQuestion className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Verification History
                </h3>
                <p className="text-gray-600 text-center mb-6 max-w-md">
                  You haven't verified any certificates yet. Upload your first
                  certificate to get started.
                </p>
                <Link
                  to="/dashboard/upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <UploadCloud className="w-5 h-5" />
                  Upload Certificate
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto border rounded-md">
                <div className="w-full overflow-x-auto">
                  <table className="min-w-full hidden md:table">
                    <thead className="bg-slate-50">
                      <tr className="text-left text-xs text-slate-500">
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Certificate ID</th>
                        <th className="px-6 py-3">File Name</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3">Confidence</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3"></th>
                      </tr>
                    </thead>

                    <tbody className="border-[#EAECF0]">
                      {currentPage.map((row) => (
                        <tr
                          key={row.id}
                          className="text-sm border-t border-[#EAECF0]"
                        >
                          <td className="px-6 py-4 text-xs text-slate-500">
                            {new Date(row.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-[#344054]">
                            {row.id.substring(0, 8).toUpperCase()}
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
                              : "N/A"}
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
                                  : row.status === "PROCESSING"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
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
                                    navigate(
                                      `/dashboard/verification/${row.id}`
                                    )
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
                  <div className="md:hidden space-y-4 p-4">
                    {currentPage.map((row) => (
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
                                : row.status === "PROCESSING"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
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
                            <span className="font-medium">Certificate ID:</span>{" "}
                            {row.id.substring(0, 8).toUpperCase()}
                          </p>
                          <p>
                            <span className="font-medium">Type:</span>{" "}
                            {row.certificateType}
                          </p>
                          <p>
                            <span className="font-medium">Confidence:</span>{" "}
                            {row.confidenceScore
                              ? `${row.confidenceScore.toFixed(1)}%`
                              : "N/A"}
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
              </div>
            )}
          </div>

          {!loading && verifications.length > 0 && (
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                {/* Previous */}
                <div>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm bg-white text-slate-700"
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>
                </div>

                {/* Page numbers */}
                <div>
                  <div className="inline-flex items-center gap-2">
                    {(() => {
                      const pages: (number | string)[] = [];
                      const total = totalPages;
                      if (total <= 7) {
                        for (let i = 1; i <= total; i++) pages.push(i);
                      } else {
                        // always show first 2
                        pages.push(1, 2);
                        const left = Math.max(3, page - 1);
                        const right = Math.min(total - 2, page + 1);
                        if (left > 3) pages.push("...");
                        for (let i = left; i <= right; i++) pages.push(i);
                        if (right < total - 2) pages.push("...");
                        pages.push(total - 1, total);
                      }

                      return pages.map((pVal, idx) =>
                        typeof pVal === "string" ? (
                          <div
                            key={`e-${idx}`}
                            className="px-2 text-sm text-slate-400"
                          >
                            {pVal}
                          </div>
                        ) : (
                          <button
                            key={pVal}
                            onClick={() => setPage(pVal)}
                            className={`inline-flex items-center justify-center text-sm rounded-md w-8 h-8 ${
                              pVal === page
                                ? "bg-[#EAECF0] text-slate-900 shadow-sm border "
                                : "bg-transparent text-slate-600"
                            }`}
                          >
                            {pVal}
                          </button>
                        )
                      );
                    })()}
                  </div>
                </div>

                {/* Next */}
                <div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm bg-white text-slate-700"
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
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
                    if (selectedId) {
                      handleDelete(selectedId);
                    }
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

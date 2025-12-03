import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { useEffect, useMemo, useState } from "react";
import { MoreHorizontal, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu";
type HistoryRow = {
  id: string;
  date: string;
  certificateId: string;
  name: string;
  confidence: number;
  status: "Authentic" | "Suspicious" | "Forged";
};

function statusForConfidence(c: number): HistoryRow["status"] {
  if (c >= 90) return "Authentic";
  if (c >= 50) return "Suspicious";
  return "Forged";
}

export default function VerificationHistory() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);

  const pageSize = 8;

  // ✅ FIXED: only one rows definition
  const rows = useMemo<HistoryRow[]>(() => {
    const out: HistoryRow[] = [];

    try {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i) ?? "";
        if (!key.startsWith("verification-")) continue;

        const id = key.replace("verification-", "");
        const raw = sessionStorage.getItem(key);
        if (!raw) continue;

        try {
          const files = JSON.parse(raw) as Array<{ name: string }>;
          const name = files[0]?.name ?? "Unknown";

          const confidence = Math.max(
            10,
            Math.min(98, 50 + (name.length % 50))
          );

          out.push({
            id,
            date: new Date().toLocaleString(),
            certificateId: `CERT-${id.slice(0, 8)}`,
            name,
            confidence,
            status: statusForConfidence(confidence),
          });
        } catch {}
      }
    } catch {}

    if (out.length === 0) {
      const names = [
        "Emma William",
        "John Doe",
        "Aisha Bello",
        "Michael Okon",
        "Chinedu Nwosu",
        "Fatima Yusuf",
        "Samuel Kofi",
        "Grace Eze",
      ];

      for (let i = 0; i < 16; i++) {
        const id = `${Date.now()}-${i}`;
        const name = names[i % names.length];
        const confidence = Math.max(
          10,
          Math.min(98, Math.floor(Math.random() * 100))
        );

        out.push({
          id,
          date: new Date(Date.now() - i * 3600000).toLocaleString(),
          certificateId: `CERT-2024-${10000 + i}`,
          name,
          confidence,
          status: statusForConfidence(confidence),
        });
      }
    }

    return out.reverse();
  }, [refresh]);

  const filtered = rows.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.certificateId.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);

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
            <div className="overflow-x-auto border rounded-md">
              <div className="w-full overflow-x-auto">
                <table className="min-w-full hidden md:table">
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
          </div>

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
                      try {
                        sessionStorage.removeItem(`verification-${selectedId}`);
                      } catch {}
                      setRefresh((v) => v + 1);
                    }
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

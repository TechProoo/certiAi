"use client";

import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { Download, ChevronLeft } from "lucide-react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader";

type SerializedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  dataUrl: string;
};

export default function VerificationResult() {
  const params = useParams();
  const id = params.id ?? "CERT-XXXX";
  const location = useLocation();

  const [files, setFiles] = useState<SerializedFile[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const stateFiles = (location.state as any)?.files as
      | SerializedFile[]
      | undefined;
    if (stateFiles && Array.isArray(stateFiles) && stateFiles.length > 0) {
      setFiles(stateFiles);
      try {
        sessionStorage.setItem(
          `verification-${id}`,
          JSON.stringify(stateFiles)
        );
      } catch {}
    } else {
      try {
        const raw = sessionStorage.getItem(`verification-${id}`);
        if (raw) setFiles(JSON.parse(raw) as SerializedFile[]);
      } catch {}
    }

    setProcessing(true);
    const t = setTimeout(() => setProcessing(false), 900);
    return () => clearTimeout(t);
  }, [id, location.state]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto pt-6 pb-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-slate-600"
          >
            <ChevronLeft size={16} />
            <span>Back</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Verification Result — {id}
            </h2>
            <p className="text-sm text-slate-500">
              Select a certificate type and upload to verify its authenticity
            </p>
          </div>

          <div className="ml-auto">
            <div className="flex items-center gap-2">
              {/* icon-only on small screens */}
              <button
                aria-label="Download verification report"
                title="Download verification report"
                className="md:hidden p-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                <Download size={16} />
              </button>

              {/* full button on md+ */}
              <button className="hidden md:inline-flex bg-slate-900 text-white px-4 py-2 rounded-md text-sm items-center gap-2 hover:bg-slate-800 transition">
                <Download size={14} />
                <span>Download Verification Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Summary card */}
        <div className="bg-[#F9F9FB] rounded-lg shadow-sm border mb-6">
          {/* Tabs for multiple files */}
          {files.length > 1 && (
            <div className="p-4 border-b bg-white rounded-t-md">
              <div className="flex gap-2">
                {files.map((f, idx) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      idx === activeIndex
                        ? "bg-slate-900 text-white"
                        : "bg-transparent text-slate-700"
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {processing && <Loader />}

          {!processing && files.length === 0 && (
            <div className="p-12 text-center text-slate-500">No file found</div>
          )}

          {!processing &&
            files.length > 0 &&
            (() => {
              const f = files[activeIndex] ?? files[0];
              return (
                <div>
                  <div className="p-6 border-b border-slate-200">
                    <h3 className="font-medium text-sm mb-4 text-[#101828]">
                      Certificate Summary
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                      <div className="md:col-span-2 grid grid-cols-2 gap-y-20">
                        <div>
                          <div className="text-xs text-slate-500">
                            File Name
                          </div>
                          <div className="font-medium text-slate-900">
                            {f.name}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-slate-500">
                            File Type
                          </div>
                          <div className="font-medium text-slate-900">
                            {f.type}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-slate-500">
                            File Size
                          </div>
                          <div className="font-medium text-slate-900">
                            {Math.round(f.size / 1024)} KB
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-slate-500">Uploaded</div>
                          <div className="font-medium text-slate-900">
                            {new Date().toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <div className="w-full rounded-md overflow-hidden border p-3 flex items-center justify-center">
                          <img
                            src={f.dataUrl}
                            alt={f.name}
                            className="w-48 h-auto object-cover rounded-md border-2 border-dashed border-cyan-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:p-10 p-2">
                    {/* Verification Status */}
                    <h4 className="font-medium mb-4 text-[#101828]">
                      Verification Status
                    </h4>
                    <div className="bg-white relative overflow-hidden rounded-lg shadow-sm border px-6 py-2 mb-6">
                      <div className="flex items-center gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-1 h-100 top-0 absolute left-0 rounded-full bg-emerald-500" />
                            <div className="text-sm font-bold text-[#101828] heading">
                              Authentic
                            </div>
                          </div>

                          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                            <div
                              className="h-3 bg-emerald-500 rounded-full"
                              style={{ width: "95%" }}
                            />
                          </div>
                        </div>

                        <div className="text-sm text-slate-500">
                          <span className="font-bold">95%</span> Confidence
                        </div>
                      </div>
                    </div>

                    {/* Analysis chips */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                      <h5 className="font-medium mb-4">Analysis</h5>
                      <div className="flex flex-wrap gap-3">
                        <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                          Seal detected
                        </span>
                        <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                          Layout matches template
                        </span>
                        <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                          Font family matches
                        </span>
                        <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                          No pixel tampering detected
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
        </div>
      </div>
    </DashboardLayout>
  );
}

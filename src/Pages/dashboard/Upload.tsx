"use client";

import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { useState, useCallback, useEffect, useRef } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { verificationAPI } from "../../api";
import Waec from "../../assets/waec.png";
import Neco from "../../assets/neco.png";
import Jupeb from "../../assets/jupeb.png";
import Ican from "../../assets/ican.png";
import Jamb from "../../assets/jamb.jpg";

const certTypes = ["WASSCE", "JAMB", "NECO", "JUPEB", "ICAN"];

const certIcons: Record<string, string> = {
  WASSCE: Waec,
  JAMB: Jamb,
  NECO: Neco,
  JUPEB: Jupeb,
  ICAN: Ican,
};

export default function Upload() {
  const [selectedType, setSelectedType] = useState<string>(certTypes[0]);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedId, setUploadedId] = useState<string | null>(null);

  type FileItem = { id: string; file: File; preview: string | null };
  const [files, setFiles] = useState<FileItem[]>([]);

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    // Only allow one file at a time
    const file = incoming[0];
    if (!file) return;

    const fileItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    };
    setFiles([fileItem]);
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto ">
        <div className="flex justify-between items-center ">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-slate-900">
              Upload Certificate
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Select a certificate type and upload to verify its authenticity
            </p>
          </div>
          <div>
            <button
              disabled={files.length === 0 || uploading}
              onClick={async () => {
                if (files.length === 0) return;

                try {
                  setUploading(true);
                  setError(null);

                  const file = files[0].file;
                  const response = await verificationAPI.uploadCertificate(
                    file,
                    selectedType
                  );

                  if (response.success && response.data) {
                    setUploadedId(response.data.id);

                    // Navigate to verification result page after 2 seconds
                    setTimeout(() => {
                      navigate(`/dashboard/verification/${response.data.id}`);
                    }, 2000);
                  }
                } catch (err: any) {
                  console.error("Upload failed:", err);
                  setError(
                    err.message ||
                      "Failed to upload certificate. Please try again."
                  );
                  setUploading(false);
                }
              }}
              className={`px-6 py-3 rounded-md text-white transition ${
                files.length === 0 || uploading
                  ? "bg-slate-300 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {uploading ? "Uploading..." : "Submit for Verification"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: types */}
          <aside className="lg:col-span-3">
            <div className="space-y-3">
              {certTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`w-full text-left px-4 py-3 rounded-md flex items-center justify-between border ${
                    selectedType === t
                      ? "bg-white shadow-md border-slate-200"
                      : "bg-transparent border-transparent"
                  } `}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={certIcons[t]}
                        alt={`${t} logo`}
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                    <div className="text-sm font-medium text-slate-800">
                      {t}
                    </div>
                  </div>
                  <div className="text-xs text-slate-400">•</div>
                </button>
              ))}
            </div>
          </aside>

          {/* Center: drop area */}
          <div className="lg:col-span-7">
            <div className="rounded-md border-2 border-dashed border-[#E6E7EA] h-120 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center text-slate-400">
                  <UploadCloud size={36} />
                </div>
                <div className="text-sm text-slate-500 mb-4">
                  Drag and drop certificates here
                </div>
                <div className="inline-block">
                  <input
                    id="upload-input"
                    ref={useRef<HTMLInputElement | null>(null)}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    multiple
                    onChange={(e) => {
                      addFiles(e.target.files ?? null);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(
                        "upload-input"
                      ) as HTMLInputElement | null;
                      el?.click();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Browse Files
                  </button>
                </div>
                <div className="text-xs text-slate-400 mt-3">
                  Supported file types are JPG, PDF and PNG
                </div>
              </div>
            </div>
          </div>

          {/* Right: preview */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {files.length === 0 && (
                <div className="h-40 w-full rounded-md border border-dashed border-[#E6E7EA] flex items-center justify-center overflow-hidden">
                  <div className="text-slate-400 text-sm">Preview</div>
                </div>
              )}

              {files.map((f) => {
                const isImage = f.file.type.startsWith("image/");
                const isPDF = f.file.type === "application/pdf";

                return (
                  <div
                    key={f.id}
                    className="relative w-full rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <button
                      aria-label="remove"
                      onClick={() => {
                        setFiles((prev) => {
                          prev.forEach(
                            (p) =>
                              p.id === f.id &&
                              p.preview &&
                              URL.revokeObjectURL(p.preview)
                          );
                          return prev.filter((p) => p.id !== f.id);
                        });
                      }}
                      className="absolute right-2 top-2 z-10 h-6 w-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-600 transition-colors"
                    >
                      ✕
                    </button>

                    {isImage && f.preview ? (
                      // Image preview
                      <div className="p-3">
                        <div className="h-24 w-full rounded-md bg-slate-50 flex items-center justify-center overflow-hidden">
                          <img
                            src={f.preview}
                            alt={f.file.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="mt-2">
                          <div className="text-sm font-medium text-slate-800 truncate">
                            {f.file.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {Math.round(f.file.size / 1024)} KB
                          </div>
                        </div>
                      </div>
                    ) : (
                      // PDF or non-image file display
                      <div className="p-4 flex items-center gap-4">
                        <div className="shrink-0 h-16 w-16 rounded-lg bg-linear-to-br from-red-50 to-red-100 flex items-center justify-center">
                          {isPDF ? (
                            <svg
                              className="h-8 w-8 text-red-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                              <path d="M14 2v6h6M9.5 13h1v3.5h-1V13zm2.5 0h1.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5H12v1h-1V13h1.5zm0 2h1.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5H12v1z" />
                              <text
                                x="7"
                                y="19"
                                fontSize="4"
                                fill="currentColor"
                                fontWeight="bold"
                              >
                                PDF
                              </text>
                            </svg>
                          ) : (
                            <svg
                              className="h-8 w-8 text-slate-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                              <path d="M14 2v6h6" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-800 truncate">
                            {f.file.name}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {isPDF ? "PDF Document" : f.file.type || "Document"}{" "}
                            • {Math.round(f.file.size / 1024)} KB
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full"></div>
                              </div>
                              <span className="text-xs text-green-600 font-medium">
                                Ready
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Submit button */}
        <div className="flex flex-col items-end mt-6 gap-3">
          {error && (
            <div className="w-full bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {uploadedId && (
            <div className="w-full bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-md text-sm flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span>
                Certificate uploaded successfully! Processing verification...
              </span>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

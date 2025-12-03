"use client";

import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { useState, useCallback, useEffect, useRef } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
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

  type FileItem = { id: string; file: File; preview: string | null };
  const [files, setFiles] = useState<FileItem[]>([]);

  // helper to read file as data URL for transferring to verification page
  const readFileAsDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const list = Array.from(incoming).map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      file: f,
      preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null,
    }));
    setFiles((prev) => [...prev, ...list]);
  }, []);

  useEffect(() => {
    return () => {
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto ">
        <h2 className="text-xl font-semibold mb-2 text-slate-900">
          Upload Certificate
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Select a certificate type and upload to verify its authenticity
        </p>

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

              {files.map((f) => (
                <div
                  key={f.id}
                  className="relative h-28 w-full rounded-md border border-dashed border-[#E6E7EA] flex items-center p-3"
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
                    className="absolute right-2 top-2 text-slate-400 hover:text-rose-600"
                  >
                    ✕
                  </button>

                  <div className="h-20 w-20 rounded-md bg-slate-50 flex items-center justify-center overflow-hidden">
                    {f.preview ? (
                      <img
                        src={f.preview}
                        alt={f.file.name}
                        className="h-full object-contain"
                      />
                    ) : (
                      <div className="text-slate-400">{f.file.name}</div>
                    )}
                  </div>

                  <div className="ml-3 truncate">
                    <div className="text-sm font-medium text-slate-800 truncate">
                      {f.file.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {Math.round(f.file.size / 1024)} KB
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Submit button */}
        <div className="flex justify-end mt-6">
          <button
            disabled={files.length === 0}
            onClick={async () => {
              if (files.length === 0) return;

              // Prepare serialized files (data URLs) so verification page can render them
              const serialized = await Promise.all(
                files.map(async (f) => ({
                  id: f.id,
                  name: f.file.name,
                  size: f.file.size,
                  type: f.file.type,
                  dataUrl: await readFileAsDataUrl(f.file),
                }))
              );

              const pageId = files[0]?.id ?? `${Date.now()}`;
              try {
                sessionStorage.setItem(
                  `verification-${pageId}`,
                  JSON.stringify(serialized)
                );
              } catch (e) {
                // ignore sessionStorage errors
              }

              navigate(`/dashboard/verification/${pageId}`, {
                state: { files: serialized },
              });
            }}
            className={`px-4 py-2 rounded-md text-white ${
              files.length === 0 ? "bg-slate-300" : "bg-slate-900"
            }`}
          >
            Submit for Verification
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

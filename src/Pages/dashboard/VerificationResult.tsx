"use client";

import DashboardLayout from "../../Components/dashboard/DashboardLayout";
import { Download, ChevronLeft } from "lucide-react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader";
import { verificationAPI } from "../../api/verification.api";
import type { VerificationData } from "../../api/verification.api";

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
  const [verification, setVerification] = useState<VerificationData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Fetch verification data
  useEffect(() => {
    if (!id) return;

    let pollInterval: ReturnType<typeof setInterval> | null = null;

    const fetchVerification = async () => {
      try {
        const response = await verificationAPI.getVerificationById(id);
        if (response.success && response.data) {
          setVerification(response.data);

          // If still processing, continue polling
          if (
            response.data.status === "PENDING" ||
            response.data.status === "PROCESSING"
          ) {
            setProcessing(true);
          } else {
            setProcessing(false);
            if (pollInterval) {
              clearInterval(pollInterval);
              pollInterval = null;
            }
          }
        }
        console.log(response);
      } catch (err: any) {
        console.error("Failed to fetch verification:", err);
        setError(err.message || "Failed to load verification");
        setProcessing(false);
        if (pollInterval) {
          clearInterval(pollInterval);
          pollInterval = null;
        }
      }
    };

    // Initial fetch
    fetchVerification();

    // Poll every 2 seconds
    pollInterval = setInterval(fetchVerification, 2000);

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [id]);

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

          {!verification && processing && <Loader />}

          {!verification && !processing && (
            <div className="p-12 text-center text-slate-500">
              {error || "Loading verification data..."}
            </div>
          )}

          {verification &&
            (() => {
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
                            {verification.fileName}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-slate-500">
                            File Type
                          </div>
                          <div className="font-medium text-slate-900">
                            {verification.fileMimeType}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-slate-500">
                            File Size
                          </div>
                          <div className="font-medium text-slate-900">
                            {Math.round(verification.fileSize / 1024)} KB
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-slate-500">Uploaded</div>
                          <div className="font-medium text-slate-900">
                            {new Date(verification.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        {(() => {
                          const isImage =
                            verification.fileMimeType.startsWith("image/");
                          const isPDF =
                            verification.fileMimeType === "application/pdf";
                          const imageUrl = `http://localhost:3000/${verification.fileUrl
                            .split("\\")
                            .join("/")}`;

                          return (
                            <div className="w-full rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
                              {isImage ? (
                                // Image preview
                                <div className="p-3">
                                  <div className="w-full h-48 rounded-md bg-slate-50 flex items-center justify-center overflow-hidden">
                                    <img
                                      src={imageUrl}
                                      alt={verification.fileName}
                                      className="max-w-full max-h-full object-contain"
                                      onError={(e) => {
                                        console.error(
                                          "Image failed to load:",
                                          verification.fileUrl
                                        );
                                        (
                                          e.target as HTMLImageElement
                                        ).style.display = "none";
                                        const parent = (
                                          e.target as HTMLImageElement
                                        ).parentElement;
                                        if (parent) {
                                          parent.innerHTML =
                                            '<div class="text-sm text-slate-500">Failed to load image</div>';
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                // PDF or non-image file display
                                <div className="p-4">
                                  <div className="flex items-center gap-4">
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
                                        {verification.fileName}
                                      </div>
                                      <div className="text-xs text-slate-500 mt-1">
                                        {isPDF
                                          ? "PDF Document"
                                          : verification.fileMimeType ||
                                            "Document"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  <div className="md:p-10 p-2">
                    {/* Verification Status */}
                    <h4 className="font-medium mb-4 text-[#101828]">
                      Verification Status
                    </h4>

                    {error && (
                      <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                        {error}
                      </div>
                    )}

                    {!verification ? (
                      <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-slate-500">
                        Loading verification data...
                      </div>
                    ) : verification.status === "PENDING" ||
                      verification.status === "PROCESSING" ? (
                      <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center gap-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
                          <div>
                            <div className="font-medium text-slate-900">
                              Processing...
                            </div>
                            <div className="text-sm text-slate-500">
                              {verification.status === "PENDING"
                                ? "Waiting to start verification"
                                : "Analyzing certificate"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white relative overflow-hidden rounded-lg shadow-sm border px-6 py-2 mb-6">
                        <div className="flex items-center gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <div
                                className={`w-1 h-100 top-0 absolute left-0 rounded-full ${
                                  verification.status === "AUTHENTIC"
                                    ? "bg-emerald-500"
                                    : verification.status === "SUSPICIOUS"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                              />
                              <div
                                className={`text-sm font-bold heading ${
                                  verification.status === "AUTHENTIC"
                                    ? "text-emerald-600"
                                    : verification.status === "SUSPICIOUS"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                }`}
                              >
                                {verification.status === "AUTHENTIC"
                                  ? "Authentic"
                                  : verification.status === "SUSPICIOUS"
                                  ? "Suspicious"
                                  : "Forged"}
                              </div>
                            </div>

                            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                              <div
                                className={`h-3 rounded-full ${
                                  verification.status === "AUTHENTIC"
                                    ? "bg-emerald-500"
                                    : verification.status === "SUSPICIOUS"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{
                                  width: `${
                                    verification.confidenceScore || 0
                                  }%`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="text-sm text-slate-500">
                            <span className="font-bold">
                              {verification.confidenceScore?.toFixed(2) || 0}%
                            </span>{" "}
                            Confidence
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Analysis chips */}
                    {verification &&
                      verification.status !== "PENDING" &&
                      verification.status !== "PROCESSING" &&
                      verification.analysisResult && (
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                          <h5 className="font-medium mb-4">Analysis</h5>
                          <div className="flex flex-wrap gap-3">
                            {verification.analysisResult.details
                              ?.textRecognition && (
                              <span
                                className={`text-xs px-3 py-1 rounded-full ${
                                  verification.analysisResult.details
                                    .textRecognition === "Successful"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-red-50 text-red-600"
                                }`}
                              >
                                Text:{" "}
                                {
                                  verification.analysisResult.details
                                    .textRecognition
                                }
                              </span>
                            )}
                            {verification.analysisResult.details
                              ?.signatureDetection && (
                              <span
                                className={`text-xs px-3 py-1 rounded-full ${
                                  verification.analysisResult.details
                                    .signatureDetection === "Valid"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-red-50 text-red-600"
                                }`}
                              >
                                Signature:{" "}
                                {
                                  verification.analysisResult.details
                                    .signatureDetection
                                }
                              </span>
                            )}
                            {verification.analysisResult.details
                              ?.watermarkVerification && (
                              <span
                                className={`text-xs px-3 py-1 rounded-full ${
                                  verification.analysisResult.details
                                    .watermarkVerification === "Present"
                                    ? "bg-emerald-50 text-emerald-600"
                                    : "bg-yellow-50 text-yellow-600"
                                }`}
                              >
                                Watermark:{" "}
                                {
                                  verification.analysisResult.details
                                    .watermarkVerification
                                }
                              </span>
                            )}
                            {verification.analysisResult.details
                              ?.templateMatching && (
                              <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                                Template:{" "}
                                {
                                  verification.analysisResult.details
                                    .templateMatching
                                }
                              </span>
                            )}
                          </div>

                          {verification.processingTime && (
                            <div className="mt-4 pt-4 border-t text-xs text-slate-500">
                              Processing time:{" "}
                              {(verification.processingTime / 1000).toFixed(2)}s
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              );
            })()}
        </div>
      </div>
    </DashboardLayout>
  );
}

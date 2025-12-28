import axiosInstance from "../lib/axios";
import type { ApiResponse } from "../types";

export interface VerificationData {
  id: string;
  userId: string;
  certificateType: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileMimeType: string;
  status: "PENDING" | "PROCESSING" | "AUTHENTIC" | "SUSPICIOUS" | "FORGED";
  confidenceScore: number | null;
  analysisResult: any;
  errorMessage: string | null;
  processingTime: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalVerified: number;
  authentic: number;
  suspicious: number;
  forged: number;
  pending: number;
  recentVerifications: VerificationData[];
}

export interface VerificationHistoryResponse {
  verifications: VerificationData[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

class VerificationAPI {
  /**
   * Upload certificate for verification
   */
  async uploadCertificate(
    file: File,
    certificateType: string
  ): Promise<ApiResponse<VerificationData>> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("certificateType", certificateType);

    const response = await axiosInstance.post(
      "/verification/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response)
    return response.data;
  }

  /**
   * Get verification history
   */
  async getHistory(
    page = 1,
    pageSize = 10
  ): Promise<ApiResponse<VerificationHistoryResponse>> {
    const response = await axiosInstance.get("/verification/history", {
      params: { page, pageSize },
    });
    return response.data;
  }

  /**
   * Get verification by ID
   */
  async getVerificationById(
    id: string
  ): Promise<ApiResponse<VerificationData>> {
    const response = await axiosInstance.get(`/verification/${id}`);
    return response.data;
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    const response = await axiosInstance.get("/verification/dashboard/stats");
    return response.data;
  }

  /**
   * Delete verification
   */
  async deleteVerification(id: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete(`/verification/${id}`);
    return response.data;
  }
}

export const verificationAPI = new VerificationAPI();

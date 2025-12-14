import axiosInstance from "../lib/axios";
import Cookies from "js-cookie";
import type {
  RegisterData,
  LoginData,
  VerifyEmailData,
  ForgotPasswordData,
  ResetPasswordData,
  ApiResponse,
  AuthResponseData,
  RegisterResponseData,
  ProfileResponseData,
  User,
} from "../types";

class AuthAPI {
  /**
   * Register a new user
   */
  async register(
    data: RegisterData
  ): Promise<ApiResponse<RegisterResponseData>> {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  }

  /**
   * Login user
   */
  async login(data: LoginData): Promise<ApiResponse<AuthResponseData>> {
    const response = await axiosInstance.post("/auth/login", data);

    // Store tokens in cookies (7 days expiration)
    if (response.data.data?.accessToken) {
      Cookies.set("accessToken", response.data.data.accessToken, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("user", JSON.stringify(response.data.data.user), {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    }

    return response.data;
  }

  /**
   * Verify email with code
   */
  async verifyEmail(data: VerifyEmailData): Promise<ApiResponse> {
    const response = await axiosInstance.post("/auth/verify-email", data);
    return response.data;
  }

  /**
   * Request password reset
   */
  async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse> {
    const response = await axiosInstance.post("/auth/forgot-password", data);
    return response.data;
  }

  /**
   * Reset password with code
   */
  async resetPassword(data: ResetPasswordData): Promise<ApiResponse> {
    const response = await axiosInstance.post("/auth/reset-password", data);
    return response.data;
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ApiResponse<ProfileResponseData>> {
    const response = await axiosInstance.get("/auth/profile");
    return response.data;
  }

  /**
   * Logout user
   */
  logout(): void {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    window.location.href = "/signin";
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!Cookies.get("accessToken");
  }

  /**
   * Get current user from cookies
   */
  getCurrentUser(): User | null {
    const userStr = Cookies.get("user");
    return userStr ? JSON.parse(userStr) : null;
  }
}

export const authAPI = new AuthAPI();

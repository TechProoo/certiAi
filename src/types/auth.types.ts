import type { User, UserRole } from "./user.types";

// Request DTOs
export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  institutionName?: string;
  role: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface VerifyEmailData {
  code: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  code: string;
  newPassword: string;
}

// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// Response data types
export interface AuthResponseData {
  user: User;
  accessToken: string;
}

export interface RegisterResponseData {
  user: User;
}

export interface ProfileResponseData extends User {}

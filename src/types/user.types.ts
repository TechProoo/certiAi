export interface User {
  id: string;
  email: string;
  fullName: string;
  institutionName?: string;
  role: "INSTITUTION" | "EMPLOYER" | "GUEST";
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "INSTITUTION" | "EMPLOYER" | "GUEST";

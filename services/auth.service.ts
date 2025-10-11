// import axiosInstance from "@/lib/axios";
// import { Cookies } from "react-cookie";
// import type { LoginFormData, SignupFormData, VerifyEmailData, AuthResponse, CreateServiceData } from "@/types/auth";

// const cookies = new Cookies();

// export const AuthService = {
//   async signup(data: SignupFormData): Promise<AuthResponse> {
//     const response = await axiosInstance.post<AuthResponse>("/auth/signup", data);
//     return response.data;
//   },

//   async verifyEmail(data: VerifyEmailData): Promise<AuthResponse> {
//     const response = await axiosInstance.post<AuthResponse>("/auth/verify_email_verification_token", data);
//     return response.data;
//   },

//   async login(data: LoginFormData): Promise<AuthResponse> {
//     const response = await axiosInstance.post<AuthResponse>("/auth/login", data);

//     if (response.data.accessToken) {
//       cookies.set("accessToken", response.data.accessToken, { path: "/" });
//       cookies.set("refreshToken", response.data.refreshToken, { path: "/" });
//       cookies.set("user", JSON.stringify(response.data.user), { path: "/" });
//     }

//     return response.data;
//   },

//   async createService(data: CreateServiceData): Promise<{ success: boolean; message: string }> {
//     const response = await axiosInstance.post("/resqx-services/create", data);
//     return response.data;
//   },

//   logout() {
//     cookies.remove("accessToken");
//     cookies.remove("refreshToken");
//     cookies.remove("user");
//   },
// };

import axiosInstance from "@/lib/axios";
import { Cookies } from "react-cookie";
import type {
  LoginFormData,
  SignupFormData,
  VerifyEmailData,
  AuthResponse,
  CreateServiceData,
} from "@/types/auth";

const cookies = new Cookies();

export const AuthService = {
  async signup(data: SignupFormData): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/signup",
      data
    );
    return response.data;
  },

  async verifyEmail(data: VerifyEmailData): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/verify_email_verification_token",
      data
    );
    return response.data;
  },

  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>(
      "/auth/login",
      data
    );

    if (response.data.access_token) {
      // Changed: Use consistent cookie names with underscores
      cookies.set("access_token", response.data.access_token, { path: "/" });
      cookies.set("refresh_token", response.data.refresh_token, { path: "/" });
      cookies.set("user", JSON.stringify(response.data.user), { path: "/" });
    }

    return response.data;
  },

  async createService(
    data: CreateServiceData
  ): Promise<{ success: boolean; message: string }> {
    const response = await axiosInstance.post("/resqx-services/create", data);
    return response.data;
  },

  logout() {
    // Changed: Use consistent cookie names with underscores
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    cookies.remove("user");
  },
};

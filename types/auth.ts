export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  country: string;
  phone: string;
  // userType: "ADMIN" | "CUSTOMER_SUPPORT" | "OPERATION_MANAGER";
  userType: "ADMIN";
  password: string;
}

export interface VerifyEmailData {
  email: string;
  token: string;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  access_token?: string;
  refresh_token?: string;
  user?: User;
}

// export interface User {
//   id: string;
//   name: string;
//   country: string;
//   phone: string;
//   email: string;
//   transaction_pin: string | null;
//   profile_picture: string | null;
//   is_verified: boolean;
//   is_online: boolean;
//   fcmToken: string | null;
//   longitude: number | null;
//   latitude: number | null;
//   userType: "ADMIN" | "CUSTOMER";
//   created_at: string;
//   updated_at: string;
// }

export interface User {
  id: string;
  name: string;
  company_name: string;
  company_address: string;
  tax_id: string;
  cac: string;
  email: string;
  company_email: string;
  country: string;
  phone: string;
  company_phone: string;
  password: string;
  transaction_pin: string | null;
  profile_picture: string | null;
  is_verified: boolean;
  fcmToken: string | null;
  refreshToken: string | null;
  // is_online: boolean;
  // longitude: number | null;
  // latitude: number | null;
  // userType: "ADMIN" | "CUSTOMER";
  created_at: string;
  updated_at: string;
}

// "id": "9deb5d8b-a38e-477e-8e97-a33706f4bf71",
// "name": "John",
// "company_name": "AllHivey",
// "company_address": "",
// "tax_id": "",
// "cac": "",
// "email": "emyyoung20@gmail.com",
// "company_email": "a@allhivey.com",
// "country": "NG",
// "phone": "+2348156170218",
// "company_phone": "+2348156170218",
// "password": "$2b$10$AyAJ31oRCKWjyMrPXgDMC.gBiuNxI.PbEJ77addH4ofndhsSQMQKO",
// "transaction_pin": null,
// "is_verified": false,
// "fcmToken": null,
// "refreshToken": null,
// "created_at": "2025-09-22T13:42:13.830Z",
// "updated_at": "2025-10-02T02:25:24.184Z"

export interface CreateServiceData {
  service_name: string;
  unit_price: number;
  delivery_price: number;
  service_price: number;
}

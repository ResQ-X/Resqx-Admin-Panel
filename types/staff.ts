export interface StaffMember {
  id: string;
  name: string;
  location: string;
  status: "On Duty" | "Off Duty" | "Busy";
  photo?: string;
}

export interface Responder extends StaffMember {
  resolved: number;
  avgResponseTime: string;
  assignedVehicle?: string;
}

export interface AdminStaff extends StaffMember {
  role: string;
  created_at: string;
}

export interface StaffProfile {
  id: string;
  name: string;
  role: string;
  emailAddress: string;
  contactNumber: string;
  address: string;
  startDate: string;
  endDate: string;
  assignedVehicle?: string;
  payment: {
    bankName: string;
    accountNumber: string;
    frequency: string;
  };
  assignedItems: string[];
  photo?: string;
}

export interface PhotoUploadState {
  status: "idle" | "uploading" | "success" | "error";
  progress: number;
  photo?: string;
}

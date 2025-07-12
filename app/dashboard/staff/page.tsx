"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { RespondersTable } from "@/components/staff/responders-table";
import { AdminTable } from "@/components/staff/admin-table";
import { AdminStaff } from "@/types/staff";

export type Professional = {
  id: string;
  name: string;
  location: string;
  role?: string;
  dateAdded?: string;
  status: "On Duty" | "Off Duty" | "Busy";
  resolved?: number;
  avgResponseTime?: string;
};

const MOCK_RESPONDERS = [
  {
    id: "FR-045",
    name: "Daniel Osei",
    location: "12 Awolowo Way, Ikeja",
    resolved: 35,
    avgResponseTime: "4 Min",
    status: "On Duty" as "On Duty" | "Off Duty" | "Busy",
  },
  {
    id: "FR-112",
    name: "Michael Adebayo",
    location: "5 Admiralty Road, Lekki",
    resolved: 24,
    avgResponseTime: "6 Min",
    status: "Off Duty" as "On Duty" | "Off Duty" | "Busy",
  },
  // ... more responders
];

const MOCK_ADMIN = [
  {
    id: "ResQX-005",
    name: "Zainab Yusuf",
    location: "Abuja, FCT",
    role: "Operations Support",
    dateAdded: "2023-12-12",
    status: "Off Duty",
  },
  {
    id: "ResQX-002",
    name: "Chinedu Okeke",
    location: "Gwarinpa, Abuja",
    role: "IT Support",
    dateAdded: "2023-08-01",
    status: "Off Duty",
  },
  // ... more admin staff
] as AdminStaff[];

// CUSTOMER, PROFESSIONAL_TOW_TRUCK, PROFESSIONAL_FIRST_RESPONSDER

export default function StaffPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfessionals = async () => {
    try {
      const response = await axiosInstance.get("/admin/get_all_pros");
      setProfessionals(response.data.data.users); // Adjust if structure differs
    } catch (error) {
      console.error("Failed to fetch professionals:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfessionals();
  }, []);

  console.log("Professionals:", professionals);

  if (loading) {
    return (
      <div className="w-full text-center py-10">
        <svg
          className="animate-spin h-6 w-6 text-orange mx-auto mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
        <p className="text-sm text-gray-500">Fetching professionals...</p>
      </div>
    );
  }

  if (professionals.length === 0) {
    return (
      <div className="text-center text-gray-500">No professionals found.</div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Staff Management</h1>

      {/* <RespondersTable responders={MOCK_RESPONDERS} /> */}
      <AdminTable staff={professionals} />
      {/* <AdminTable staff={MOCK_ADMIN} /> */}

      <footer className="text-center text-sm text-gray-500">
        © 2025 ResQ-X. All Rights Reserved.
      </footer>
    </div>
  );
}

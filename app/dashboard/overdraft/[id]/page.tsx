"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axiosInstance from "@/lib/axios";

type Business = {
  id: string;
  name: string;
  company_name: string;
  company_address: string | null;
  tax_id: string | null;
  cac: string | null;
  email: string;
  company_email: string;
  country: string;
  phone: string;
  company_phone: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  role: string;
  super_account_id: string | null;
};

type Overdraft = {
  id: string;
  amount: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  business: Business;
  adminId: string;
  approvedById: string | null;
  approvedAt: string | null;
  created_at: string;
  updated_at: string;
};

type GetOverdraftsResponse = {
  data: Overdraft[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export default function OverdraftDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [overdraft, setOverdraft] = useState<Overdraft | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOverdraft = async () => {
      try {
        const response = await axiosInstance.get<GetOverdraftsResponse>(
          "/fleet-overdrafts/admin/overdrafts"
        );

        const foundOverdraft = response.data?.data?.find(
          (item) => item.id === params.id
        );

        if (foundOverdraft) {
          setOverdraft(foundOverdraft);
        } else {
          console.error("Overdraft not found");
        }
      } catch (error) {
        console.error("Error fetching overdraft:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) fetchOverdraft();
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-orange mx-auto mb-2"
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
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-sm text-gray-500">Loading overdraft details...</p>
        </div>
      </div>
    );
  }

  if (!overdraft) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-700">Overdraft not found</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-orange hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Overdraft Details</h1>
          <p className="text-sm text-gray-500 mt-1">
            View complete overdraft information
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overdraft Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Overdraft Information
          </h2>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500">Overdraft ID</span>
              <p className="font-medium text-sm break-all">{overdraft.id}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Amount</span>
              <p className="font-bold text-xl text-orange">
                ₦{parseFloat(overdraft.amount).toLocaleString()}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Reason</span>
              <p className="font-medium">{overdraft.reason}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Status</span>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    overdraft.status
                  )}`}
                >
                  {overdraft.status}
                </span>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Created At</span>
              <p className="font-medium">
                {new Date(overdraft.created_at).toLocaleString()}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Updated At</span>
              <p className="font-medium">
                {new Date(overdraft.updated_at).toLocaleString()}
              </p>
            </div>

            {overdraft.approvedAt && (
              <div>
                <span className="text-sm text-gray-500">Approved At</span>
                <p className="font-medium">
                  {new Date(overdraft.approvedAt).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Business Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Business Information
          </h2>
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500">Business ID</span>
              <p className="font-medium text-sm break-all">
                {overdraft.business.id}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Business Name</span>
              <p className="font-medium">{overdraft.business.name}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Company Name</span>
              <p className="font-medium">{overdraft.business.company_name}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Email</span>
              <p className="font-medium">{overdraft.business.email}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Company Email</span>
              <p className="font-medium">{overdraft.business.company_email}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Phone</span>
              <p className="font-medium">{overdraft.business.phone}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Company Phone</span>
              <p className="font-medium">{overdraft.business.company_phone}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Country</span>
              <p className="font-medium">{overdraft.business.country}</p>
            </div>

            {overdraft.business.company_address && (
              <div>
                <span className="text-sm text-gray-500">Company Address</span>
                <p className="font-medium">
                  {overdraft.business.company_address}
                </p>
              </div>
            )}

            {overdraft.business.tax_id && (
              <div>
                <span className="text-sm text-gray-500">Tax ID</span>
                <p className="font-medium">{overdraft.business.tax_id}</p>
              </div>
            )}

            {overdraft.business.cac && (
              <div>
                <span className="text-sm text-gray-500">CAC</span>
                <p className="font-medium">{overdraft.business.cac}</p>
              </div>
            )}

            <div>
              <span className="text-sm text-gray-500">Role</span>
              <p className="font-medium">{overdraft.business.role}</p>
            </div>

            <div>
              <span className="text-sm text-gray-500">Verified Status</span>
              <div className="mt-1">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    overdraft.business.is_verified
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {overdraft.business.is_verified ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>

            <div>
              <span className="text-sm text-gray-500">Business Created At</span>
              <p className="font-medium">
                {new Date(overdraft.business.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Admin & Approval Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Admin & Approval Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-gray-500">Admin ID</span>
              <p className="font-medium text-sm break-all">
                {overdraft.adminId}
              </p>
            </div>

            {overdraft.approvedById && (
              <div>
                <span className="text-sm text-gray-500">Approved By ID</span>
                <p className="font-medium text-sm break-all">
                  {overdraft.approvedById}
                </p>
              </div>
            )}

            {overdraft.approvedAt && (
              <div>
                <span className="text-sm text-gray-500">Approval Date</span>
                <p className="font-medium">
                  {new Date(overdraft.approvedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

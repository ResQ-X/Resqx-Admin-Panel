"use client";
import { useState, useEffect, use } from "react";
import axiosInstance from "@/lib/axios";
import { FleetView } from "@/components/fleet/fleet-details/FleetView";
// import { FleetEdit } from "@/components/fleet/fleet-details/FleetEdit";

type Wallet = {
  id: string;
  balance: string;
  businessId: string;
  created_at: string;
  updated_at: string;
};

type Asset = {
  id: string;
};

type Service = {
  id: string;
};

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
  password: string;
  transaction_pin: string | null;
  is_verified: boolean;
  fcmToken: string | null;
  refreshToken: string | null;
  created_at: string;
  updated_at: string;
  assets: Asset[];
  wallet: Wallet;
  notifications: any[];
  fuelServices: Service[];
  emergencyServices: Service[];
  maintenanceServices: Service[];
};

type GetBusinessResponse = {
  message: string;
  data: Business;
};

export default function FleetDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [business, setBusiness] = useState<Business | null>(null);
  // const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap the `params` object using `React.use()`
  const { id } = use(params);

  useEffect(() => {
    const fetchBusiness = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get<GetBusinessResponse>(
          `/fleets/admin/${id}`
        );
        setBusiness(response.data.data);
      } catch (error) {
        console.error("Error fetching business:", error);
        setError("Failed to load business details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBusiness();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-8">
        <div className="w-full text-center py-10">
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
          <p className="text-sm text-gray-500">Loading business details...</p>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-8">
        <div className="text-center py-10">
          <p className="text-red-500">{error || "Business not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl p-8">
      {/* {isEditing ? (
        <FleetEdit order={business} />
      ) : (
      )} */}
      <FleetView order={business} />
    </div>
  );
}

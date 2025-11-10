"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, use } from "react";
import axiosInstance from "@/lib/axios";

type Business = {
  id: string;
  name: string;
  company_name: string;
  company_email: string;
  company_phone: string;
  country: string;
};

type Asset = {
  id: string;
  asset_name: string;
  asset_type: string;
  asset_subtype: string;
  fuel_type: string;
  capacity: number;
  plate_number: string | null;
};

type EmergencyOrder = {
  id: string;
  status: string;
  date_time: string;
  emergency_type: string;
  note: string;
  location: string;
  location_longitude: string;
  location_latitude: string;
  to_location: string | null;
  to_location_longitude: string | null;
  to_location_latitude: string | null;
  created_at: string;
  updated_at: string;
  business: Business;
  assets: Asset[];
  order_date: string;
};

export default function EmergencyOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [order, setOrder] = useState<EmergencyOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmergencyOrder = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/fleets/admin/order/${id}`);
        setOrder(response?.data?.data?.order || response?.data?.data);
      } catch (err) {
        console.error("Error fetching emergency order:", err);
        setError("Failed to load emergency order details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEmergencyOrder();
    }
  }, [id]);

  if (isLoading)
    return <div className="p-6">Loading emergency order details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!order) return <div className="p-6">No emergency order found.</div>;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Emergency Order Details</h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-500">Order ID: {order.id}</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Status:</span>
            <span className="text-yellow-600">{order.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Emergency Type:</span>
            <span className="text-gray-800">{order.emergency_type}</span>
          </div>
        </div>
      </div>

      {/* Order Info */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Order Information</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Date & Time</label>
            <Input
              value={new Date(order.date_time).toLocaleString()}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2 col-span-3">
            <label className="text-sm text-gray-500">From Location</label>
            <Input
              value={order.location || "N/A"}
              disabled
              className="bg-white"
            />
          </div>
          {order.to_location && (
            <div className="space-y-2 col-span-3">
              <label className="text-sm text-gray-500">To Location</label>
              <Input value={order.to_location} disabled className="bg-white" />
            </div>
          )}
          <div className="space-y-2 col-span-3">
            <label className="text-sm text-gray-500">Note</label>
            <Input value={order.note || "N/A"} disabled className="bg-white" />
          </div>
        </div>
      </div>

      {/* Business Info */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Business Information</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Business Name</label>
            <Input
              value={order.business?.name || "N/A"}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Company Name</label>
            <Input
              value={order.business?.company_name || "N/A"}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Email</label>
            <Input
              value={order.business?.company_email || "N/A"}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Phone</label>
            <Input
              value={order.business?.company_phone || "N/A"}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Country</label>
            <Input
              value={order.business?.country || "N/A"}
              disabled
              className="bg-white"
            />
          </div>
        </div>
      </div>

      {/* Asset Info */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Asset Information</h2>
        {order.assets && order.assets.length > 0 ? (
          order.assets.map((asset) => (
            <div
              key={asset.id}
              className="border border-gray-200 rounded-lg p-4 grid grid-cols-3 gap-4"
            >
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Asset Name</label>
                <Input value={asset.asset_name} disabled className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Type</label>
                <Input value={asset.asset_type} disabled className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Subtype</label>
                <Input
                  value={asset.asset_subtype}
                  disabled
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Fuel Type</label>
                <Input value={asset.fuel_type} disabled className="bg-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Capacity</label>
                <Input
                  value={asset.capacity.toString()}
                  disabled
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Plate Number</label>
                <Input
                  value={asset.plate_number || "N/A"}
                  disabled
                  className="bg-white"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No assets linked to this order.</p>
        )}
      </div>
    </div>
  );
}

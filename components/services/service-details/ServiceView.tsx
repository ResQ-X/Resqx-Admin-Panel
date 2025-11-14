"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ServiceSuccessDialog } from "./ServiceSuccessDialog";
import { useState } from "react";
import axiosInstance from "@/lib/axios";

interface ServiceViewProps {
  service: any;
  onEdit: () => void;
}

export function ServiceView({ service, onEdit }: ServiceViewProps) {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [password, setPassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!password) {
      alert("Password is required to delete the service.");
      return;
    }

    setDeleting(true);
    try {
      await axiosInstance.delete(`/resq-service/details/${service.id}`, {
        data: { password },
      });

      setShowSuccess(true);
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the service. Please check your password.");
    } finally {
      setDeleting(false);
    }
  };

  const formatLabel = (key: string) =>
    key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .replace("Id", "ID");

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const filteredEntries = Object.entries(service).filter(
    ([key, value]) =>
      ![
        "id",
        "created_at",
        "updated_at",
        "name",
        "type",
        "service_price",
      ].includes(key) && typeof value !== "object"
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-semibold mb-4">Service Details</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-500">Service ID: {service?.id}</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {service?.market}
          </span>
        </div>

        <div className="space-y-4 mt-10">
          {/* Primary Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Service Name</label>
              <Input value={service?.name} disabled className="bg-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Type</label>
              <Input value={service?.type} disabled className="bg-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Service Price</label>
              <Input
                value={`₦${service?.service_price}`}
                disabled
                className="bg-white"
              />
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            {filteredEntries.map(([key, value]) => (
              <div key={key} className="space-y-2">
                <label className="text-sm text-gray-500">
                  {formatLabel(key)}
                </label>
                <Input
                  value={formatValue(value)}
                  disabled
                  className="bg-white"
                />
              </div>
            ))}

            <div className="space-y-2">
              <label className="text-sm text-gray-500">Created At</label>
              <Input
                value={new Date(service.created_at).toLocaleDateString()}
                disabled
                className="bg-white"
              />
            </div>
          </div>

          {showPasswordField && (
            <div className="space-y-2 mt-4">
              <label className="text-sm text-gray-500">Admin Password</label>
              <Input
                type="password"
                placeholder="Enter password to confirm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={onEdit} className="bg-orange hover:bg-orange/90">
          Edit Service
        </Button>

        {showPasswordField ? (
          <Button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {deleting ? "Deleting..." : "Confirm Delete"}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="border-orange text-orange hover:bg-orange/10"
            onClick={() => setShowPasswordField(true)}
          >
            Delete Service
          </Button>
        )}
      </div>

      <ServiceSuccessDialog open={showSuccess} onOpenChange={setShowSuccess} />
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ServiceSuccessDialog } from "./ServiceSuccessDialog";
import axiosInstance from "@/lib/axios";

interface ServiceEditProps {
  service: any;
}

export function ServiceEdit({ service: initialService }: ServiceEditProps) {
  const router = useRouter();
  const [service, setService] = useState(initialService);
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const formatLabel = (key: string) =>
    key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .replace("Id", "ID");

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const handleSave = async () => {
    if (!password) {
      alert("Admin password is required to save changes.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...service,
        password,
      };

      await axiosInstance.patch("/resq-service/edit", payload);
      setShowSuccess(true);

      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setService((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredEntries = Object.entries(service).filter(
    ([key, value]) =>
      !["id", "created_at", "updated_at", "name", "type"].includes(key) &&
      typeof value !== "object"
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
        <h1 className="text-2xl font-semibold mb-4">Edit Service Details</h1>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-gray-500">Service ID: {service?.id}</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {service?.market}
          </span>
        </div>

        {/* Basic Fields */}
        <div className="grid grid-cols-3 gap-4 mt-10">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Service Name</label>
            <Input value={service.name} disabled className="bg-gray-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Service Type</label>
            <Input value={service.type} disabled className="bg-gray-100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Market</label>
            <Input value={service.market} disabled className="bg-gray-100" />
          </div>
        </div>

        {/* Dynamic Editable Fields */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {filteredEntries.map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="text-sm text-gray-500">
                {formatLabel(key)}
              </label>
              <Input
                type={
                  key.includes("amount") ||
                  key.includes("price") ||
                  !isNaN(Number(value))
                    ? "number"
                    : "text"
                }
                value={formatValue(value)}
                onChange={(e) => handleChange(key, e.target.value)}
                className="bg-white"
              />
            </div>
          ))}

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Created At</label>
            <Input
              value={new Date(service.created_at).toLocaleDateString()}
              disabled
              className="bg-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500 font-semibold">
              Admin Password *
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Required to save changes"
              className="bg-white border-orange"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={handleSave}
          className="bg-orange hover:bg-orange/90"
          disabled={saving || !password}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>

        <Button
          variant="outline"
          className="border-orange text-orange hover:bg-orange/10"
          onClick={() => router.back()}
          disabled={saving}
        >
          Cancel
        </Button>
      </div>

      <ServiceSuccessDialog open={showSuccess} onOpenChange={setShowSuccess} />
    </div>
  );
}

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import axiosInstance from "@/lib/axios";

interface FleetEditProps {
  order: {
    id: string;
    status: string;
  };
}

export function FleetEdit({ order: initialOrder }: FleetEditProps) {
  const router = useRouter();
  const [order, setOrder] = useState(initialOrder);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      await axiosInstance.patch(`/fleets/admin/order/${order.id}/status`, {
        status: order.status,
      });

      setSuccess(true);
      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (err: any) {
      console.error("Error updating status:", err);
      setError("Failed to update order status.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <h1 className="text-2xl font-semibold">Edit Order Status</h1>

      <div className="max-w-md space-y-4">
        <label className="block text-sm text-gray-500 mb-1">
          Update Order Status
        </label>
        <Select
          defaultValue={order.status}
          onValueChange={(value) => setOrder({ ...order, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="COMPLETED">COMPLETED</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && (
        <p className="text-green-600 text-sm">Status updated successfully!</p>
      )}

      <div className="flex gap-4">
        <Button
          onClick={handleSave}
          className="bg-orange hover:bg-orange/90"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>

        <Button
          variant="outline"
          className="border-orange text-orange hover:bg-orange/10"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { useState, useEffect, use } from "react";
import axiosInstance from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";

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
  plate_number: string;
};

type FuelOrder = {
  id: string;
  status: string;
  date_time: string;
  fuel_type: string;
  service_time_type: string;
  quantity: number;
  note: string;
  location: string;
  location_longitude: string;
  location_latitude: string;
  created_at: string;
  updated_at: string;
  business: Business;
  assets: Asset[];
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [order, setOrder] = useState<FuelOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [isOverdraftModalOpen, setIsOverdraftModalOpen] = useState(false);
  const [overdraftAmount, setOverdraftAmount] = useState("");
  const [overdraftReason, setOverdraftReason] = useState("");
  const [isCreatingOverdraft, setIsCreatingOverdraft] = useState(false);

  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [isCreatingRefund, setIsCreatingRefund] = useState(false);

  useEffect(() => {
    const fetchFuelOrder = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/fleets/admin/order/${id}`);
        setOrder(response?.data?.data?.order);
      } catch (err) {
        console.error("Error fetching fuel order:", err);
        setError("Failed to load fuel order details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchFuelOrder();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!selectedStatus) return;

    try {
      setIsUpdating(true);
      await axiosInstance.patch(`/fleets/admin/order/${id}/status`, {
        status: selectedStatus,
      });
      toast.success("Order status updated successfully");
      setOrder((prev) => (prev ? { ...prev, status: selectedStatus } : prev));
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating order status:", err);
      toast.error(`${err}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCreateOverdraft = async () => {
    if (!overdraftAmount || !overdraftReason) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!order?.business?.id) {
      toast.error("Business information not available");
      return;
    }

    try {
      setIsCreatingOverdraft(true);
      await axiosInstance.post("/fleet-overdrafts/", {
        businessId: order.business.id,
        amount: parseFloat(overdraftAmount),
        reason: overdraftReason,
      });
      setIsCreatingOverdraft(false);
      toast.success("Overdraft created successfully");
      setIsOverdraftModalOpen(false);
      setOverdraftAmount("");
      setOverdraftReason("");
    } catch (err) {
      console.error("Error creating overdraft:", err);
      toast.error("Failed to create overdraft");
    } finally {
      setIsCreatingOverdraft(false);
    }
  };

  const handleCreateRefund = async () => {
    if (!refundAmount || !refundReason) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!order?.business?.id) {
      toast.error("Business information not available");
      return;
    }

    if (!order?.id) {
      toast.error("Order information not available");
      return;
    }

    try {
      setIsCreatingRefund(true);
      await axiosInstance.post("/fleet-overdrafts/refund/", {
        businessId: order.business.id,
        amount: parseFloat(refundAmount),
        reason: refundReason,
        orderId: order.id,
      });
      setIsCreatingRefund(false);
      toast.success("Refund created successfully");
      setIsRefundModalOpen(false);
      setRefundAmount("");
      setRefundReason("");
    } catch (err) {
      console.error("Error creating refund:", err);
      toast.error("Failed to create refund");
    } finally {
      setIsCreatingRefund(false);
    }
  };

  if (isLoading)
    return <div className="p-6">Loading fuel order details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!order) return <div className="p-6">No order details found.</div>;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Order Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Fuel Order Details</h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-500">Order ID: {order.id}</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Status:</span>
            <span className="text-yellow-600">{order.status}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Fuel Type:</span>
            <span className="text-gray-800">{order.fuel_type}</span>
          </div>
        </div>
      </div>

      {/* Order Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Order Information</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Quantity (Litres)</label>
            <Input
              value={order.quantity.toString()}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Service Time Type</label>
            <Input
              value={order.service_time_type}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Date & Time</label>
            <Input
              value={new Date(order.date_time).toLocaleString()}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2 col-span-3">
            <label className="text-sm text-gray-500">Location</label>
            <Input value={order.location} disabled className="bg-white" />
          </div>
          <div className="space-y-2 col-span-3">
            <label className="text-sm text-gray-500">Note</label>
            <Input value={order.note || "N/A"} disabled className="bg-white" />
          </div>
        </div>
      </div>

      {/* Business Information */}
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

      {/* Asset Information */}
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

      <div className="flex gap-8">
        {/* Edit Mode Section */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange hover:bg-orange/90"
        >
          Edit Order
        </Button>

        {/* OverDraft Mode Section */}
        <Button
          onClick={() => setIsOverdraftModalOpen(true)}
          className="bg-white text-orange border border-orange hover:bg-orange/10"
        >
          Create Overdraft
        </Button>

        {/* OverDraft Mode Section */}
        <Button
          onClick={() => setIsRefundModalOpen(true)}
          className="bg-orange hover:bg-orange/90"
        >
          Create Refund
        </Button>
      </div>

      {/* Edit Order Status Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Order Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Label htmlFor="status">Select New Status</Label>
            <Select onValueChange={setSelectedStatus} value={selectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleStatusUpdate}
              disabled={isUpdating || !selectedStatus}
              className="bg-orange hover:bg-orange/90"
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Overdraft Modal */}
      <Dialog
        open={isOverdraftModalOpen}
        onOpenChange={setIsOverdraftModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Overdraft</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={overdraftAmount}
                onChange={(e) => setOverdraftAmount(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Input
                id="reason"
                type="text"
                placeholder="Enter reason for overdraft"
                value={overdraftReason}
                onChange={(e) => setOverdraftReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsOverdraftModalOpen(false);
                setOverdraftAmount("");
                setOverdraftReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateOverdraft}
              disabled={
                isCreatingOverdraft || !overdraftAmount || !overdraftReason
              }
              className="bg-orange hover:bg-orange/90"
            >
              {isCreatingOverdraft ? "Creating..." : "Create Overdraft"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Refund Modal */}
      <Dialog open={isRefundModalOpen} onOpenChange={setIsRefundModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Refund</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Input
                id="reason"
                type="text"
                placeholder="Enter reason for overdraft"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRefundModalOpen(false);
                setRefundAmount("");
                setRefundReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateRefund}
              disabled={isCreatingRefund || !refundAmount || !refundReason}
              className="bg-orange hover:bg-orange/90"
            >
              {isCreatingRefund ? "Creating..." : "Create Refund"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

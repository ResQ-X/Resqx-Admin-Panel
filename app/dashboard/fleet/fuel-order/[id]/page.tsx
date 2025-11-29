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

  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logAmount, setLogAmount] = useState("");
  const [logReason, setLogReason] = useState("");
  const [isCreatingLog, setIsCreatingLog] = useState(false);

  const [isBulkLogModalOpen, setIsBulkLogModalOpen] = useState(false);
  const [bulkLogs, setBulkLogs] = useState<
    Array<{
      id: string;
      amount: string;
      notes: string;
      asset_id?: string;
    }>
  >([{ id: crypto.randomUUID(), amount: "", notes: "" }]);
  const [isCreatingBulkLogs, setIsCreatingBulkLogs] = useState(false);

  const addBulkLogEntry = () => {
    setBulkLogs([
      ...bulkLogs,
      { id: crypto.randomUUID(), amount: "", notes: "" },
    ]);
  };

  const removeBulkLogEntry = (id: string) => {
    if (bulkLogs.length > 1) {
      setBulkLogs(bulkLogs.filter((log) => log.id !== id));
    }
  };

  const updateBulkLogEntry = (id: string, field: string, value: string) => {
    setBulkLogs(
      bulkLogs.map((log) => (log.id === id ? { ...log, [field]: value } : log))
    );
  };

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

  const handleCreateLog = async () => {
    if (!logAmount || !logReason) {
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
      setIsCreatingLog(true);

      // Get the first asset if available
      const asset =
        order.assets && order.assets.length > 0 ? order.assets[0] : null;

      const payload = {
        order_id: order.id,
        asset_id: asset?.id || null,
        business_id: order.business.id,
        amount: parseFloat(logAmount),
        items: {
          fuel_type: order.fuel_type,
          litres: order.quantity,
        },
        metadata: {
          notes: logReason,
        },
        fulfilled_at: new Date().toISOString(),
        service_type: "fuel",
        status: order.status.toLowerCase(),
        location_name: order.location,
        latitude: parseFloat(order.location_latitude) || 0,
        longitude: parseFloat(order.location_longitude) || 0,
        fuel_volume: order.quantity,
        currency: "NGN",
        tags: ["admin-logged"],
      };

      await axiosInstance.post("/fleet-order-logging/", payload);

      toast.success("Log created successfully");
      setIsLogModalOpen(false);
      setLogAmount("");
      setLogReason("");
    } catch (err) {
      console.error("Error creating log:", err);
      toast.error("Failed to create log");
    } finally {
      setIsCreatingLog(false);
    }
  };

  const handleCreateBulkLogs = async () => {
    // Validate all entries
    const invalidEntries = bulkLogs.filter((log) => !log.amount || !log.notes);
    if (invalidEntries.length > 0) {
      toast.error("Please fill in amount and notes for all log entries");
      return;
    }

    if (!order?.business?.id || !order?.id) {
      toast.error("Order or business information not available");
      return;
    }

    try {
      setIsCreatingBulkLogs(true);

      // Build the payload for bulk creation
      const payload = bulkLogs.map((log) => {
        // Updated logic: check for asset_id and that it's not "none"
        const asset =
          log.asset_id && log.asset_id !== "none"
            ? order.assets?.find((a) => a.id === log.asset_id)
            : order.assets && order.assets.length > 0
            ? order.assets[0]
            : null;

        return {
          order_id: order.id,
          asset_id: asset?.id || null,
          business_id: order.business.id,
          amount: parseFloat(log.amount),
          items: {
            fuel_type: order.fuel_type,
            litres: order.quantity,
          },
          metadata: {
            notes: log.notes,
          },
          fulfilled_at: new Date().toISOString(),
          service_type: "fuel",
          status: order.status.toLowerCase(),
          location_name: order.location,
          latitude: parseFloat(order.location_latitude) || 0,
          longitude: parseFloat(order.location_longitude) || 0,
          fuel_volume: order.quantity,
          currency: "NGN",
          tags: ["admin-logged", "bulk-created"],
        };
      });

      await axiosInstance.post("/fleet-order-logging/bulk", { logs: payload });

      toast.success(`${bulkLogs.length} log(s) created successfully`);
      setIsBulkLogModalOpen(false);
      setBulkLogs([
        { id: crypto.randomUUID(), amount: "", notes: "" }, // Remove asset_id: ""
      ]);
    } catch (err) {
      console.error("Error creating bulk logs:", err);
      toast.error("Failed to create bulk logs");
    } finally {
      setIsCreatingBulkLogs(false);
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

        {/* Refund Mode Section */}
        <Button
          onClick={() => setIsRefundModalOpen(true)}
          className="bg-orange hover:bg-orange/90"
        >
          Create Refund
        </Button>

        {/* Logging Mode Section */}
        <Button
          onClick={() => setIsLogModalOpen(true)}
          className="bg-white text-orange border border-orange hover:bg-orange/10"
        >
          Create Log
        </Button>

        <Button
          onClick={() => setIsBulkLogModalOpen(true)}
          className="bg-orange hover:bg-orange/90"
        >
          Create Bulk Logs
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

      {/* Log Modal */}
      <Dialog open={isLogModalOpen} onOpenChange={setIsLogModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Log</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="log-amount">Amount</Label>
              <Input
                id="log-amount"
                type="number"
                placeholder="Enter amount"
                value={logAmount}
                onChange={(e) => setLogAmount(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="log-reason">Notes</Label>
              <Input
                id="log-reason"
                type="text"
                placeholder="Enter notes for log"
                value={logReason}
                onChange={(e) => setLogReason(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsLogModalOpen(false);
                setLogAmount("");
                setLogReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateLog}
              disabled={isCreatingLog || !logAmount || !logReason}
              className="bg-orange hover:bg-orange/90"
            >
              {isCreatingLog ? "Creating..." : "Create Log"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Log Modal */}
      <Dialog open={isBulkLogModalOpen} onOpenChange={setIsBulkLogModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Multiple Logs</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {bulkLogs.map((log, index) => (
              <div
                key={log.id}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">
                    Log Entry #{index + 1}
                  </h3>
                  {bulkLogs.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBulkLogEntry(log.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`amount-${log.id}`}>Amount *</Label>
                    <Input
                      id={`amount-${log.id}`}
                      type="number"
                      placeholder="Enter amount"
                      value={log.amount}
                      onChange={(e) =>
                        updateBulkLogEntry(log.id, "amount", e.target.value)
                      }
                      step="0.01"
                      min="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`asset-${log.id}`}>Asset (Optional)</Label>
                    <Select
                      value={log.asset_id || "none"} // Use "none" as fallback instead of empty string
                      onValueChange={(value) =>
                        updateBulkLogEntry(
                          log.id,
                          "asset_id",
                          value === "none" ? undefined : value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select asset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {order?.assets?.map((asset) => (
                          <SelectItem key={asset.id} value={asset.id}>
                            {asset.asset_name} (
                            {asset.plate_number || "No plate"})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`notes-${log.id}`}>Notes *</Label>
                  <Input
                    id={`notes-${log.id}`}
                    type="text"
                    placeholder="Enter notes for this log"
                    value={log.notes}
                    onChange={(e) =>
                      updateBulkLogEntry(log.id, "notes", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addBulkLogEntry}
              className="w-full"
            >
              + Add Another Log Entry
            </Button>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsBulkLogModalOpen(false);
                setBulkLogs([
                  {
                    id: crypto.randomUUID(),
                    amount: "",
                    notes: "",
                  },
                ]);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateBulkLogs}
              disabled={
                isCreatingBulkLogs ||
                bulkLogs.some((log) => !log.amount || !log.notes)
              }
              className="bg-orange hover:bg-orange/90"
            >
              {isCreatingBulkLogs
                ? "Creating..."
                : `Create ${bulkLogs.length} Log(s)`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

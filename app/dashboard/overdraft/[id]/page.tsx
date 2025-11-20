"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState, useEffect, use } from "react";
import axiosInstance from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";

type Business = {
  id: string;
  name: string;
  company_name: string;
  company_address: string | null;
  email: string;
  company_email: string;
  country: string;
  phone: string;
  company_phone: string;
  is_verified: boolean;
  created_at: string;
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

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [overdraft, setOverdraft] = useState<Overdraft | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchOverdraft = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/fleet-overdrafts/admin/overdrafts/${id}`
        );
        setOverdraft(response?.data?.data);
      } catch (err) {
        console.error("Error fetching overdraft:", err);
        setError("Failed to load overdraft details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchOverdraft();
  }, [id]);

  const handleApprove = async () => {
    try {
      setIsUpdating(true);
      await axiosInstance.patch(
        `/fleet-overdrafts/admin/overdrafts/${id}/approve`
      );
      toast.success("Overdraft approved successfully");
      setOverdraft((prev) =>
        prev
          ? {
              ...prev,
              status: "APPROVED",
              approvedAt: new Date().toISOString(),
            }
          : prev
      );
      setIsApproveModalOpen(false);
    } catch (err) {
      console.error("Error approving overdraft:", err);
      toast.error("Failed to approve overdraft");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async () => {
    try {
      setIsUpdating(true);
      await axiosInstance.patch(
        `/fleet-overdrafts/admin/overdrafts/${id}/reject`
      );
      toast.success("Overdraft rejected successfully");
      setOverdraft((prev) => (prev ? { ...prev, status: "REJECTED" } : prev));
      setIsRejectModalOpen(false);
    } catch (err) {
      console.error("Error rejecting overdraft:", err);
      toast.error("Failed to reject overdraft");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "text-[#00B69B] bg-[#00B69B]/10";
      case "PENDING":
        return "text-[#FCBE2D] bg-[#FCBE2D]/10";
      case "REJECTED":
        return "text-[#EF4444] bg-[#EF4444]/10";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-[#00B69B]";
      case "PENDING":
        return "bg-[#FCBE2D]";
      case "REJECTED":
        return "bg-[#EF4444]";
      default:
        return "bg-gray-400";
    }
  };

  if (isLoading) return <div className="p-6">Loading overdraft details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!overdraft) return <div className="p-6">No overdraft details found.</div>;

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Overdraft Header */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">Overdraft Details</h1>
        <div className="flex items-center gap-6">
          <span className="text-gray-500">
            Overdraft ID: {overdraft.id.split("-")[0]}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Status:</span>
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 gap-2 rounded-full text-xs font-medium",
                getStatusColor(overdraft.status)
              )}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  getStatusDotColor(overdraft.status)
                )}
              />
              {overdraft.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Amount:</span>
            <span className="text-gray-800 font-semibold">
              ₦{parseFloat(overdraft.amount).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Overdraft Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Overdraft Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Amount</Label>
            <Input
              value={`₦${parseFloat(overdraft.amount).toLocaleString()}`}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Created Date</Label>
            <Input
              value={new Date(overdraft.created_at).toLocaleString()}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label className="text-sm text-gray-500">Reason</Label>
            <Input value={overdraft.reason} disabled className="bg-white" />
          </div>
          {overdraft.approvedAt && (
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">Approved Date</Label>
              <Input
                value={new Date(overdraft.approvedAt).toLocaleString()}
                disabled
                className="bg-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* Business Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Business Information</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Business Name</Label>
            <Input
              value={overdraft.business?.name || "N/A"}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Company Name</Label>
            <Input
              value={overdraft.business?.company_name || "N/A"}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Email</Label>
            <Input
              value={
                overdraft.business?.company_email ||
                overdraft.business?.email ||
                "N/A"
              }
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Phone</Label>
            <Input
              value={
                overdraft.business?.company_phone ||
                overdraft.business?.phone ||
                "N/A"
              }
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Country</Label>
            <Input
              value={overdraft.business?.country || "N/A"}
              disabled
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Verification Status</Label>
            <Input
              value={
                overdraft.business?.is_verified ? "Verified" : "Not Verified"
              }
              disabled
              className="bg-white"
            />
          </div>
          {overdraft.business?.company_address && (
            <div className="space-y-2 col-span-3">
              <Label className="text-sm text-gray-500">Address</Label>
              <Input
                value={overdraft.business.company_address}
                disabled
                className="bg-white"
              />
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {overdraft.status === "PENDING" && (
        <div className="flex gap-4">
          <Button
            onClick={() => setIsApproveModalOpen(true)}
            className="bg-[#00B69B] hover:bg-[#00B69B]/90 text-white"
          >
            Approve Overdraft
          </Button>
          <Button
            onClick={() => setIsRejectModalOpen(true)}
            className="bg-white text-[#EF4444] border border-[#EF4444] hover:bg-[#EF4444]/10"
          >
            Reject Overdraft
          </Button>
        </div>
      )}

      {/* Approve Modal */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Overdraft</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this overdraft of ₦
              {parseFloat(overdraft.amount).toLocaleString()} for{" "}
              {overdraft.business?.company_name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsApproveModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isUpdating}
              className="bg-[#00B69B] hover:bg-[#00B69B]/90 text-white"
            >
              {isUpdating ? "Approving..." : "Approve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Overdraft</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this overdraft of ₦
              {parseFloat(overdraft.amount).toLocaleString()} for{" "}
              {overdraft.business?.company_name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReject}
              disabled={isUpdating}
              className="bg-[#EF4444] hover:bg-[#EF4444]/90 text-white"
            >
              {isUpdating ? "Rejecting..." : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { CreateServiceForm } from "./CreateServiceform";
import { CreateServiceLoading } from "./CreateServiceLoading";
import { CreateServiceSuccess } from "./CreateServiceSuccess";
import axiosInstance from "@/lib/axios";

type CreateServiceState = {
  step: "form" | "creating" | "success";
  progress: number;
};

export function CreateServiceDialog({
  open,
  onOpenChange,
  onServiceCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceCreated: () => void;
}) {
  const [state, setState] = useState<CreateServiceState>({
    step: "form",
    progress: 0,
  });

  const handleCreateService = async (data: any) => {
    try {
      setState({ step: "creating", progress: 0 });

      // Simulate progress
      const progressInterval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 200);

      await axiosInstance.post("/resq-service/create", data);

      clearInterval(progressInterval);
      setState({ step: "success", progress: 100 });
      onServiceCreated();
    } catch (error) {
      console.error("Failed to create service:", error);
      alert("Failed to create service. Please try again.");
      setState({ step: "form", progress: 0 });
    }
  };

  const handleClose = () => {
    setState({ step: "form", progress: 0 });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-[#FAF8F5] max-w-6xl">
        {state.step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">
                Create New Service
              </DialogTitle>
            </DialogHeader>
            <CreateServiceForm onSubmit={handleCreateService} />
          </>
        )}

        {state.step === "creating" && (
          <CreateServiceLoading progress={state.progress} />
        )}

        {state.step === "success" && (
          <CreateServiceSuccess onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}

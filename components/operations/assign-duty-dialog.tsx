"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Responder } from "@/types/operations"

interface AssignDutyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  responder: Responder | null
}

export function AssignDutyDialog({ open, onOpenChange, responder }: AssignDutyDialogProps) {
  const [step, setStep] = useState<"form" | "success">("form")

  if (!responder) return null

  const handleAssign = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStep("success")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>Assign Duty</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">ID:</span>
                <span className="col-span-2">{responder.id}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">Name:</span>
                <span className="col-span-2">{responder.name}</span>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="text-sm font-medium">Status:</span>
                <span className="col-span-2">{responder.status}</span>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Incident Details</h3>
                <div className="space-y-2">
                  <label className="text-sm">Assign Incident</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="towing">Towing</SelectItem>
                      <SelectItem value="fuel">Fuel Delivery</SelectItem>
                      <SelectItem value="tire">Tire Change</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm">Time Reported</label>
                    <Input value="12:15 PM" readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Priority Level</label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Responder Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm">Current Location</label>
                    <Input value={responder.location} readOnly />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">Estimated Time of Arrival</label>
                    <Input value="12:35 PM" readOnly />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button className="bg-orange hover:bg-orange/90" onClick={handleAssign}>
                Assign
              </Button>
            </div>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="h-8 w-8 text-white" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Assignment Successful!</h2>
              <p className="text-sm text-gray-500 max-w-sm">
                The responder has been successfully assigned to the incident. The status has been updated, and the
                incident will now appear in the Live Operations table and Dashboard.
              </p>
            </div>
            <Button className="bg-orange hover:bg-orange/90" onClick={() => onOpenChange(false)}>
              See Details
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}


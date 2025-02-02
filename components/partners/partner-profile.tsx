"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhotoUpload } from "@/components/staff/photo-upload" // Reusing from staff
import { SuccessDialog } from "@/components/staff/success-dialog" // Reusing from staff
import type { PartnerProfile } from "@/types/partners"

interface PartnerProfileProps {
  profile: PartnerProfile
  mode: "view" | "edit"
  onEdit?: () => void
  onDelete?: () => void
  onSave?: (profile: PartnerProfile) => void
}

export function PartnerProfile({ profile: initialProfile, mode, onEdit, onDelete, onSave }: PartnerProfileProps) {
  const router = useRouter()
  const [profile, setProfile] = useState(initialProfile)
  const [photo, setPhoto] = useState<string>()
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = async () => {
    if (onSave) {
      await onSave({ ...profile, photo })
      setShowSuccess(true)
    }
  }

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white rounded-xl p-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="flex items-center gap-6 mb-8">
          <PhotoUpload currentPhoto={photo} onPhotoChange={setPhoto} />
          <div>
            <h1 className="text-2xl font-semibold">{profile.name}</h1>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-gray-500">ID: {profile.id}</span>
              <span className="text-gray-500">Role: {profile.role}</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Email Address</label>
              <Input
                value={profile.emailAddress}
                disabled={mode === "view"}
                onChange={(e) => setProfile({ ...profile, emailAddress: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Contact Number</label>
              <Input
                value={profile.contactNumber}
                disabled={mode === "view"}
                onChange={(e) => setProfile({ ...profile, contactNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Address</label>
              <Input
                value={profile.address}
                disabled={mode === "view"}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Start Date</label>
              <Input
                value={profile.startDate}
                disabled={mode === "view"}
                onChange={(e) => setProfile({ ...profile, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">End Date</label>
              <Input
                value={profile.endDate}
                disabled={mode === "view"}
                onChange={(e) => setProfile({ ...profile, endDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Number of Vehicles</label>
              <Input
                type="number"
                value={profile.vehicles}
                disabled={mode === "view"}
                onChange={(e) => setProfile({ ...profile, vehicles: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Bank Name</label>
                <Input
                  value={profile.payment.bankName}
                  disabled={mode === "view"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      payment: { ...profile.payment, bankName: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Account Number</label>
                <Input
                  value={profile.payment.accountNumber}
                  disabled={mode === "view"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      payment: { ...profile.payment, accountNumber: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500">Frequency</label>
                <Input
                  value={profile.payment.frequency}
                  disabled={mode === "view"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      payment: { ...profile.payment, frequency: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Assigned Items</h2>
            <textarea
              className="w-full h-32 p-3 border rounded-lg resize-none disabled:bg-transparent disabled:border-none"
              value={profile.assignedItems.join("\n")}
              disabled={mode === "view"}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  assignedItems: e.target.value.split("\n"),
                })
              }
            />
          </div>

          <div className="flex justify-end gap-4">
            {mode === "view" ? (
              <>
                <Button className="bg-orange hover:bg-orange/90" onClick={onEdit}>
                  Edit Profile
                </Button>
                <Button variant="outline" className="border-orange text-orange hover:bg-orange/10" onClick={onDelete}>
                  Delete Profile
                </Button>
              </>
            ) : (
              <Button className="bg-orange hover:bg-orange/90" onClick={handleSave}>
                Save
              </Button>
            )}
          </div>
        </div>
      </div>

      <SuccessDialog open={showSuccess} onOpenChange={setShowSuccess} title="Profile updated successfully!" />
    </>
  )
}


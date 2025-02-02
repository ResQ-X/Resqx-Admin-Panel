import { Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { IncidentDetails } from "@/types/dashboard"

interface ResponderInfoProps {
  responder: IncidentDetails["responder"]
}

export function ResponderInfo({ responder }: ResponderInfoProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">First Responder Information</h2>
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Status:</span>
          <span className="text-yellow-600">{responder.status}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">Estimated Arrival Time:</span>
          <span>{responder.eta}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Assigned To</label>
          <Input value={`${responder.name} | ${responder.id}`} disabled className="bg-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Role</label>
          <Input value={responder.role} disabled className="bg-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Current Location</label>
          <Input value={responder.currentLocation} disabled className="bg-white" />
        </div>
      </div>
    </div>
  )
}


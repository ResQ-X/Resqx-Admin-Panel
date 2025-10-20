import Image from "next/image";
import { Input } from "@/components/ui/Input";
import type { IncidentDetails } from "@/types/dashboard";

interface LocationInfoProps {
  location: IncidentDetails["location"];
}

export function LocationInfo({ location }: LocationInfoProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Location Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Pick Up Location</label>
          <Input value={location.pickup} disabled className="bg-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Drop Off Location</label>
          <Input value={location.dropoff} disabled className="bg-white" />
        </div>
        <div className="relative h-[200px] rounded-lg overflow-hidden">
          <Image
            src="/map-placeholder.png"
            alt="Location Map"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

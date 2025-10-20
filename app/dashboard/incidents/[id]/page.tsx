"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CustomerInfo } from "@/components/dashboard/incident-details/customer-info";
import { LocationInfo } from "@/components/dashboard/incident-details/location-info";
import { ResponderInfo } from "@/components/dashboard/incident-details/responder-info";
import { ActivityLog } from "@/components/dashboard/incident-details/activity-log";
import { Button } from "@/components/ui/button";

const MOCK_INCIDENT_DETAILS = {
  id: "INC-00123",
  status: "In Progress",
  customer: {
    name: "Alex Johnson",
    contact: "08123456789",
    email: "alexjohnson@gmail.com",
  },
  location: {
    pickup: "12 Awolowo Way, Ikeja",
    dropoff: "5 Admiralty Road, Lekki",
    coordinates: {
      lat: 6.605874,
      lng: 3.349149,
    },
  },
  responder: {
    id: "FR-045",
    name: "Kunle Adebayo",
    role: "Tow Truck Responder",
    status: "On the way",
    eta: "7 Minutes",
    currentLocation: "21 Herbert Mac Street, Yaba",
  },
  activities: [
    {
      time: "12.01.2025 - 12:30 PM",
      activity: "Incident reported",
      note: "Customer: Alex Johnson",
    },
    {
      time: "12.01.2025 - 12:35 PM",
      activity: "Assigned to responder",
      note: "Admin: Amina Bello",
    },
    {
      time: "12.01.2025 - 12:40 PM",
      activity: "Acknowledged assignment",
      note: "Responder: Kunle Adebayo",
    },
    {
      time: "12.01.2025 - 12:50 PM",
      activity: "Arrived at location",
      note: "Responder: Kunle Adebayo",
    },
    {
      time: "12.01.2025 - 12:55 PM",
      activity: "Delay reported",
      note: "Reason: Heavy traffic",
    },
  ],
};

export default function IncidentDetailsPage() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl p-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Incident Details</h1>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-gray-500">
              Incident ID: {MOCK_INCIDENT_DETAILS.id}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Status:</span>
              <span className="text-yellow-600">
                {MOCK_INCIDENT_DETAILS.status}
              </span>
            </div>
          </div>
        </div>

        <CustomerInfo customer={MOCK_INCIDENT_DETAILS.customer} />
        <LocationInfo location={MOCK_INCIDENT_DETAILS.location} />
        <ResponderInfo responder={MOCK_INCIDENT_DETAILS.responder} />
        <ActivityLog activities={MOCK_INCIDENT_DETAILS.activities} />
      </div>
    </div>
  );
}

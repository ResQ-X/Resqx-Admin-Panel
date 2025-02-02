"use client"

import { useState } from "react"
import { OrderView } from "@/components/orders/order-details/order-view"
import { OrderEdit } from "@/components/orders/order-details/order-edit"

const MOCK_ORDER = {
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
    address: "12 Awolowo Way",
    city: "Ikeja",
    state: "Lagos",
    zip: "100001",
  },
  responder: {
    id: "FR-045",
    name: "Kunle Adebayo",
    role: "Tow Truck Responder",
    contact: "08098765432",
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
} as const

export default function OrderDetailsPage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl p-8">
      {isEditing ? (
        <OrderEdit order={{ ...MOCK_ORDER, activities: [...MOCK_ORDER.activities] }} />
      ) : (
        <OrderView order={MOCK_ORDER} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  )
}


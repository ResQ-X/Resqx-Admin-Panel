import { RespondersTable } from "@/components/staff/responders-table"
import { AdminTable } from "@/components/staff/admin-table"
import { AdminStaff } from "@/types/staff"

const MOCK_RESPONDERS = [
  {
    id: "FR-045",
    name: "Daniel Osei",
    location: "12 Awolowo Way, Ikeja",
    resolved: 35,
    avgResponseTime: "4 Min",
    status: "On Duty" as "On Duty" | "Off Duty" | "Busy",
  },
  {
    id: "FR-112",
    name: "Michael Adebayo",
    location: "5 Admiralty Road, Lekki",
    resolved: 24,
    avgResponseTime: "6 Min",
    status: "Off Duty" as "On Duty" | "Off Duty" | "Busy",
  },
  // ... more responders
]

const MOCK_ADMIN = [
  {
    id: "ResQX-005",
    name: "Zainab Yusuf",
    location: "Abuja, FCT",
    role: "Operations Support",
    dateAdded: "2023-12-12",
    status: "Off Duty",
  },
  {
    id: "ResQX-002",
    name: "Chinedu Okeke",
    location: "Gwarinpa, Abuja",
    role: "IT Support",
    dateAdded: "2023-08-01",
    status: "Off Duty",
  },
  // ... more admin staff
] as AdminStaff[]

export default function StaffPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Staff Management</h1>

      <RespondersTable responders={MOCK_RESPONDERS} />
      <AdminTable staff={MOCK_ADMIN} />

      <footer className="text-center text-sm text-gray-500">© 2025 ResQ-X. All Rights Reserved.</footer>
    </div>
  )
}


import { MetricsCards } from "@/components/partners/MetricsCards";
import { PartnersTable } from "@/components/partners/PartnersTable";

// Define the Partner type (should match your component's expectations)
type Partner = {
  id: string;
  name: string;
  location: string;
  vehicles: number;
  avgResponseTime: string;
  status: "On Duty" | "Off Duty" | "Busy"; // Include all possible status values
};

const MOCK_METRICS = {
  activePartners: {
    value: 25,
    change: "1.0%",
    timeframe: "from last month",
  },
  avgResponseTime: {
    value: "6 Min",
    change: "4.3%",
    timeframe: "from yesterday",
  },
  customerSatisfaction: {
    value: 4.5,
    change: "1.8%",
    timeframe: "from yesterday",
  },
  revenue: {
    value: "₦600,000",
    change: "1.8%",
    timeframe: "from last month",
  },
} as const;

// Type the mock partners array explicitly
const MOCK_PARTNERS: Partner[] = [
  {
    id: "PR-045",
    name: "Adebayo Tow Service",
    location: "12 Awolowo Way, Ikeja",
    vehicles: 5,
    avgResponseTime: "4 Min",
    status: "On Duty",
  },
  {
    id: "PR-112",
    name: "Ifeanyi Transport",
    location: "5 Admiralty Road, Lekki",
    vehicles: 12,
    avgResponseTime: "6 Min",
    status: "Off Duty",
  },
  {
    id: "PR-078",
    name: "Sani Logistics",
    location: "21 Herbert Mac Street, Yaba",
    vehicles: 6,
    avgResponseTime: "5 Min",
    status: "On Duty",
  },
  {
    id: "PR-079",
    name: "Chijioke Towing Co.",
    location: "Lekki Phase 1, Lagos",
    vehicles: 8,
    avgResponseTime: "5 Min",
    status: "On Duty",
  },
  {
    id: "PR-080",
    name: "Yakubu Motors",
    location: "21 Macauley Street, Yaba",
    vehicles: 21,
    avgResponseTime: "5 Min",
    status: "Off Duty",
  },
];

export default function PartnersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Partner Management</h1>

      <MetricsCards metrics={MOCK_METRICS} />
      <PartnersTable partners={MOCK_PARTNERS} />

      <footer className="text-center text-sm text-gray-500">
        © 2025 ResQ-X. All Rights Reserved.
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import { PartnerProfile } from "@/components/partners/PartnerProfile";
import type { PartnerProfile as PartnerProfileType } from "@/types/partners";

// Remove the 'as const' assertion and type the assignedItems array explicitly
const MOCK_PROFILE: PartnerProfileType = {
  id: "PR-045",
  name: "Adebayo Tow Service",
  role: "First Responder",
  emailAddress: "adebayo@gmail.com",
  contactNumber: "08123456789",
  address: "Ikeja, Lagos",
  startDate: "January 31, 2025",
  endDate: "Till Date",
  vehicles: 5,
  payment: {
    bankName: "Opay",
    accountNumber: "12345678901",
    frequency: "Monthly",
  },
  assignedItems: ["Enter List"],
};

export default function PartnerProfilePage() {
  const [mode, setMode] = useState<"view" | "edit">("view");

  const handleSave = async (profile: PartnerProfileType) => {
    console.log(profile);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMode("view");
  };

  return (
    <PartnerProfile
      profile={MOCK_PROFILE}
      mode={mode}
      onEdit={() => setMode("edit")}
      onSave={handleSave}
    />
  );
}

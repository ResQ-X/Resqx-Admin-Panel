"use client";
import React, { useState } from "react";
import { UsersTabs } from "@/components/users/users-tabs";
import { UsersTable } from "@/components/users/users-table";

export type Professional = {
  id: string;
  name: string;
  location: string;
  role?: string;
  dateAdded?: string;
  status: "On Duty" | "Off Duty" | "Busy";
  resolved?: number;
  avgResponseTime?: string;
};

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-8">
      <UsersTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <UsersTable activeTab={activeTab} />

      <footer className="text-center text-sm text-gray-500">
        © 2025 ResQ-X. All Rights Reserved.
      </footer>
    </div>
  );
}

"use client";
import React from "react";
import { FleetTable } from "@/components/fleet/FleetTable";
// import { MonthlyOverview } from "@/components/orders/monthly-overview"
// import { OrderTrend } from "@/components/orders/order-trend"

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <FleetTable />

      {/* <MonthlyOverview />
      <OrderTrend /> */}

      <footer className="text-center text-sm text-gray-500">
        © 2025 ResQ-X. All Rights Reserved.
      </footer>
    </div>
  );
}

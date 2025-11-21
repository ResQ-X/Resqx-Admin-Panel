"use client";
import React from "react";
import { OverDraftTable } from "@/components/overdraft/OverDraftTable";

export default function OverDraftPage() {
  return (
    <div className="space-y-8">
      <OverDraftTable />

      <footer className="text-center text-sm text-gray-500">
        © 2025 ResQ-X. All Rights Reserved.
      </footer>
    </div>
  );
}

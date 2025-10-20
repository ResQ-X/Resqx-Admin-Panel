"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/lib/utils";
import type { Partner } from "@/types/operations";

const statusStyles = {
  "On Duty": "text-green-600 bg-green-50",
  "Off Duty": "text-orange-600 bg-orange-50",
  Busy: "text-red-600 bg-red-50",
};

interface PartnersTableProps {
  partners: Partner[];
}

export function PartnersTable({ partners }: PartnersTableProps) {
  const [selectedTab, setSelectedTab] = useState("All");

  const filteredPartners =
    selectedTab === "All"
      ? partners
      : partners.filter((p) => p.status === selectedTab);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Partners</h2>
        <div className="flex gap-2">
          {["All", "Available", "Busy", "Off Duty"].map((tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? "default" : "outline"}
              className={cn(
                selectedTab === tab && "bg-orange hover:bg-orange/90"
              )}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Partner ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Vehicles</TableHead>
            <TableHead>Performance Metrics</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPartners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell>{partner.id}</TableCell>
              <TableCell>{partner.name}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    statusStyles[partner.status]
                  )}
                >
                  {partner.status}
                </span>
              </TableCell>
              <TableCell>{partner.vehicles}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <p>
                    Avg. Response Time:{" "}
                    {partner.performanceMetrics.avgResponseTime}
                  </p>
                  <p>
                    Incidents Resolved:{" "}
                    {partner.performanceMetrics.incidentsResolved}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Set On Duty</DropdownMenuItem>
                    <DropdownMenuItem>Set Off Duty</DropdownMenuItem>
                    <DropdownMenuItem>Set Busy</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdownMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/lib/utils";
import { AssignDutyDialog } from "./AssignDutyDialog";
import type { Responder } from "@/types/operations";

const statusStyles = {
  "On Duty": "text-green-600 bg-green-50",
  "Off Duty": "text-orange-600 bg-orange-50",
  Busy: "text-red-600 bg-red-50",
};

interface RespondersTableProps {
  responders: Responder[];
}

export function RespondersTable({ responders }: RespondersTableProps) {
  const [selectedTab, setSelectedTab] = useState("All");
  const [assignDutyResponder, setAssignDutyResponder] =
    useState<Responder | null>(null);

  const filteredResponders =
    selectedTab === "All"
      ? responders
      : responders.filter((r) => r.status === selectedTab);

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">First Responders</h2>
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
            <TableHead>Responder ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Performance Metrics</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredResponders.map((responder) => (
            <TableRow key={responder.id}>
              <TableCell>{responder.id}</TableCell>
              <TableCell>{responder.name}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    statusStyles[responder.status]
                  )}
                >
                  {responder.status}
                </span>
              </TableCell>
              <TableCell>{responder.location}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <p>
                    Avg. Response Time:{" "}
                    {responder.performanceMetrics.avgResponseTime}
                  </p>
                  <p>
                    Incidents Resolved:{" "}
                    {responder.performanceMetrics.incidentsResolved}
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
                    <DropdownMenuItem
                      onClick={() => setAssignDutyResponder(responder)}
                    >
                      Assign Duty
                    </DropdownMenuItem>
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

      <AssignDutyDialog
        open={!!assignDutyResponder}
        onOpenChange={() => setAssignDutyResponder(null)}
        responder={assignDutyResponder}
      />
    </div>
  );
}

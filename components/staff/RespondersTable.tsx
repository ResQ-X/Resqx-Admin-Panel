"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/lib/utils";
import type { Responder } from "@/types/staff";

const statusStyles = {
  "On Duty": "text-green-600 bg-green-50",
  "Off Duty": "text-orange-600 bg-orange-50",
  Busy: "text-red-600 bg-red-50",
};

interface RespondersTableProps {
  responders: Responder[];
}

export function RespondersTable({ responders }: RespondersTableProps) {
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6">First Responders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Resolved</TableHead>
            <TableHead>Avg Res. Time</TableHead>
            <TableHead>Current Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {responders.map((responder) => (
            <TableRow key={responder.id}>
              <TableCell>{responder.id}</TableCell>
              <TableCell>{responder.name}</TableCell>
              <TableCell>{responder.location}</TableCell>
              <TableCell>{responder.resolved}</TableCell>
              <TableCell>{responder.avgResponseTime}</TableCell>
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
              <TableCell>
                <Link href={`/dashboard/staff/responders/${responder.id}`}>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 flex gap-4">
        <Button className="bg-orange hover:bg-orange/90">View All</Button>
        <Button
          variant="outline"
          className="border-orange text-orange hover:bg-orange/10"
        >
          Update List
        </Button>
      </div>
    </div>
  );
}

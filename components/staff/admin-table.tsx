"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { AdminStaff } from "@/types/staff";

const statusStyles = {
  "On Duty": "text-green-600 bg-green-50",
  "Off Duty": "text-orange-600 bg-orange-50",
  Busy: "text-red-600 bg-red-50",
};

interface AdminTableProps {
  staff: AdminStaff[];
}

export function AdminTable({ staff }: AdminTableProps) {
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-6">Admin Staff</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date added</TableHead>
            <TableHead>Current Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff.map((member) => (
            <TableRow key={member.id}>
              <TableCell>{member.id}</TableCell>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.location}</TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.created_at}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    statusStyles[member.status]
                  )}
                >
                  {member.status}
                </span>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/staff/admin/${member.id}`}>
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

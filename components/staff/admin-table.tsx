"use client";
import { useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-white rounded-xl p-6">
      {/* <h2 className="text-lg font-semibold mb-6">Admin Staff</h2> */}

      <div className="w-2/5 relative mb-5">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-[#A89887]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-[#F2E7DA] rounded-[19px] bg-[#FAF8F5] outline-none"
          placeholder="Search Orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff ID</TableHead>
            <TableHead>Name</TableHead>
            {/* <TableHead>Location</TableHead> */}
            <TableHead>Role</TableHead>
            <TableHead>Date added</TableHead>
            <TableHead>Current Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {staff
            ?.filter((member) =>
              member.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.id}</TableCell>
                <TableCell>{member.name}</TableCell>
                {/* <TableCell>{member.location}</TableCell> */}
                <TableCell>{member.userType}</TableCell>
                <TableCell>
                  {new Date(member.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      statusStyles[member.status]
                    )}
                  >
                    {member.is_online ? "Online" : "Offline"}
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

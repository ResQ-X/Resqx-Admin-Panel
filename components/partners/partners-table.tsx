"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { Partner } from "@/types/partners"

const statusStyles = {
  "On Duty": "text-green-600 bg-green-50",
  "Off Duty": "text-orange-600 bg-orange-50",
  Busy: "text-red-600 bg-red-50",
}

interface PartnersTableProps {
  partners: Partner[]
}

export function PartnersTable({ partners }: PartnersTableProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Partner ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>No of Vehicles</TableHead>
            <TableHead>Avg Res. Time</TableHead>
            <TableHead>Current Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {partners.map((partner) => (
            <TableRow key={partner.id}>
              <TableCell>{partner.id}</TableCell>
              <TableCell>{partner.name}</TableCell>
              <TableCell>{partner.location}</TableCell>
              <TableCell>{partner.vehicles}</TableCell>
              <TableCell>{partner.avgResponseTime}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    statusStyles[partner.status],
                  )}
                >
                  {partner.status}
                </span>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/partners/${partner.id}`}>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 flex gap-4">
        <Button className="bg-orange hover:bg-orange/90">View All</Button>
        <Button variant="outline" className="border-orange text-orange hover:bg-orange/10">
          Update List
        </Button>
      </div>
    </div>
  )
}


"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { MOCK_INCIDENTS } from "@/lib/constants"

const statusStyles = {
  "In Progress": "bg-[#fcbe2d]",
  Canceled: "bg-[#f00]",
  Resolved: "bg-[#00B69B]",
  Unassigned: "bg-[#535353] bg-opacity-30",
}

export function IncidentsTable() {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[24px] pb-2 font-semibold">Live Incident Summary</h2>
          <div className="flex gap-1 items-center">
            <div className="h-[5px] w-[5px] rounded-full bg-blue-600" />
            <p className="text-sm text-dark-brown">January 12th</p>
          </div>
        </div>
      </div>

      <Table className="rounded-3xl">
        <TableHeader className="w-full max-w-[1074px] mx-auto rounded-3xl bg-[#979797] bg-opacity-20">
          <TableRow className="rounded-3xl">
            <TableHead>Incident ID</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date - Time</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Responder ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_INCIDENTS.map((incident) => (
            <TableRow className="" key={incident.id}>
              <TableCell>
                <Link href={`/dashboard/incidents/${incident.id}`} className="hover:text-orange">
                  {incident.id}
                </Link>
              </TableCell>
              <TableCell>{incident.location}</TableCell>
              <TableCell>{incident.dateTime}</TableCell>
              <TableCell>{incident.priority}</TableCell>
              <TableCell>{incident.responderId}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 gap-3 rounded-full text-xs font-medium")}
                >
                  <div className={`w-[12px] h-[12px] rounded-full ${statusStyles[incident.status]}`} />
                  {incident.status}
                </span>
              </TableCell>
              <TableCell>
                <Link href={`/dashboard/incidents/${incident.id}`}>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-6 w-full flex items-center justify-center">
        <Button className="w-full text-[14px] rounded-[14px] font-medium max-w-[168px] mx-auto bg-orange hover:bg-orange/90">View All</Button>
      </div>
    </div>
  )
}


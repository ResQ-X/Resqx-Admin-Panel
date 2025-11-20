"use client";
import { useState, useEffect, useMemo } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/lib/utils";

type Business = {
  id: string;
  name: string;
  company_name: string;
  company_address: string | null;
  email: string;
  company_email: string;
  country: string;
  phone: string;
  company_phone: string;
  is_verified: boolean;
  created_at: string;
};

type Overdraft = {
  id: string;
  amount: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  business: Business;
  adminId: string;
  approvedById: string | null;
  approvedAt: string | null;
  created_at: string;
  updated_at: string;
};

type GetOverdraftsResponse = {
  data: Overdraft[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export function OverDraftTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [overdrafts, setOverdrafts] = useState<Overdraft[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOverdrafts = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<GetOverdraftsResponse>(
          "/fleet-overdrafts/admin/overdrafts"
        );
        setOverdrafts(response.data?.data ?? []);
      } catch (error) {
        console.error("Error fetching overdrafts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverdrafts();
  }, []);

  const shortenId = (id: string) => `ovd-${id.split("-")[0]?.slice(0, 5)}`;

  const filteredOverdrafts = useMemo(() => {
    if (!searchTerm.trim()) return overdrafts;
    const q = searchTerm.toLowerCase();
    return overdrafts.filter((o) => {
      const businessName = o.business?.name?.toLowerCase() ?? "";
      const companyName = o.business?.company_name?.toLowerCase() ?? "";
      const email = o.business?.email?.toLowerCase() ?? "";
      const reason = o.reason?.toLowerCase() ?? "";
      const amount = o.amount?.toLowerCase() ?? "";
      const status = o.status?.toLowerCase() ?? "";
      const short = shortenId(o.id).toLowerCase();
      return (
        businessName.includes(q) ||
        companyName.includes(q) ||
        email.includes(q) ||
        reason.includes(q) ||
        amount.includes(q) ||
        status.includes(q) ||
        short.includes(q)
      );
    });
  }, [overdrafts, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-[#00B69B]";
      case "PENDING":
        return "bg-[#FCBE2D]";
      case "REJECTED":
        return "bg-[#EF4444]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div>
      {/* Search */}
      <div className="max-w-md mb-4">
        <div className="relative">
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
            id="overdraft-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-[#F2E7DA] rounded-[19px] bg-[#FAF8F5] outline-none"
            placeholder="Search by business, amount, reason, or status"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6">
        {isLoading ? (
          <div className="w-full text-center py-10">
            <svg
              className="animate-spin h-6 w-6 text-orange mx-auto mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="text-sm text-gray-500">Fetching overdrafts...</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="w-full max-w-[1074px] mx-auto rounded-3xl bg-[#979797] bg-opacity-20">
              <TableRow>
                <TableHead>Overdraft ID</TableHead>
                <TableHead>Business Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOverdrafts.map((overdraft) => (
                <TableRow key={overdraft.id}>
                  <TableCell>
                    <span className="hover:text-orange">
                      {shortenId(overdraft.id)}
                    </span>
                  </TableCell>

                  <TableCell>
                    {overdraft.business?.company_name ||
                      overdraft.business?.name ||
                      "—"}
                  </TableCell>

                  <TableCell>
                    ₦{parseFloat(overdraft.amount).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <span
                      className="max-w-[200px] truncate inline-block"
                      title={overdraft.reason}
                    >
                      {overdraft.reason}
                    </span>
                  </TableCell>

                  <TableCell>
                    {overdraft.created_at
                      ? new Date(overdraft.created_at).toLocaleDateString()
                      : "—"}
                  </TableCell>

                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 gap-3 rounded-full text-xs font-medium"
                      )}
                    >
                      <div
                        className={cn(
                          "w-[12px] h-[12px] rounded-full",
                          getStatusColor(overdraft.status)
                        )}
                      />
                      {overdraft.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Link href={`/dashboard/overdraft/${overdraft.id}`}>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}

              {!filteredOverdrafts.length && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-sm text-gray-500"
                  >
                    {searchTerm
                      ? `No overdrafts match "${searchTerm}".`
                      : "No overdrafts found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

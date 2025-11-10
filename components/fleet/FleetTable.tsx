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
  phone: string;
  is_verified: boolean;
  created_at: string;
};

type GetBusinessesResponse = {
  success?: boolean;
  message: string;
  data: Business[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};

export function FleetTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBusinesses = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get<GetBusinessesResponse>(
          "/fleets/admin/list"
        );
        setBusinesses(response.data?.data ?? []);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const shortenId = (id: string) => `bus-${id.split("-")[0]?.slice(0, 5)}`;

  const filteredBusinesses = useMemo(() => {
    if (!searchTerm.trim()) return businesses;
    const q = searchTerm.toLowerCase();
    return businesses.filter((b) => {
      const name = b.name?.toLowerCase() ?? "";
      const companyName = b.company_name?.toLowerCase() ?? "";
      const email = b.email?.toLowerCase() ?? "";
      const phone = b.phone?.toLowerCase() ?? "";
      const addr = b.company_address?.toLowerCase() ?? "";
      const short = shortenId(b.id).toLowerCase();
      return (
        name.includes(q) ||
        companyName.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        addr.includes(q) ||
        short.includes(q)
      );
    });
  }, [businesses, searchTerm]);

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
            id="business-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-[#F2E7DA] rounded-[19px] bg-[#FAF8F5] outline-none"
            placeholder="Search by name, email, phone, or business id"
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
            <p className="text-sm text-gray-500">Fetching businesses...</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="w-full max-w-[1074px] mx-auto rounded-3xl bg-[#979797] bg-opacity-20">
              <TableRow>
                <TableHead>Business ID</TableHead>
                <TableHead>Company Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBusinesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell>
                    <Link
                      href={`/dashboard/fleet/${business.id}`}
                      className="hover:text-orange"
                    >
                      {shortenId(business.id)}
                    </Link>
                  </TableCell>

                  <TableCell>
                    {business.company_name || business.name}
                  </TableCell>

                  <TableCell>{business.email}</TableCell>

                  <TableCell>{business.phone}</TableCell>

                  <TableCell>
                    {business.created_at
                      ? new Date(business.created_at).toLocaleDateString()
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
                          business.is_verified ? "bg-[#00B69B]" : "bg-[#FCBE2D]"
                        )}
                      />
                      {business.is_verified ? "VERIFIED" : "PENDING"}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Link href={`/dashboard/fleet/${business.id}`}>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}

              {!filteredBusinesses.length && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-8 text-sm text-gray-500"
                  >
                    {searchTerm
                      ? `No businesses match "${searchTerm}".`
                      : "No businesses found."}
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

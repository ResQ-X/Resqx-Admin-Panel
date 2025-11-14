"use client";
import { useState, useEffect } from "react";
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
import { CreateServiceDialog } from "./dialogs/CreateServiceDialog";
import { Truck, Fuel, Key, Battery, Heart } from "lucide-react";
import axiosInstance from "@/lib/axios";
import Link from "next/link";

const icons = {
  Towing: Truck,
  "Fuel Delivery": Fuel,
  "Out of Fuel": Fuel,
  "Key Replacement": Key,
  Battery: Battery,
  "Jump Start": Battery,
  "Health Check": Heart,
  "Flat Tires": Truck,
  "Flat Tyre": Truck,
};

type Service = {
  id: string;
  type: string;
  market: string;
  name: string;
  tow_hook_chain_amount?: string;
  tow_flat_amount?: string;
  tyre_change_amount?: string;
  tyre_repair_amount?: string;
  battery_boost_amount?: string;
  battery_swap_amount?: string;
  pms_amount?: string;
  diesel_amount?: string;
  delivery_price: string;
  service_price: string;
  created_at: string;
  updated_at: string;
};

type ServicesData = {
  B2C: Service[];
  B2B: Service[];
};

export function ServicesTable() {
  const [createServiceDialogOpen, setCreateServiceDialogOpen] = useState(false);
  const [servicesData, setServicesData] = useState<ServicesData>({
    B2C: [],
    B2B: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/resq-service/get");
      setServicesData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const renderServicesTable = (services: Service[], marketType: string) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        {marketType} Services
      </h3>
      <Table>
        <TableHeader className="bg-gray-50 rounded-lg">
          <TableRow>
            <TableHead>Service Name</TableHead>
            <TableHead>Delivery Price</TableHead>
            <TableHead>Service Price</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No services found.
              </TableCell>
            </TableRow>
          ) : (
            services.map((service) => {
              const Icon = icons[service.name as keyof typeof icons] || Truck;

              return (
                <TableRow key={service.id}>
                  <TableCell className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-gray-500" />
                    {service.name}
                  </TableCell>
                  <TableCell>₦{service.delivery_price}</TableCell>
                  <TableCell>₦{service.service_price}</TableCell>
                  <TableCell>
                    {new Date(service.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/services/${service.id}`}>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-[24px] font-semibold">Services List</h2>
          <p className="text-sm text-gray-500">Manage your service offerings</p>
        </div>
      </div>

      {loading ? (
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <p className="text-sm text-gray-500">Fetching services...</p>
        </div>
      ) : (
        <>
          {renderServicesTable(servicesData.B2C, "B2C")}
          {renderServicesTable(servicesData.B2B, "B2B")}
        </>
      )}

      <div className="mt-6 w-full flex items-center justify-center">
        <Button
          onClick={() => setCreateServiceDialogOpen(true)}
          className="bg-orange hover:bg-orange/90"
        >
          Add New Service
        </Button>
      </div>

      <CreateServiceDialog
        open={createServiceDialogOpen}
        onOpenChange={setCreateServiceDialogOpen}
        onServiceCreated={fetchServices}
      />
    </div>
  );
}

import { Input } from "@/components/ui/Input";
import type { IncidentDetails } from "@/types/dashboard";

interface CustomerInfoProps {
  customer: IncidentDetails["customer"];
}

export function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Customer Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Customer Name</label>
          <Input value={customer.name} disabled className="bg-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Contact Number</label>
          <Input value={customer.contact} disabled className="bg-white" />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Email Address</label>
          <Input value={customer.email} disabled className="bg-white" />
        </div>
      </div>
    </div>
  );
}

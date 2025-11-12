"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface FleetViewProps {
  order: any;
}

export function FleetView({ order }: FleetViewProps) {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Business & Company Info */}
      <BusinessInfoSection order={order} />

      {/* Account Info */}
      <AccountInfoSection order={order} />

      {/* Wallet Info */}
      {order?.wallet && <WalletInfoSection wallet={order.wallet} />}

      {/* Assets */}
      {order?.assets?.length > 0 && <AssetsSection assets={order.assets} />}

      {/* Notifications */}
      {order?.notifications?.length > 0 && (
        <NotificationsSection notifications={order.notifications} />
      )}

      {/* Fuel Services */}
      {order?.fuelServices?.length > 0 && (
        <FuelServicesSection fuelServices={order.fuelServices} />
      )}

      {/* Maintenance Services */}
      {order?.maintenanceServices?.length > 0 && (
        <MaintenanceServicesSection
          maintenanceServices={order.maintenanceServices}
        />
      )}

      {/* Emergency Services */}
      {order?.emergencyServices?.length > 0 && (
        <EmergencyServicesSection emergencyServices={order.emergencyServices} />
      )}

      {/* Activity Log */}
      <ActivityLogSection order={order} />

      {/* Action Buttons */}
      {/* <div className="flex justify-center gap-4">
        <Button onClick={onEdit} className="bg-orange hover:bg-orange/90">
          Edit Business
        </Button>
        <Button
          variant="outline"
          className="border-orange text-orange hover:bg-orange/10"
        >
          Cancel Business
        </Button>
      </div> */}
    </div>
  );
}

/* -------------------- Sections -------------------- */

function BusinessInfoSection({ order }: { order: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Business & Company Info</h2>
      <div className="grid grid-cols-3 gap-4">
        <InfoField label="Business ID" value={order.id} />
        <InfoField label="Business Name" value={order.name} />
        <InfoField label="Company Name" value={order.company_name} />
        <InfoField label="Company Email" value={order.company_email} />
        <InfoField label="Company Phone" value={order.company_phone} />
        <InfoField label="Company Address" value={order.company_address} />
        <InfoField label="Country" value={order.country} />
        <InfoField label="Tax ID" value={order.tax_id} />
        <InfoField label="CAC Number" value={order.cac} />
        <InfoField label="Role" value={order.role} />
        <InfoField label="Verified" value={order.is_verified ? "Yes" : "No"} />
      </div>
    </div>
  );
}

function AccountInfoSection({ order }: { order: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Account Information</h2>
      <div className="grid grid-cols-3 gap-4">
        <InfoField label="Name" value={order.name} />
        <InfoField label="Email" value={order.email} />
        <InfoField label="Phone" value={order.phone} />
        <InfoField label="Super Account ID" value={order.super_account_id} />
      </div>
    </div>
  );
}

function WalletInfoSection({ wallet }: { wallet: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Wallet Information</h2>
      <div className="grid grid-cols-3 gap-4">
        <InfoField label="Wallet ID" value={wallet.id} />
        <InfoField
          label="Balance"
          value={`₦${Number(wallet.balance).toLocaleString()}`}
        />
        <InfoField
          label="Created At"
          value={new Date(wallet.created_at).toLocaleString()}
        />
        <InfoField
          label="Updated At"
          value={new Date(wallet.updated_at).toLocaleString()}
        />
      </div>
    </div>
  );
}

function ActivityLogSection({ order }: { order: any }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Activity Log</h2>
      <div className="rounded-lg">
        <table className="w-full">
          <thead className="bg-[#FAF8F5] rounded-xl">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-gray-500">
                Time
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">
                Activity
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-500">
                Performed By
              </th>
            </tr>
          </thead>
          <tbody className="border-b">
            <tr className="border-b last:border-0">
              <td className="p-4 text-sm">
                {new Date(order.created_at).toLocaleString()}
              </td>
              <td className="p-4 text-sm">Business Created</td>
              <td className="p-4 text-sm">System</td>
            </tr>
            <tr className="border-b last:border-0">
              <td className="p-4 text-sm">
                {new Date(order.updated_at).toLocaleString()}
              </td>
              <td className="p-4 text-sm">Last Updated</td>
              <td className="p-4 text-sm">System</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------- Array Sections with See More -------------------- */

function AssetsSection({ assets }: { assets: any[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Assets</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#FAF8F5]">
            <tr>
              <th className="text-left p-2 text-sm font-medium">Name</th>
              <th className="text-left p-2 text-sm font-medium">Type</th>
              <th className="text-left p-2 text-sm font-medium">Subtype</th>
              <th className="text-left p-2 text-sm font-medium">Fuel Type</th>
              <th className="text-left p-2 text-sm font-medium">Capacity</th>
              <th className="text-left p-2 text-sm font-medium">
                Plate Number
              </th>
              <th className="text-left p-2 text-sm font-medium">Created At</th>
              <th className="text-left p-2 text-sm font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="border-b last:border-0">
                <td className="p-2 text-sm">{asset.asset_name}</td>
                <td className="p-2 text-sm">{asset.asset_type}</td>
                <td className="p-2 text-sm">{asset.asset_subtype}</td>
                <td className="p-2 text-sm">{asset.fuel_type}</td>
                <td className="p-2 text-sm">{asset.capacity}</td>
                <td className="p-2 text-sm">{asset.plate_number || "N/A"}</td>
                <td className="p-2 text-sm">
                  {new Date(asset.created_at).toLocaleString()}
                </td>
                <td className="p-2 text-sm">
                  <Link href={`/dashboard/fleet/asset-details/${asset.id}`}>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NotificationsSection({ notifications }: { notifications: any[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Notifications</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#FAF8F5]">
            <tr>
              <th className="text-left p-2 text-sm font-medium">Message</th>
              <th className="text-left p-2 text-sm font-medium">Created At</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n, idx) => (
              <tr key={idx} className="border-b last:border-0">
                <td className="p-2 text-sm">{n.message || "N/A"}</td>
                <td className="p-2 text-sm">
                  {n.created_at
                    ? new Date(n.created_at).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FuelServicesSection({ fuelServices }: { fuelServices: any[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Fuel Services</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#FAF8F5]">
            <tr>
              <th className="text-left p-2 text-sm font-medium">Fuel Type</th>
              <th className="text-left p-2 text-sm font-medium">Quantity</th>
              <th className="text-left p-2 text-sm font-medium">Status</th>
              {/* <th className="text-left p-2 text-sm font-medium">
                Service Time
              </th> */}
              <th className="text-left p-2 text-sm font-medium">Location</th>
              <th className="text-left p-2 text-sm font-medium">Note</th>
              <th className="text-left p-2 text-sm font-medium">Created At</th>
              <th className="text-left p-2 text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {fuelServices.map((f) => (
              <tr key={f.id} className="border-b last:border-0">
                <td className="p-2 text-sm">{f.fuel_type}</td>
                <td className="p-2 text-sm">{f.quantity}</td>
                <td className="p-2 text-sm">{f.status}</td>
                {/* <td className="p-2 text-sm">{f.service_time_type}</td> */}
                <td className="p-2 text-sm">{f.location}</td>
                <td className="p-2 text-sm">{f.note}</td>
                <td className="p-2 text-sm">
                  {new Date(f.created_at).toLocaleString()}
                </td>
                <td className="p-2 text-sm">
                  <Link href={`/dashboard/fleet/fuel-order/${f.id}`}>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MaintenanceServicesSection({
  maintenanceServices,
}: {
  maintenanceServices: any[];
}) {
  const router = useRouter();

  console.log("Router:", router);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Maintenance Services</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#FAF8F5]">
            <tr>
              <th className="text-left p-2 text-sm font-medium">Type</th>
              <th className="text-left p-2 text-sm font-medium">Status</th>
              <th className="text-left p-2 text-sm font-medium">Location</th>
              <th className="text-left p-2 text-sm font-medium">Note</th>
              <th className="text-left p-2 text-sm font-medium">Created At</th>
              <th className="text-left p-2 text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceServices.map((m) => (
              <tr key={m.id} className="border-b last:border-0">
                <td className="p-2 text-sm">{m.maintenance_type}</td>
                <td className="p-2 text-sm">{m.status}</td>
                <td className="p-2 text-sm">{m.location}</td>
                <td className="p-2 text-sm">{m.note}</td>
                <td className="p-2 text-sm">
                  {new Date(m.created_at).toLocaleString()}
                </td>
                <td className="p-2 text-sm">
                  <Link href={`/dashboard/fleet/maint-order/${m.id}`}>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmergencyServicesSection({
  emergencyServices,
}: {
  emergencyServices: any[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Emergency Services</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#FAF8F5]">
            <tr>
              <th className="text-left p-2 text-sm font-medium">Type</th>
              <th className="text-left p-2 text-sm font-medium">Status</th>
              <th className="text-left p-2 text-sm font-medium">Location</th>
              <th className="text-left p-2 text-sm font-medium">Note</th>
              <th className="text-left p-2 text-sm font-medium">Created At</th>
              <th className="text-left p-2 text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {emergencyServices.map((e) => (
              <tr key={e.id} className="border-b last:border-0">
                <td className="p-2 text-sm">{e.emergency_type}</td>
                <td className="p-2 text-sm">{e.status}</td>
                <td className="p-2 text-sm">{e.location}</td>
                <td className="p-2 text-sm">{e.note}</td>
                <td className="p-2 text-sm">
                  {new Date(e.created_at).toLocaleString()}
                </td>
                <td className="p-2 text-sm">
                  <Link href={`/dashboard/fleet/emer-order/${e.id}`}>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------- Helper -------------------- */
function InfoField({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-500">{label}</label>
      <Input value={value || "N/A"} disabled className="bg-white" />
    </div>
  );
}

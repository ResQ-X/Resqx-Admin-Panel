"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UsersDetails({ user }: any) {
  const router = useRouter();

  console.log("user:", user);

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      <h1 className="text-2xl font-semibold mb-4">User Details</h1>

      <div className="grid grid-cols-3 gap-6">
        <InputField label="Name" value={user?.name} />
        <InputField label="Email" value={user?.email} />
        <InputField label="Phone" value={user?.phone} />
        <InputField label="Country" value={user?.country} />
        <InputField
          label="Status"
          value={user?.is_online ? "Online" : "Offline"}
        />
        <InputField label="Type" value={user?.userType} />
        <InputField
          label="Coordinates"
          value={`Lat: ${user?.latitude}, Lng: ${user?.longitude}`}
        />
        <InputField
          label="Created At"
          value={new Date(user?.created_at).toLocaleString()}
        />
        <InputField
          label="Updated At"
          value={new Date(user?.updated_at).toLocaleString()}
        />
      </div>

      {/* Vehicle Details */}
      {user?.vehicle_details?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">Vehicle Details</h2>
          {user?.vehicle_details?.map((vehicle: any) => (
            <div key={vehicle?.id} className="grid grid-cols-3 gap-6 mb-4">
              <InputField label="Plate Number" value={vehicle?.plate_number} />
              <InputField label="Vehicle Type" value={vehicle?.vehicle_type} />
              <InputField label="VIN" value={vehicle?.vehicle_vin} />
              <div className="col-span-3">
                <label className="text-sm text-gray-500">Vehicle Image</label>
                <Image
                  width={192}
                  height={128}
                  src={vehicle?.vehicle_image}
                  alt="Vehicle"
                  className="w-48 h-32 rounded object-cover mt-2"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pro Details */}
      {user?.pro_details && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">Identification</h2>
          <div className="grid grid-cols-3 gap-6">
            <InputField label="Role" value={user?.pro_details.pro_role} />
            <InputField
              label="ID Type"
              value={user?.pro_details?.identification_type}
            />
            <div>
              <label className="text-sm text-gray-500">ID Front</label>
              <Image
                width={192}
                height={128}
                src={user?.pro_details?.identification_front}
                alt="ID Front"
                className="w-48 h-32 rounded object-cover mt-2"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">ID Back</label>
              <Image
                width={192}
                height={128}
                src={user?.pro_details?.identification_back}
                alt="ID Back"
                className="w-48 h-32 rounded object-cover mt-2"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bank Details */}
      {user?.user_account && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">Bank Details</h2>
          <div className="grid grid-cols-3 gap-6">
            <InputField
              label="Bank Name"
              value={user?.user_account?.bank_name}
            />
            <InputField
              label="Account Number"
              value={user?.user_account?.bank_account}
            />
            <InputField
              label="Account Name"
              value={user?.user_account?.account_name}
            />
          </div>
        </div>
      )}

      {/* Wallet */}
      {user?.wallet && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">Wallet</h2>
          <div className="grid grid-cols-3 gap-6">
            <InputField label="Balance" value={`₦${user?.wallet?.balance}`} />
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-500">{label}</label>
      <Input value={value || "N/A"} disabled className="bg-white" />
    </div>
  );
}

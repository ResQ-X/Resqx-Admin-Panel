// "use client";
// import { useState, useEffect } from "react";
// import { use } from "react";
// // import { useRouter } from "next/navigation";
// import axiosInstance from "@/lib/axios";
// import { ServiceView } from "@/components/services/service-details/ServiceView";
// import { ServiceEdit } from "@/components/services/service-details/ServiceEdit";

// export default function OrderDetailsPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const [service, setService] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   // Unwrap the `params` object using `React.use()`
//   const { id } = use(params);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await axiosInstance.get("/resq-service/get");
//         console.log(response);
//         const foundOrder = response?.data?.find((o) => o.id === id);
//         setService(foundOrder);
//       } catch (error) {
//         console.error("Error fetching order:", error);
//       }
//     };

//     fetchOrder();
//   }, [id]);

//   console.log("Service:", service);

//   if (!service) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto bg-white rounded-xl p-8">
//       {isEditing ? (
//         <ServiceEdit service={service} />
//       ) : (
//         <ServiceView service={service} onEdit={() => setIsEditing(true)} />
//       )}
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { use } from "react";
import axiosInstance from "@/lib/axios";
import { ServiceView } from "@/components/services/service-details/ServiceView";
import { ServiceEdit } from "@/components/services/service-details/ServiceEdit";

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

export default function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [service, setService] = useState<Service | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap the `params` object using `React.use()`
  const { id } = use(params);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get("/resq-service/get");

        // Response structure: { success: true, message: "Success", data: { B2C: [...], B2B: [...] } }
        const servicesData: ServicesData = response.data.data;

        // Combine B2C and B2B services and find the matching service
        const allServices = [...servicesData.B2C, ...servicesData.B2B];
        const foundService = allServices.find((s) => s.id === id);

        if (foundService) {
          setService(foundService);
        } else {
          setError("Service not found");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        setError("Failed to fetch service details");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-8">
        <div className="w-full text-center py-10">
          <svg
            className="animate-spin h-8 w-8 text-orange mx-auto mb-2"
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
          <p className="text-sm text-gray-500">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-8">
        <div className="text-center py-10">
          <p className="text-red-500 text-lg mb-4">
            {error || "Service not found"}
          </p>
          <p className="text-orange hover:underline">Back to Services</p>
        </div>
      </div>
    );
  }

  // const handleServiceUpdate = (updatedService: Service) => {
  //   setService(updatedService);
  //   setIsEditing(false);
  // };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl p-8">
      {isEditing ? (
        <ServiceEdit service={service} />
      ) : (
        <ServiceView service={service} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
}

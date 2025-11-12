"use client";
import { useState, useEffect } from "react";
import { use } from "react";
// import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { ServiceView } from "@/components/services/service-details/ServiceView";
import { ServiceEdit } from "@/components/services/service-details/ServiceEdit";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [service, setService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Unwrap the `params` object using `React.use()`
  const { id } = use(params);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axiosInstance.get("/resq-service/get");
        const foundOrder = response?.data?.data.find((o) => o.id === id);
        setService(foundOrder);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id]);

  // console.log("Order:", order);

  if (!service) {
    return <div>Loading...</div>;
  }

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

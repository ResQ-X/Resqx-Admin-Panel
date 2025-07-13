"use client";
import { useState } from "react";
import { ProfileForm } from "@/components/staff/profile-form";
import { SuccessDialog } from "@/components/staff/success-dialog";
import type { StaffProfile } from "@/types/staff";

const MOCK_PROFILE = {
  id: "RX-001",
  name: "Zainab Yusuf",
  role: "Operations Support",
  emailAddress: "zainab@resqx.com",
  contactNumber: "08123456789",
  address: "Gwarinpa, Abuja",
  startDate: "January 31, 2025",
  endDate: "Till Date",
  payment: {
    bankName: "Opay",
    accountNumber: "12345678901",
    frequency: "Monthly",
  },
  assignedItems: ["Enter List"] as string[],
} as const;

export default function AdminProfilePage() {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async (profile: StaffProfile) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(profile); // Use the profile parameter
    setMode("view");
    setShowSuccess(true);
  };

  return (
    <>
      <ProfileForm
        profile={MOCK_PROFILE}
        type="admin"
        mode={mode}
        onEdit={() => setMode("edit")}
        onSave={handleSave}
      />

      <SuccessDialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
        title="Profile updated successfully!"
      />
    </>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { ProfileForm } from "@/components/staff/profile-form";
// import { SuccessDialog } from "@/components/staff/success-dialog";
// import type { StaffProfile } from "@/types/staff";

// export default function AdminProfilePage() {
//   const { id } = useParams();
//   const [profile, setProfile] = useState<StaffProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [mode, setMode] = useState<"view" | "edit">("view");
//   const [showSuccess, setShowSuccess] = useState(false);

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const res = await fetch(`/api/admin/staff/${id}`);
//         const data = await res.json();
//         setProfile(data);
//       } catch (err) {
//         console.error("Failed to fetch staff profile", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (id) fetchProfile();
//   }, [id]);

//   const handleSave = async (updatedProfile: StaffProfile) => {
//     // Simulate or send update to backend
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     setProfile(updatedProfile);
//     setMode("view");
//     setShowSuccess(true);
//   };

//   if (loading)
//     return <div className="p-4 text-sm text-gray-500">Loading profile...</div>;
//   if (!profile)
//     return <div className="p-4 text-sm text-red-500">Profile not found</div>;

//   return (
//     <>
//       <ProfileForm
//         profile={profile}
//         type="admin"
//         mode={mode}
//         onEdit={() => setMode("edit")}
//         onSave={handleSave}
//       />

//       <SuccessDialog
//         open={showSuccess}
//         onOpenChange={setShowSuccess}
//         title="Profile updated successfully!"
//       />
//     </>
//   );
// }

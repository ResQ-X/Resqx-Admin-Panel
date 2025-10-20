"use client";
import { useLoading } from "@/providers/loading-providers";
import { SplashScreen } from "@/components/SplashScreen";

export default function Home() {
  const { isLoading } = useLoading();

  if (isLoading) {
    return <SplashScreen />;
  }

  return null;
}

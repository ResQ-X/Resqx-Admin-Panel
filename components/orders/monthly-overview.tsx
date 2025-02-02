"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
// import { ArrowDown, ArrowUp, Clock, Package } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card"
import 'swiper/css';
import 'swiper/css/free-mode';

const stats = [
  {
    title: "Total Orders",
    value: "325",
    change: { value: "8.5%", trend: "up", timeframe: "from last month" },
    icon: "Package",
  },
  {
    title: "Completed Orders",
    value: "300",
    change: { value: "1.3%", trend: "up", timeframe: "from last month" },
    icon: "Package",
  },
  {
    title: "Canceled Orders",
    value: "25",
    change: { value: "4.3%", trend: "down", timeframe: "from last month" },
    icon: "Package",
  },
  {
    title: "Avg Response Time",
    value: "6 Min",
    change: { value: "1.8%", trend: "up", timeframe: "from last month" },
    icon: "Clock",
  },
  {
    title: "Total Revenue",
    value: "₦2,124,600",
    change: { value: "1.8%", trend: "up", timeframe: "from last month" },
    icon: "Package",
  },
  {
    title: "Peak Times",
    value: "3PM - 6PM",
    change: { value: "1.8%", trend: "up", timeframe: "from yesterday" },
    icon: "Clock",
  },
] as const;

export function MonthlyOverview() {
  return (
    <div className="rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[32px] text-dark-brown font-bold">Monthly Overview</h2>
        <select className="text-[12px] font-normal text-[#2B3034] text-opacity-40 border bg-white border-[#D5D5D5] rounded-lg px-4 py-2">
          <option>January</option>
        </select>
    </div>

      <div className="overflow-hidden px-1">
        <Swiper
          modules={[FreeMode, Mousewheel]}
          spaceBetween={24}
          slidesPerView={3}
          freeMode={{
            enabled: true,
            momentumRatio: 0.5,
            momentumBounceRatio: 0.1,
          }}
          mousewheel={{ forceToAxis: true }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="!overflow-visible"
        >
          {stats.map((stat) => (
            <SwiperSlide key={stat.title} className="!w-[calc(33.33%-16px)]">
              <StatCard key={stat.title} {...stat} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
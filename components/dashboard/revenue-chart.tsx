"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Calendar } from "@/components/ui/calendar";
import { MOCK_REVENUE_DATA } from "@/lib/constants";
import { ChevronUpIcon } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false, // Crucial for full-width control
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number) =>
          new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            notation: "compact",
          }).format(value),
      },
    },
  },
};

export function RevenueChart() {
  const data = {
    labels: MOCK_REVENUE_DATA.map((item) => item.date),
    datasets: [
      {
        data: MOCK_REVENUE_DATA.map((item) => item.value),
        borderColor: "#FF8500",
        backgroundColor: "#FF8500",
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  return (
    <div className="flex gap-6 w-full">
      <div className="bg-white rounded-xl w-full p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[24px] text-dark-brown font-bold">
              Revenue Details
            </h2>
            <p className="text-[18px] font-semibold text-orange mt-2">
              ₦377,000.50
            </p>
            <p className="text-darrk font-medium text-[14px]">Total Revenue</p>
            <div className="text-[#00B69B] font-bold inline-flex gap-1 mt-1 text-sm">
              <ChevronUpIcon /> +2.45%
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-transparent text-sm">
              <option>Jan</option>
            </select>
            <select className="bg-transparent text-sm">
              <option>2025</option>
            </select>
          </div>
        </div>
        <div className="w-full h-[400px]"> {/* Fixed height container */}
          <Line options={options} data={data} />
        </div>
      </div>
      <div className="bg-white rounded-[14px] h-[345px]">
        <Calendar
          className="w-full gap-9 h-full"
          mode="single"
          selected={new Date()}
          onSelect={() => {}}
        />
      </div>
    </div>
  );
}
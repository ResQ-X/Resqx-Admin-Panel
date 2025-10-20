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
import { Calendar } from "@/components/ui/Calendar";
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
  maintainAspectRatio: false,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
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
      grid: {
        display: false,
      },
    },
  },
};

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const data = {
  labels,
  datasets: [
    {
      label: "Resolved",
      data: [250, 300, 280, 250, 300, 280, 200],
      borderColor: "#10B981",
      backgroundColor: "#10B981",
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
    },
    {
      label: "Canceled",
      data: [50, 80, 60, 70, 90, 75, 60],
      borderColor: "#EF4444",
      backgroundColor: "#EF4444",
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
    },
  ],
};

export function OrderTrend() {
  return (
    <div className="flex gap-6 w-full">
      <div className="bg-white rounded-xl w-full p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[24px] text-dark-brown font-bold">
              Order Trend
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-[18px] font-semibold text-green-500">
                32 Orders
              </p>
              <div className="text-[#00B69B] font-bold inline-flex gap-1 text-sm">
                <ChevronUpIcon /> +2.45%
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-transparent text-sm border rounded-lg px-2 py-1">
              <option>Jan</option>
            </select>
            <select className="bg-transparent text-sm border rounded-lg px-2 py-1">
              <option>2025</option>
            </select>
          </div>
        </div>
        <div className="w-full h-[400px]">
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

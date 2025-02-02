"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "all", label: "All Orders" },
  { id: "new", label: "New" },
  { id: "in-progress", label: "In Progress" },
  { id: "resolved", label: "Resolved" },
  { id: "canceled", label: "Canceled" },
]

export function OrderTabs() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            activeTab === tab.id ? "bg-orange text-white" : "text-[#A89887] border border-[#F2E7DA] hover:bg-orange/10",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}


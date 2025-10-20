import { ArrowUp } from "lucide-react"
import type { OperationsStats } from "@/types/operations"

interface StatsCardsProps {
  stats: OperationsStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Active Responders</p>
            <p className="text-2xl font-semibold mt-1">{stats.activeResponders}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-600">👥</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <ArrowUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500 text-sm">{stats.changes.activeResponders}</span>
          <span className="text-gray-500 text-sm">Up from past week</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Active Partners</p>
            <p className="text-2xl font-semibold mt-1">{stats.activePartners}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-orange-600">🤝</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <ArrowUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500 text-sm">{stats.changes.activePartners}</span>
          <span className="text-gray-500 text-sm">Up from yesterday</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Avg Response Time</p>
            <p className="text-2xl font-semibold mt-1">{stats.avgResponseTime}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600">⏱️</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <ArrowUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500 text-sm">{stats.changes.avgResponseTime}</span>
          <span className="text-gray-500 text-sm">Up from yesterday</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Requests in Progress</p>
            <p className="text-2xl font-semibold mt-1">{stats.requestsInProgress}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600">⚡</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <ArrowUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500 text-sm">{stats.changes.requestsInProgress}</span>
          <span className="text-gray-500 text-sm">Up from yesterday</span>
        </div>
      </div>
    </div>
  )
}


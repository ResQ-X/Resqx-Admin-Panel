import { ArrowUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { PartnerMetrics } from "@/types/partners"

interface MetricsCardsProps {
  metrics: PartnerMetrics
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Active Partners</p>
            <p className="text-2xl font-semibold mt-1">{metrics.activePartners.value}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-600">👥</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <ArrowUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500 text-sm">{metrics.activePartners.change}</span>
          <span className="text-gray-500 text-sm">{metrics.activePartners.timeframe}</span>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Avg Response Time</p>
            <p className="text-2xl font-semibold mt-1">{metrics.avgResponseTime.value}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600">⏱️</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <ArrowUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500 text-sm">{metrics.avgResponseTime.change}</span>
          <span className="text-gray-500 text-sm">{metrics.avgResponseTime.timeframe}</span>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Customer Satisfaction</p>
            <p className="text-2xl font-semibold mt-1">{metrics.customerSatisfaction.value}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600">⭐</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <ArrowUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500 text-sm">{metrics.customerSatisfaction.change}</span>
          <span className="text-gray-500 text-sm">{metrics.customerSatisfaction.timeframe}</span>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Partner Revenue</p>
            <p className="text-2xl font-semibold mt-1">{metrics.revenue.value}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600">💰</span>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <ArrowUp className="h-4 w-4 text-green-500" />
          <span className="text-green-500 text-sm">{metrics.revenue.change}</span>
          <span className="text-gray-500 text-sm">{metrics.revenue.timeframe}</span>
        </div>
      </Card>
    </div>
  )
}


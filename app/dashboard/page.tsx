import { StatCard } from "@/components/dashboard/stat-card"
import { IncidentsTable } from "@/components/dashboard/incidents-table"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { MOCK_STATS } from "@/lib/constants"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-4 gap-6">
        {MOCK_STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <IncidentsTable />

      <RevenueChart />

      <footer className="text-center font-medium text-[16px] text-black">© 2025 ResQ-X. All Rights Reserved.</footer>
    </div>
  )
}


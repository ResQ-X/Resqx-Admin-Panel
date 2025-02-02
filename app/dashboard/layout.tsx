import { DashboardNav } from "@/components/dashboard/nav"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto bg-lighter p-8">{children}</main>
      </div>
    </div>
  )
}


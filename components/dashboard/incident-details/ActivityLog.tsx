import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import type { IncidentDetails } from "@/types/dashboard";

interface ActivityLogProps {
  activities: IncidentDetails["activities"];
}

export function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Activity Log</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Note/ Performed By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity, index) => (
            <TableRow key={index}>
              <TableCell className="text-sm">{activity.time}</TableCell>
              <TableCell className="text-sm">{activity.activity}</TableCell>
              <TableCell className="text-sm">{activity.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

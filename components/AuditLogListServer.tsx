import { getAuditLogs } from "@/lib/actions";
import type { AuditLog } from "@/types/audit-log";
import { toZonedTime, format } from "date-fns-tz";

// Helper: format JST. CHANGE TO DIFFERENT TIMEZONE IF NEEDED
function formatJST(date: Date | string) {
  // If your `createdAt` is a string, parse it:
  const utcDate = typeof date === "string" ? new Date(date) : date;
  const jst = toZonedTime(utcDate, "Asia/Tokyo");
  return format(jst, "yyyy-MM-dd HH:mm:ss (zzz)", { timeZone: "Asia/Tokyo" });
}

export default async function AuditLogListServer() {
  const logs: AuditLog[] = await getAuditLogs(100);

  return (
    <table className="min-w-full bg-white border text-sm text-left">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-2 border">Time (JST)</th>
          <th className="py-2 px-2 border">User</th>
          <th className="py-2 px-2 border">Email</th>
          <th className="py-2 px-2 border">Action</th>
          <th className="py-2 px-2 border">Meta</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log: AuditLog) => (
          <tr key={log.id} className="border-b hover:bg-gray-50">
            <td className="py-1 px-2 border">
              {log.createdAt ? formatJST(log.createdAt) : ""}
            </td>
            <td className="py-1 px-2 border">{log.userName}</td>
            <td className="py-1 px-2 border">{log.email}</td>
            <td className="py-1 px-2 border text-blue-700 font-mono">{log.action}</td>
            <td className="py-1 px-2 border max-w-xs overflow-x-auto whitespace-pre-wrap">
              <pre className="text-xs font-mono bg-gray-50 rounded p-2">
                {log.meta ? JSON.stringify(log.meta, null, 2) : ""}
              </pre>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

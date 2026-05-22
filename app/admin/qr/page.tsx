import { AdminShell } from "@/components/AdminShell";
import { QrGenerator } from "@/components/QrGenerator";

export default function QrPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return (
    <AdminShell title="QR generator">
      <QrGenerator baseUrl={baseUrl} />
    </AdminShell>
  );
}

import { AdminShell } from "@/components/AdminShell";
import { StaffQrManager } from "@/components/StaffQrManager";

export default function StaffQrPage() {
  return (
    <AdminShell title="Secret staff QR">
      <StaffQrManager />
    </AdminShell>
  );
}

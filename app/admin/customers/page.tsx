import { AdminShell } from "@/components/AdminShell";
import { customers } from "@/lib/data";

export default function CustomersPage() {
  return (
    <AdminShell title="Customer management">
      <div className="overflow-hidden rounded-lg border border-cream/10">
        <table className="w-full min-w-[760px] border-collapse bg-white/[0.04] text-sm">
          <thead className="bg-coal text-left text-xs uppercase tracking-[0.2em] text-ember">
            <tr>
              <th className="p-4">Nume</th>
              <th className="p-4">Telefon</th>
              <th className="p-4">Vizite</th>
              <th className="p-4">Puncte</th>
              <th className="p-4">Referral</th>
              <th className="p-4">Actiuni staff</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t border-cream/10">
                <td className="p-4 font-bold">{customer.name}</td>
                <td className="p-4 text-smoke">{customer.phone}</td>
                <td className="p-4">{customer.total_visits}</td>
                <td className="p-4">{customer.total_points}</td>
                <td className="p-4 text-ember">{customer.referral_code}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="rounded-md border border-cream/15 px-3 py-2 font-bold">Manual +1</button>
                    <button className="rounded-md border border-cream/15 px-3 py-2 font-bold">Manual -1</button>
                    <button className="rounded-md bg-ember px-3 py-2 font-bold text-coal">Confirm reward</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}

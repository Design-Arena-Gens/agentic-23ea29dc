import { ClientTable } from '@/components/ClientTable';

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Clients & Estates</h1>
      <ClientTable />
    </div>
  );
}

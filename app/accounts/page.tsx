import { ExpenseTable } from '@/components/ExpenseTable';

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Estate Accounts</h1>
      <ExpenseTable />
    </div>
  );
}

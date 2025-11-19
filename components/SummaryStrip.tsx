"use client";
import { useArboretumStore } from '@/lib/store';
import { format } from 'date-fns';

export function SummaryStrip() {
  const { clients, events, tasks, expenses } = useArboretumStore();
  const nextEvent = [...events]
    .filter(e => new Date(e.date) >= new Date())
    .sort((a,b) => +new Date(a.date) - +new Date(b.date))[0];

  const monthSpend = expenses
    .filter(e => {
      const d = new Date(e.date);
      const n = new Date();
      return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
    })
    .reduce((acc, e) => acc + e.amount, 0);

  const doneCount = tasks.filter(t => t.status === 'done').length;

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <StatCard label="Clients" value={clients.length} />
      <StatCard label="Next Service" value={nextEvent ? `${format(new Date(nextEvent.date), 'MMM d')} ? ${nextEvent.title}` : '?'} />
      <StatCard label="Tasks Done" value={doneCount} />
      <StatCard label="Spend (This Month)" value={`$${monthSpend.toFixed(2)}`} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card-surface p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="text-lg mt-1">{value}</div>
    </div>
  );
}

"use client";
import { useArboretumStore } from '@/lib/store';
import { useState } from 'react';

export function ExpenseTable() {
  const { expenses, addExpense } = useArboretumStore();
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0,10), vendor: '', category: 'materials' as const, amount: '', notes: '' });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!form.vendor || Number.isNaN(amount)) return;
    addExpense({ date: new Date(form.date).toISOString(), vendor: form.vendor, category: form.category, amount, notes: form.notes });
    setForm({ date: new Date().toISOString().slice(0,10), vendor: '', category: 'materials', amount: '', notes: '' });
  }

  const total = expenses.reduce((a, e) => a + e.amount, 0);

  return (
    <div className="space-y-4">
      <form onSubmit={submit} className="card-surface p-4 grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
        <Field label="Date"><input type="date" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2"/></Field>
        <Field label="Vendor"><input value={form.vendor} onChange={(e)=>setForm({...form, vendor:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2"/></Field>
        <Field label="Category">
          <select value={form.category} onChange={(e)=>setForm({...form, category:e.target.value as any})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <option>materials</option>
            <option>labor</option>
            <option>equipment</option>
            <option>transport</option>
            <option>other</option>
          </select>
        </Field>
        <Field label="Amount ($)"><input value={form.amount} onChange={(e)=>setForm({...form, amount:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2"/></Field>
        <Field label="Notes" className="md:col-span-2"><input value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2"/></Field>
        <button className="btn-primary md:col-span-6">Add Expense</button>
      </form>

      <div className="card-surface p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-medium">Ledger</div>
          <div className="text-sm text-slate-400">Total: ${total.toFixed(2)}</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Vendor</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Notes</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e.id} className="border-t border-white/10">
                  <td className="py-3 pr-4">{new Date(e.date).toLocaleDateString()}</td>
                  <td className="py-3 pr-4">{e.vendor}</td>
                  <td className="py-3 pr-4 capitalize">{e.category}</td>
                  <td className="py-3 pr-4">${e.amount.toFixed(2)}</td>
                  <td className="py-3 pr-4 text-slate-400">{e.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs text-slate-400">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

"use client";
import { useArboretumStore } from '@/lib/store';
import { useState } from 'react';

export function ClientTable() {
  const { clients, addClient } = useArboretumStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', estateName: '', location: '', contactEmail: '', tier: 'stewardship' as const, notes: '' });

  function submit() {
    if (!form.name || !form.estateName) return;
    addClient({ ...form });
    setForm({ name: '', estateName: '', location: '', contactEmail: '', tier: 'stewardship', notes: '' });
    setOpen(false);
  }

  return (
    <div className="card-surface p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-medium">Clients & Estates</div>
        <button className="btn-primary" onClick={() => setOpen(true)}>Add Client</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-400">
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Estate</th>
              <th className="py-2 pr-4">Location</th>
              <th className="py-2 pr-4">Tier</th>
              <th className="py-2 pr-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr key={c.id} className="border-t border-white/10">
                <td className="py-3 pr-4">{c.name}</td>
                <td className="py-3 pr-4">{c.estateName}</td>
                <td className="py-3 pr-4">{c.location}</td>
                <td className="py-3 pr-4 capitalize">{c.tier}</td>
                <td className="py-3 pr-4 text-slate-400">{c.contactEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="card-surface p-6 w-full max-w-lg">
            <div className="text-lg font-medium mb-4">New Client</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Estate" value={form.estateName} onChange={(e) => setForm({ ...form, estateName: e.target.value })} />
              <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <Input label="Email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
              <div>
                <label className="text-xs text-slate-400">Tier</label>
                <select className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2" value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value as any })}>
                  <option value="stewardship">Stewardship</option>
                  <option value="retainer">Retainer</option>
                  <option value="project">Project</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-slate-400">Notes</label>
                <textarea className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button className="btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={submit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: React.ChangeEventHandler<HTMLInputElement> }) {
  return (
    <div>
      <label className="text-xs text-slate-400">{label}</label>
      <input value={value} onChange={onChange} className="w-full mt-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2" />
    </div>
  );
}

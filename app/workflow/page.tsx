import { Kanban } from '@/components/Kanban';

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Time & Tasks</h1>
      <div className="card-surface p-4">
        <Kanban />
      </div>
    </div>
  );
}

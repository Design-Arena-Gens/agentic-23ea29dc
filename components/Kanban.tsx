"use client";
import { useArboretumStore, Task } from '@/lib/store';

const COLUMNS: { key: Task['status']; title: string }[] = [
  { key: 'backlog', title: 'Backlog' },
  { key: 'scheduled', title: 'Scheduled' },
  { key: 'in_progress', title: 'In Progress' },
  { key: 'done', title: 'Done' },
];

export function Kanban() {
  const { tasks, addTask, updateTaskStatus } = useArboretumStore();

  function onNew() {
    const title = prompt('Task title');
    if (!title) return;
    addTask({ title, status: 'backlog' });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-lg font-medium">Workflow</div>
        <button className="btn-primary" onClick={onNew}>New Task</button>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        {COLUMNS.map(col => (
          <div key={col.key} className="card-surface p-3">
            <div className="text-sm text-slate-300 mb-2">{col.title}</div>
            <div className="space-y-2 min-h-[140px]">
              {tasks.filter(t => t.status === col.key).map(t => (
                <TaskCard key={t.id} task={t} onAdvance={() => advance(t, updateTaskStatus)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function advance(task: Task, update: (id: string, status: Task['status']) => void) {
  const order: Task['status'][] = ['backlog', 'scheduled', 'in_progress', 'done'];
  const idx = order.indexOf(task.status);
  if (idx < order.length - 1) update(task.id, order[idx + 1]);
}

function TaskCard({ task, onAdvance }: { task: Task; onAdvance: () => void }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-sm">{task.title}</div>
      <div className="text-xs text-slate-400 mt-1">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</div>
      {task.status !== 'done' && (
        <button className="btn-ghost mt-2 w-full" onClick={onAdvance}>Advance</button>
      )}
    </div>
  );
}

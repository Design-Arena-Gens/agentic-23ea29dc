import { CalendarView } from '@/components/CalendarView';

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Seasonal Calendar</h1>
      <CalendarView />
    </div>
  );
}

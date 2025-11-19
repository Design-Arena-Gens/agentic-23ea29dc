"use client";
import { addDays, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, isSameDay, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { useState } from 'react';
import { useArboretumStore } from '@/lib/store';

export function CalendarView() {
  const today = new Date();
  const [cursor, setCursor] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));
  const { events, addEvent } = useArboretumStore();

  const start = startOfWeek(startOfMonth(cursor));
  const end = endOfWeek(endOfMonth(cursor));
  const days = eachDayOfInterval({ start, end });

  function onAdd(day: Date) {
    const title = prompt('Service title');
    if (!title) return;
    addEvent({ title, date: new Date(day.getFullYear(), day.getMonth(), day.getDate(), 9, 0, 0).toISOString(), type: 'maintenance' });
  }

  return (
    <div className="card-surface p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-medium">{format(cursor, 'MMMM yyyy')}</div>
        <div className="flex gap-2">
          <button className="btn-ghost" onClick={() => setCursor(addDays(cursor, -30))}>Prev</button>
          <button className="btn-ghost" onClick={() => setCursor(addDays(cursor, 30))}>Next</button>
          <button className="btn-primary" onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}>Today</button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-xs text-slate-400 mb-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="px-2 py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const dayEvents = events.filter(e => isSameDay(new Date(e.date), day));
          const isCurrentMonth = isSameMonth(day, cursor);
          const isToday = isSameDay(day, today);
          return (
            <div key={day.toISOString()} className={`rounded-xl border ${isCurrentMonth ? 'border-white/10' : 'border-white/5 opacity-60'} bg-white/5 p-2 min-h-[110px] flex flex-col gap-2`}>
              <div className="flex items-center justify-between">
                <div className={`text-xs ${isToday ? 'text-chlorophyll-400 font-semibold' : 'text-slate-300'}`}>{format(day, 'd')}</div>
                <button className="text-xs text-slate-400 hover:text-slate-200" onClick={() => onAdd(day)}>?</button>
              </div>
              <div className="flex flex-col gap-1">
                {dayEvents.slice(0,3).map(ev => (
                  <div key={ev.id} className="text-xs truncate px-2 py-1 rounded bg-gradient-to-r from-chlorophyll-400/15 to-chlorophyll-400/10 text-chlorophyll-300 border border-chlorophyll-400/20">
                    {ev.title}
                  </div>
                ))}
                {dayEvents.length > 3 && <div className="text-[10px] text-slate-400">+{dayEvents.length - 3} more</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

"use client";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from './utils';

export type Client = {
  id: string;
  name: string;
  estateName: string;
  location: string;
  contactEmail?: string;
  tier?: 'stewardship' | 'retainer' | 'project';
  notes?: string;
  createdAt: string;
};

export type EventItem = {
  id: string;
  title: string;
  date: string; // ISO date
  clientId?: string;
  type?: 'maintenance' | 'audit' | 'design' | 'report' | 'visit';
  notes?: string;
};

export type Task = {
  id: string;
  title: string;
  status: 'backlog' | 'scheduled' | 'in_progress' | 'done';
  dueDate?: string;
  clientId?: string;
  notes?: string;
};

export type Expense = {
  id: string;
  date: string;
  vendor: string;
  category: 'materials' | 'labor' | 'equipment' | 'transport' | 'other';
  amount: number;
  notes?: string;
};

export type VideoLog = {
  id: string;
  title: string;
  url: string; // external or object URL
  date: string;
  clientId?: string;
};

export type ModelItem = {
  id: string;
  title: string;
  url: string; // gltf/obj url
  date: string;
  clientId?: string;
};

type Store = {
  clients: Client[];
  events: EventItem[];
  tasks: Task[];
  expenses: Expense[];
  videos: VideoLog[];
  models: ModelItem[];
  addClient: (c: Omit<Client, 'id' | 'createdAt'>) => void;
  addEvent: (e: Omit<EventItem, 'id'>) => void;
  addTask: (t: Omit<Task, 'id'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  addExpense: (e: Omit<Expense, 'id'>) => void;
  addVideo: (v: Omit<VideoLog, 'id' | 'date'> & { date?: string }) => void;
  addModel: (m: Omit<ModelItem, 'id' | 'date'> & { date?: string }) => void;
};

const seedNow = new Date();

const seed: Pick<Store, 'clients' | 'events' | 'tasks' | 'expenses' | 'videos' | 'models'> = {
  clients: [
    { id: nanoid(), name: 'The Rowan Family', estateName: 'Northwood Estate', location: 'Litchfield, CT', tier: 'stewardship', createdAt: new Date().toISOString(), contactEmail: 'rowan@estate.example', notes: 'Legacy peony border; organic regimen' },
    { id: nanoid(), name: 'Armitage Trust', estateName: 'Stonegate', location: 'Bedford, NY', tier: 'retainer', createdAt: new Date().toISOString(), contactEmail: 'steward@stonegate.example', notes: 'Irrigation modernization; deer pressure high' },
  ],
  events: [
    { id: nanoid(), title: 'Spring feeding ? North lawn', date: new Date(seedNow.getFullYear(), seedNow.getMonth(), seedNow.getDate() + 7).toISOString(), type: 'maintenance' },
    { id: nanoid(), title: 'Roses ? winter prune', date: new Date(seedNow.getFullYear(), seedNow.getMonth(), seedNow.getDate() + 14).toISOString(), type: 'maintenance' },
  ],
  tasks: [
    { id: nanoid(), title: 'Audit irrigation zones', status: 'scheduled', dueDate: new Date(seedNow.getFullYear(), seedNow.getMonth(), seedNow.getDate() + 10).toISOString() },
    { id: nanoid(), title: 'Soil analysis kit ? Northwood', status: 'in_progress' },
    { id: nanoid(), title: 'Design woodland understory', status: 'backlog' },
  ],
  expenses: [
    { id: nanoid(), date: new Date().toISOString(), vendor: 'GreenPro Supplies', category: 'materials', amount: 342.75, notes: 'Acid mix & mulch' },
  ],
  videos: [
    { id: nanoid(), title: 'Northwood ? canopy walk', url: 'https://videos.pexels.com/video-files/856977/856977-sd_640_360_24fps.mp4', date: new Date().toISOString() },
  ],
  models: []
};

export const useArboretumStore = create<Store>()(
  persist(
    (set) => ({
      ...seed,
      addClient: (c) => set((s) => ({ clients: [...s.clients, { ...c, id: nanoid(), createdAt: new Date().toISOString() }] })),
      addEvent: (e) => set((s) => ({ events: [...s.events, { ...e, id: nanoid() }] })),
      addTask: (t) => set((s) => ({ tasks: [...s.tasks, { ...t, id: nanoid() }] })),
      updateTaskStatus: (id, status) => set((s) => ({ tasks: s.tasks.map(t => t.id === id ? { ...t, status } : t) })),
      addExpense: (e) => set((s) => ({ expenses: [...s.expenses, { ...e, id: nanoid() }] })),
      addVideo: (v) => set((s) => ({ videos: [...s.videos, { ...v, id: nanoid(), date: v.date ?? new Date().toISOString() }] })),
      addModel: (m) => set((s) => ({ models: [...s.models, { ...m, id: nanoid(), date: m.date ?? new Date().toISOString() }] })),
    }),
    { name: 'arboretum-store' }
  )
);

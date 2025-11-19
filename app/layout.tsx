import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Leaf, CalendarClock, Users, Workflow, Banknote, Video, Cube, LayoutDashboard } from 'lucide-react';
import clsx from 'clsx';

export const metadata: Metadata = {
  title: "Arboretum Console ? Head Gardener's Office",
  description: 'Timeless stewardship for high-end horticultural consultancy',
};

function NavLink({ href, label, icon: Icon }: { href: string; label: string; icon: React.ComponentType<any> }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 transition text-slate-200">
      <Icon className="w-5 h-5 text-chlorophyll-400" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx('dark')}>
      <body className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:flex flex-col gap-6 p-6 border-r border-white/10 bg-stone-800/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-chlorophyll-400 to-chlorophyll-500 flex items-center justify-center text-stone-900">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold">Arboretum</div>
              <div className="text-xs text-slate-400">Head Gardener's Office</div>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <NavLink href="/" label="Dashboard" icon={LayoutDashboard} />
            <NavLink href="/calendar" label="Seasonal Calendar" icon={CalendarClock} />
            <NavLink href="/clients" label="Clients & Estates" icon={Users} />
            <NavLink href="/workflow" label="Time & Tasks" icon={Workflow} />
            <NavLink href="/accounts" label="Estate Accounts" icon={Banknote} />
            <NavLink href="/media" label="Video Logs" icon={Video} />
            <NavLink href="/studio" label="3D Studio" icon={Cube} />
          </nav>
          <div className="mt-auto text-xs text-slate-500">Timeless Stewardship ? Private & Discreet</div>
        </aside>
        <main className="p-4 md:p-8 space-y-6">
          {children}
        </main>
      </body>
    </html>
  );
}

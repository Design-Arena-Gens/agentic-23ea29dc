import { ArrowRight, CalendarClock, Users, Workflow, Banknote, Video, Cube } from 'lucide-react';
import Link from 'next/link';
import { SummaryStrip } from '@/components/SummaryStrip';

export default function Page() {
  return (
    <div className="space-y-8">
      <header className="card-surface p-6 md:p-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-chlorophyll-400/0 via-chlorophyll-400/5 to-chlorophyll-400/0" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Head Gardener's Office</h1>
            <p className="text-slate-400 mt-1">Timeless stewardship. Objective truth. Discreet execution.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/calendar" className="btn-primary">Schedule Service <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/clients" className="btn-ghost">Client Registry</Link>
          </div>
        </div>
      </header>

      <SummaryStrip />

      <section className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <FeatureCard href="/calendar" title="Seasonal Calendar" icon={<CalendarClock className="w-5 h-5" />}>
          Precision booking across seasons, programs, and audits.
        </FeatureCard>
        <FeatureCard href="/clients" title="Clients & Estates" icon={<Users className="w-5 h-5" />}>
          Registry of clients, estates, tiers, and plans.
        </FeatureCard>
        <FeatureCard href="/workflow" title="Time & Tasks" icon={<Workflow className="w-5 h-5" />}>
          Discreet workflow engine for service execution.
        </FeatureCard>
        <FeatureCard href="/accounts" title="Estate Accounts" icon={<Banknote className="w-5 h-5" />}>
          Expenses, retainers, and precise ledger controls.
        </FeatureCard>
        <FeatureCard href="/media" title="Video Logs" icon={<Video className="w-5 h-5" />}>
          Walkthroughs, disease diagnostics, and progress logs.
        </FeatureCard>
        <FeatureCard href="/studio" title="3D Studio" icon={<Cube className="w-5 h-5" />}>
          Visualize planting schemes and irrigation models.
        </FeatureCard>
      </section>
    </div>
  );
}

function FeatureCard({ href, title, icon, children }: { href: string; title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Link href={href} className="card-surface p-6 group">
      <div className="flex items-center gap-3 text-chlorophyll-300">
        <div className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <p className="text-slate-400 mt-3">{children}</p>
      <div className="mt-4 text-sm text-chlorophyll-400 opacity-0 group-hover:opacity-100 transition flex items-center gap-2">Open <ArrowRight className="w-4 h-4"/></div>
    </Link>
  );
}

import { LEADS } from "@/lib/mock-data";
import { ArrowUpRight, MessageCircle, Instagram, Phone, Globe, Facebook, Sparkles, Activity } from "lucide-react";

const sourceIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  WhatsApp: MessageCircle,
  Instagram: Instagram,
  Facebook: Facebook,
  Website: Globe,
  Phone: Phone,
};

export function DashboardMock() {
  const rows = LEADS.slice(0, 4);
  return (
    <div className="relative w-full overflow-hidden rounded-xl border bg-card/60 backdrop-blur-md shadow-elevated border-zinc-200/80 dark:border-zinc-800/80">
      {/* fake window chrome */}
      <div className="flex items-center justify-between border-b px-4 py-3 border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/20">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-800" />
          <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-800" />
          <span className="h-3 w-3 rounded-full bg-zinc-300 dark:bg-zinc-800" />
          <div className="ml-4 flex h-6 w-56 items-center justify-center rounded-md border bg-background/50 border-zinc-200/60 dark:border-zinc-800/60 px-2 text-[10px] text-muted-foreground tracking-tight">
            app.minops.com/workspace
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-muted-foreground font-medium">Live sync</span>
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-0">
        {/* mini sidebar */}
        <div className="col-span-3 border-r border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/10 p-3 hidden sm:block">
          <div className="flex items-center gap-2 px-1 py-1">
            <div className="grid h-6 w-6 place-items-center rounded bg-brand text-brand-foreground shadow-soft">
              <span className="text-[10px] font-bold">M</span>
            </div>
            <div className="text-[12px] font-display font-semibold tracking-tight">MinOps</div>
          </div>
          
          <div className="mt-4 space-y-1">
            {[
              { label: "Dashboard", active: true },
              { label: "Leads", count: "24" },
              { label: "Pipeline" },
              { label: "Follow-Ups", count: "3" },
              { label: "Analytics" },
              { label: "Settings" }
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[11px] font-medium transition-all ${
                  item.active 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-1 w-1 rounded-full ${item.active ? "bg-brand-foreground" : "bg-zinc-400 dark:bg-zinc-600"}`} />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className={`text-[9px] px-1 rounded ${item.active ? "bg-brand-foreground/20 text-brand-foreground" : "bg-muted text-muted-foreground"}`}>
                    {item.count}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* content */}
        <div className="col-span-12 sm:col-span-9 p-4 bg-background/40">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-brand">Workspace</div>
              <h4 className="text-sm font-semibold tracking-tight font-display">Executive Dashboard</h4>
            </div>
            <div className="rounded-lg bg-brand text-brand-foreground hover:opacity-95 px-2.5 py-1 text-[11px] font-medium shadow-soft cursor-pointer">
              + New Lead
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { l: "Total Leads", v: "1,284", d: "+12.4%", trend: "up" },
              { l: "Won Deals", v: "324", d: "+8.1%", trend: "up" },
              { l: "Conversion Rate", v: "34.6%", d: "+2.2%", trend: "up" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl border bg-card p-3 border-zinc-200/60 dark:border-zinc-800/60 shadow-soft">
                <div className="text-[10px] text-muted-foreground font-medium">{s.l}</div>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-base font-semibold tracking-tight">{s.v}</span>
                  <span className="text-[9px] font-medium text-emerald-500">{s.d}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* mini chart */}
          <div className="mt-3.5 rounded-xl border bg-card/65 p-3.5 border-zinc-200/60 dark:border-zinc-800/60 shadow-soft">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-medium text-muted-foreground">Monthly Velocity</span>
              <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> +14% vs last month
              </span>
            </div>
            <div className="h-24">
              <svg viewBox="0 0 300 80" className="h-full w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="glow-grad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,70 Q30,60 60,65 T120,40 T180,50 T240,25 T300,10 L300,80 L0,80 Z"
                  fill="url(#glow-grad)"
                />
                <path
                  d="M0,70 Q30,60 60,65 T120,40 T180,50 T240,25 T300,10"
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Dots along path */}
                <circle cx="120" cy="40" r="3" fill="var(--brand)" />
                <circle cx="240" cy="25" r="3" fill="var(--brand)" />
                <circle cx="300" cy="10" r="3" fill="var(--brand)" />
              </svg>
            </div>
          </div>
          
          <div className="mt-3.5 overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-card">
            <div className="grid grid-cols-12 border-b bg-zinc-50/50 dark:bg-zinc-950/20 px-3 py-2 text-[10px] font-medium text-muted-foreground">
              <div className="col-span-5">Lead / Company</div>
              <div className="col-span-3">Source</div>
              <div className="col-span-4 text-right">Status</div>
            </div>
            <div className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
              {rows.map((r) => {
                const Icon = sourceIcon[r.source];
                return (
                  <div key={r.id} className="grid grid-cols-12 items-center px-3 py-2 text-[11px] hover:bg-muted/20">
                    <div className="col-span-5 flex items-center gap-2">
                      <div className="grid h-5 w-5 place-items-center rounded-full bg-brand/10 text-brand text-[9px] font-bold">
                        {r.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <span className="truncate font-medium">{r.name}</span>
                    </div>
                    <div className="col-span-3 flex items-center gap-1 text-muted-foreground">
                      {Icon && <Icon className="h-3 w-3 text-brand" />} 
                      <span className="text-[10px]">{r.source}</span>
                    </div>
                    <div className="col-span-4 flex justify-end">
                      <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-medium ${
                        r.status === "Won" 
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                          : r.status === "Negotiation" 
                          ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                          : "bg-zinc-100 dark:bg-zinc-800 text-muted-foreground border-zinc-200 dark:border-zinc-700"
                      }`}>{r.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Blur elements */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-indigo-500/5 blur-3xl" />
      
      {/* Floating Widget */}
      <div className="absolute right-4 top-24 rounded-lg border border-zinc-200/80 dark:border-zinc-800/80 bg-background/90 backdrop-blur px-2.5 py-1.5 text-[10px] font-medium shadow-elevated flex items-center gap-2 animate-float">
        <div className="h-2 w-2 rounded-full bg-brand" />
        <span className="text-foreground">Smart follow-up sent to Priya</span>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/topbar";
import { STATS, MONTHLY_LEADS, SOURCE_DATA, LEADS } from "@/lib/mock-data";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";
import { ArrowUp, ArrowDown, Users, UserPlus, ListChecks, Trophy, X, Percent, Calendar } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — MinOps" }] }),
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { Icon: Users, label: "Total Leads", value: STATS.totalLeads.toLocaleString(), delta: "+12.4%", up: true },
    { Icon: UserPlus, label: "New Leads", value: STATS.newLeads, delta: "+6.1%", up: true },
    { Icon: ListChecks, label: "Follow-Ups Today", value: STATS.followUpsToday, delta: "Due", up: true, neutral: true },
    { Icon: Trophy, label: "Won Leads", value: STATS.wonLeads, delta: "+8.2%", up: true },
    { Icon: X, label: "Lost Leads", value: STATS.lostLeads, delta: "-2.1%", up: false },
    { Icon: Percent, label: "Conversion Rate", value: STATS.conversion + "%", delta: "+1.4%", up: true },
  ];
  return (
    <>
      <AppTopbar title="Dashboard" subtitle="Welcome back, Alex. Here's what's happening today." />
      <main className="space-y-6 p-6">
        {/* Key Metrics Grid */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {stats.map((s) => (
            <div 
              key={s.label} 
              className="group rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-card p-4 shadow-soft transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-50 dark:bg-zinc-800 text-muted-foreground transition duration-300 group-hover:bg-brand group-hover:text-brand-foreground group-hover:shadow-glow">
                  <s.Icon className="h-4 w-4" />
                </div>
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider ${s.neutral ? "text-muted-foreground" : s.up ? "text-emerald-500" : "text-destructive"}`}>
                  {!s.neutral && (s.up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                  {s.delta}
                </span>
              </div>
              <div className="mt-4 text-2xl font-bold tracking-tight font-display text-foreground">{s.value}</div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </section>

        {/* Charts Section */}
        <section className="grid gap-4 lg:grid-cols-3">
          <Card title="Monthly Leads" subtitle="Leads created vs won this year" className="lg:col-span-2">
            <div className="h-72 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_LEADS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cLead" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cWon" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--electric)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--electric)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="leads" stroke="var(--brand)" strokeWidth={2} fill="url(#cLead)" />
                  <Area type="monotone" dataKey="won" stroke="var(--electric)" strokeWidth={2} fill="url(#cWon)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title="Lead Sources" subtitle="Breakdown by channel">
            <div className="h-72 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={SOURCE_DATA} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {SOURCE_DATA.map((e, i) => (
                      <Cell 
                        key={i} 
                        fill={
                          e.name === "WhatsApp" ? "var(--brand)" :
                          e.name === "Instagram" ? "var(--electric)" :
                          e.name === "Facebook" ? "var(--ring)" :
                          "var(--muted-foreground)"
                        } 
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Growth & Tasks Section */}
        <section className="grid gap-4 lg:grid-cols-3">
          <Card title="Growth Trends" subtitle="Won deals by month" className="lg:col-span-2">
            <div className="h-64 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_LEADS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="won" radius={[4, 4, 0, 0]} fill="var(--brand)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title="Upcoming Follow-Ups" subtitle="Next 3 days">
            <ul className="space-y-3.5 mt-2">
              {LEADS.slice(0, 5).map((l) => (
                <li key={l.id} className="flex items-center gap-3 hover:bg-muted/10 p-1.5 rounded-lg transition-colors">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-brand/10 text-brand text-xs font-bold">
                    {l.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-bold text-foreground">{l.name}</div>
                    <div className="truncate text-[11px] text-muted-foreground">{l.service}</div>
                  </div>
                  <span className="rounded-md border bg-background px-2 py-0.5 text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                    <Calendar className="h-3 w-3 text-brand" />
                    {new Date(l.followUp).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Recent Leads Table */}
        <Card title="Recent Leads" subtitle="Latest activity in your pipeline" action={<Link to="/app/leads" className="text-xs font-bold text-brand hover:underline">View all →</Link>}>
          <div className="overflow-hidden rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-card mt-3">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b bg-zinc-50/50 dark:bg-zinc-950/20 text-[10px] uppercase font-bold text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-850">
                {LEADS.slice(0, 6).map((l) => (
                  <tr key={l.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-8 w-8 place-items-center rounded-full bg-brand/10 text-brand text-xs font-bold">
                          {l.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">{l.name}</div>
                          <div className="text-[10px] text-muted-foreground">{l.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{l.source}</td>
                    <td className="px-4 py-3 text-muted-foreground">{l.service}</td>
                    <td className="px-4 py-3"><StatusPill status={l.status} /></td>
                    <td className="px-4 py-3 text-right font-semibold text-foreground">${l.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </>
  );
}

export function Card({ title, subtitle, action, children, className = "" }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-card p-5 shadow-soft transition-all duration-300 hover:shadow-elevated ${className}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold tracking-tight text-foreground font-display">{title}</h3>
          {subtitle && <p className="mt-0.5 truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    "New": "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-650 dark:text-zinc-350 border-zinc-200/80 dark:border-zinc-700",
    "Contacted": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
    "Interested": "bg-brand/10 text-brand border-brand/20",
    "Proposal Sent": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "Negotiation": "bg-brand/10 text-brand border-brand/20",
    "Won": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "Lost": "bg-rose-500/10 text-rose-500 border-rose-500/20",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${map[status] ?? "bg-muted"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

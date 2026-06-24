import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/topbar";
import { Card } from "@/routes/app.dashboard";
import { MONTHLY_LEADS, SOURCE_DATA, TRENDS } from "@/lib/mock-data";
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — MinOps" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <>
      <AppTopbar title="Analytics" subtitle="Insights across your pipeline performance and lead acquisition." />
      <main className="space-y-6 p-6">
        
        {/* Analytics Key Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { l: "Total Revenue", v: "$284,920", d: "+18.4%" },
            { l: "Won Deals", v: "1,184", d: "+12.1%" },
            { l: "Avg Deal Size", v: "$2,406", d: "+4.2%" },
            { l: "Conversion", v: "34.6%", d: "+1.8%" },
          ].map((s) => (
            <div 
              key={s.l} 
              className="group rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-card p-4 shadow-soft transition-all duration-300 hover:shadow-elevated hover:-translate-y-0.5"
            >
              <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{s.l}</div>
              <div className="mt-2 text-2xl font-bold tracking-tight font-display text-foreground">{s.v}</div>
              <div className="text-[10px] font-bold text-emerald-500 mt-1">{s.d} vs last period</div>
            </div>
          ))}
        </div>

        {/* First Charts Row */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="Conversion Trends" subtitle="Monthly conversion rate %" className="lg:col-span-2">
            <div className="h-72 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TRENDS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="conversion" stroke="var(--brand)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--brand)", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card title="Lead Sources" subtitle="Channel breakdown">
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
        </div>

        {/* Second Charts Row */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Revenue Forecast" subtitle="Projected monthly revenue">
            <div className="h-72 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TRENDS}>
                  <defs>
                    <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--electric)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--electric)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Area dataKey="revenue" stroke="var(--electric)" strokeWidth={2} fill="url(#rev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <Card title="Pipeline Performance" subtitle="Leads vs won by month">
            <div className="h-72 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MONTHLY_LEADS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="leads" radius={[4, 4, 0, 0]} fill="var(--brand)" />
                  <Bar dataKey="won" radius={[4, 4, 0, 0]} fill="var(--electric)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}

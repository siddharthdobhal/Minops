import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Users, KanbanSquare, ListChecks, Activity, BarChart3,
  Settings, ChevronLeft, ChevronRight, Plus, Sparkles,
} from "lucide-react";
import { Logo, LogoIcon } from "@/components/brand/logo";

const NAV = [
  { to: "/app/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/app/leads", label: "Leads", Icon: Users },
  { to: "/app/pipeline", label: "Pipeline", Icon: KanbanSquare },
  { to: "/app/followups", label: "Follow-Ups", Icon: ListChecks },
  { to: "/app/activities", label: "Activities", Icon: Activity },
  { to: "/app/analytics", label: "Analytics", Icon: BarChart3 },
  { to: "/app/settings", label: "Settings", Icon: Settings },
] as const;

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={`sticky top-0 hidden h-screen shrink-0 border-r bg-sidebar text-sidebar-foreground transition-all md:flex md:flex-col ${
        collapsed ? "w-[68px]" : "w-[244px]"
      }`}
    >
      <div className={`flex h-16 items-center border-b border-zinc-200/60 dark:border-zinc-800/60 ${collapsed ? "justify-center px-2" : "justify-between px-4"}`}>
        {collapsed ? (
          <LogoIcon className="h-6 w-6 text-brand" />
        ) : (
          <Logo />
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mt-2 grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      <div className="p-3">
        <button
          className={`flex w-full items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90 transition shadow-soft ${
            collapsed ? "justify-center px-0" : ""
          }`}
        >
          <Plus className="h-4 w-4" />
          {!collapsed && "New Lead"}
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 px-2">
        {NAV.map((n) => {
          const active = pathname === n.to || (n.to !== "/app/dashboard" && pathname.startsWith(n.to));
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              } ${collapsed ? "justify-center px-0" : ""}`}
            >
              <n.Icon className={`h-4 w-4 ${active ? "text-brand" : ""}`} />
              {!collapsed && <span>{n.label}</span>}
              {!collapsed && active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand" />}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="m-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-brand" /> Upgrade to Pro
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">
            Unlock unlimited leads and advanced analytics.
          </p>
          <button className="mt-3 w-full rounded-lg bg-primary py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
            Upgrade
          </button>
        </div>
      )}
    </aside>
  );
}

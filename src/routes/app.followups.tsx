import { createFileRoute, Link } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/topbar";
import { LEADS } from "@/lib/mock-data";
import { Card } from "@/routes/app.dashboard";
import { CalendarClock, AlertTriangle, CheckCircle2, Phone, Calendar as CalendarIcon, ListTodo, GitCommit, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/app/followups")({
  head: () => ({ meta: [{ title: "Follow-Ups — MinOps" }] }),
  component: FollowupsPage,
});

type ViewMode = "inbox" | "timeline" | "calendar";

function FollowupsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("inbox");
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<Date | null>(new Date());

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const endOfToday = startOfToday + 86400000;

  const isToday = (d: Date) => {
    return d.getFullYear() === today.getFullYear() && 
           d.getMonth() === today.getMonth() && 
           d.getDate() === today.getDate();
  };

  const isOverdue = (d: Date) => {
    return d.getTime() < startOfToday;
  };

  const isUpcoming = (d: Date) => {
    return d.getTime() >= endOfToday;
  };

  // Group leads
  const todaysLeads = useMemo(() => LEADS.filter((l) => isToday(new Date(l.followUp))), [LEADS]);
  const overdueLeads = useMemo(() => LEADS.filter((l) => isOverdue(new Date(l.followUp))), [LEADS]);
  const upcomingLeads = useMemo(() => LEADS.filter((l) => isUpcoming(new Date(l.followUp))), [LEADS]);

  const toggleTaskCompleted = (id: string) => {
    setCompletedTasks(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      <AppTopbar title="Follow-Ups" subtitle="Stay on top of every conversation and deal." />
      <main className="space-y-6 p-6">
        
        {/* KPI Stats section */}
        <div className="grid gap-4 md:grid-cols-3">
          <Stat CardIcon={CalendarClock} label="Today" count={todaysLeads.length} tint="bg-brand/10 text-brand" />
          <Stat CardIcon={AlertTriangle} label="Overdue" count={overdueLeads.length} tint="bg-rose-500/10 text-rose-500" />
          <Stat CardIcon={CheckCircle2} label="Upcoming" count={upcomingLeads.length} tint="bg-emerald-500/10 text-emerald-500" />
        </div>

        {/* View Toggle Bar */}
        <div className="flex items-center justify-between border-b pb-4 border-zinc-200/60 dark:border-zinc-800/60">
          <div className="flex items-center gap-2 p-0.5 border rounded-lg bg-zinc-50/50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800">
            {[
              { id: "inbox", label: "Inbox", Icon: ListTodo },
              { id: "timeline", label: "Timeline", Icon: GitCommit },
              { id: "calendar", label: "Calendar", Icon: CalendarIcon },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setViewMode(v.id as ViewMode)}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition ${
                  viewMode === v.id
                    ? "bg-background text-foreground border-zinc-200 dark:border-zinc-850 shadow-soft border"
                    : "text-muted-foreground hover:text-foreground border border-transparent"
                }`}
              >
                <v.Icon className="h-3.5 w-3.5" />
                <span>{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic View Panels */}
        {viewMode === "inbox" && (
          <div className="space-y-6">
            <InboxSection 
              title="Today's Follow-Ups" 
              leads={todaysLeads} 
              priority="High" 
              completedTasks={completedTasks}
              toggleTask={toggleTaskCompleted}
            />
            <InboxSection 
              title="Overdue Inquiries" 
              leads={overdueLeads} 
              priority="High" 
              tone="destructive" 
              completedTasks={completedTasks}
              toggleTask={toggleTaskCompleted}
            />
            <InboxSection 
              title="Upcoming Reminders" 
              leads={upcomingLeads} 
              priority="Medium" 
              completedTasks={completedTasks}
              toggleTask={toggleTaskCompleted}
            />
          </div>
        )}

        {viewMode === "timeline" && (
          <TimelineView 
            todaysLeads={todaysLeads}
            overdueLeads={overdueLeads}
            upcomingLeads={upcomingLeads}
            completedTasks={completedTasks}
            toggleTask={toggleTaskCompleted}
          />
        )}

        {viewMode === "calendar" && (
          <CalendarView 
            allLeads={LEADS}
            selectedCalendarDate={selectedCalendarDate}
            setSelectedCalendarDate={setSelectedCalendarDate}
            completedTasks={completedTasks}
            toggleTask={toggleTaskCompleted}
          />
        )}
      </main>
    </>
  );
}

function Stat({ CardIcon, label, count, tint }: { CardIcon: React.ComponentType<{ className?: string }>; label: string; count: number; tint: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-card p-5 shadow-soft transition-all duration-300 hover:shadow-elevated">
      <div className={`grid h-12 w-12 place-items-center rounded-xl ${tint}`}><CardIcon className="h-5 w-5" /></div>
      <div>
        <div className="text-2xl font-bold font-display text-foreground">{count}</div>
        <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function InboxSection({ 
  title, 
  leads, 
  priority, 
  tone,
  completedTasks,
  toggleTask
}: { 
  title: string; 
  leads: typeof LEADS; 
  priority: string; 
  tone?: "destructive";
  completedTasks: string[];
  toggleTask: (id: string) => void;
}) {
  return (
    <Card 
      title={title} 
      subtitle={`${leads.length} task${leads.length === 1 ? "" : "s"} remaining`}
      className={tone === "destructive" ? "border-rose-500/30 bg-rose-500/[0.01]" : ""}
    >
      {leads.length === 0 ? (
        <div className="grid h-24 place-items-center rounded-lg border border-dashed text-xs text-muted-foreground italic border-zinc-200 dark:border-zinc-800">
          You're all caught up.
        </div>
      ) : (
        <ul className="divide-y divide-zinc-200/60 dark:divide-zinc-850 mt-2">
          {leads.map((l) => {
            const isCompleted = completedTasks.includes(l.id);
            const pClass = priority === "High" ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
              : priority === "Medium" ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            return (
              <li 
                key={l.id} 
                className={`group flex items-center justify-between gap-3 py-3 transition-opacity duration-200 ${
                  isCompleted ? "opacity-45" : ""
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <input 
                    type="checkbox" 
                    checked={isCompleted}
                    onChange={() => toggleTask(l.id)}
                    className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 accent-brand shrink-0 cursor-pointer" 
                  />
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-brand/10 text-brand text-[10px] font-bold shrink-0">
                    {l.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                  </div>
                  <div className="min-w-0">
                    <Link 
                      to="/app/leads/$id" 
                      params={{ id: l.id }} 
                      className={`text-xs font-semibold hover:underline block truncate text-foreground ${
                        isCompleted ? "line-through" : ""
                      }`}
                    >
                      {l.name}
                    </Link>
                    <div className="text-[10px] text-muted-foreground truncate mt-0.5">{l.service} · source: {l.source}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-2 py-0.5 text-[9px] font-bold ${pClass}`}>{priority}</span>
                  <span className={`text-[10px] font-medium ${tone === "destructive" ? "text-rose-500 font-bold" : "text-muted-foreground"}`}>
                    {new Date(l.followUp).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <a 
                      href={`tel:${l.phone}`}
                      className="grid h-7 w-7 place-items-center rounded border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="Call Lead"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                    <a 
                      href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-7 w-7 place-items-center rounded border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      title="WhatsApp Lead"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

function TimelineView({ 
  todaysLeads, 
  overdueLeads, 
  upcomingLeads,
  completedTasks,
  toggleTask
}: { 
  todaysLeads: typeof LEADS;
  overdueLeads: typeof LEADS;
  upcomingLeads: typeof LEADS;
  completedTasks: string[];
  toggleTask: (id: string) => void;
}) {
  const timelineGroups = useMemo(() => {
    return [
      { label: "Overdue Tasks", leads: overdueLeads, color: "text-rose-500 bg-rose-500/10" },
      { label: "Today", leads: todaysLeads, color: "text-brand bg-brand/10" },
      { label: "Upcoming", leads: upcomingLeads, color: "text-emerald-500 bg-emerald-500/10" },
    ].filter(x => x.leads.length > 0);
  }, [overdueLeads, todaysLeads, upcomingLeads]);

  return (
    <Card title="Activity Timeline" subtitle="Chronological follow-up feed">
      <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 pl-8 space-y-8 mt-4">
        {timelineGroups.map((group) => (
          <div key={group.label} className="space-y-4">
            <div className="relative -left-[45px] flex items-center">
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest ${group.color}`}>
                {group.label}
              </span>
            </div>
            
            <div className="space-y-3">
              {group.leads.map((l) => {
                const isCompleted = completedTasks.includes(l.id);
                return (
                  <div 
                    key={l.id} 
                    className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 border rounded-xl p-4 bg-zinc-50/20 dark:bg-zinc-950/10 hover:bg-muted/15 transition-all duration-200 ${
                      isCompleted ? "opacity-45" : ""
                    }`}
                  >
                    <span className="absolute -left-[42px] top-4.5 grid h-4 w-4 place-items-center rounded-full border border-zinc-250 dark:border-zinc-700 bg-card text-brand">
                      <GitCommit className="h-2.5 w-2.5" />
                    </span>
                    
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={isCompleted}
                        onChange={() => toggleTask(l.id)}
                        className="h-3.5 w-3.5 rounded border-zinc-300 dark:border-zinc-700 accent-brand shrink-0 cursor-pointer" 
                      />
                      <div>
                        <Link 
                          to="/app/leads/$id" 
                          params={{ id: l.id }} 
                          className={`text-xs font-semibold hover:text-brand hover:underline text-foreground block ${
                            isCompleted ? "line-through" : ""
                          }`}
                        >
                          {l.name}
                        </Link>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Need to touch base regarding: {l.service}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        {new Date(l.followUp).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <a 
                        href={`tel:${l.phone}`}
                        className="inline-flex items-center gap-1 rounded border bg-background px-2.5 py-1 text-[10px] font-semibold text-foreground hover:bg-muted transition"
                      >
                        <Phone className="h-3 w-3 text-brand" /> Call
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {timelineGroups.length === 0 && (
          <div className="text-xs text-muted-foreground italic py-4">No follow-ups recorded in the timeline.</div>
        )}
      </div>
    </Card>
  );
}

function CalendarView({
  allLeads,
  selectedCalendarDate,
  setSelectedCalendarDate,
  completedTasks,
  toggleTask
}: {
  allLeads: typeof LEADS;
  selectedCalendarDate: Date | null;
  setSelectedCalendarDate: (d: Date | null) => void;
  completedTasks: string[];
  toggleTask: (id: string) => void;
}) {
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const monthName = currentMonthDate.toLocaleString(undefined, { month: "long", year: "numeric" });

  // Get calendar details
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const days: (Date | null)[] = [];
    // empty cells before month start
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    // actual days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  }, [year, month, daysInMonth, firstDayIndex]);

  // Next / Prev Month navigation
  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const getLeadsForDate = (date: Date) => {
    return allLeads.filter(l => {
      const fd = new Date(l.followUp);
      return fd.getFullYear() === date.getFullYear() &&
             fd.getMonth() === date.getMonth() &&
             fd.getDate() === date.getDate();
    });
  };

  const selectedLeads = selectedCalendarDate ? getLeadsForDate(selectedCalendarDate) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Calendar Grid */}
      <Card 
        title={monthName} 
        subtitle="Manage reminders interactively"
        className="lg:col-span-2"
        action={
          <div className="flex gap-1">
            <button onClick={prevMonth} className="p-1 rounded border hover:bg-muted text-muted-foreground hover:text-foreground"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={nextMonth} className="p-1 rounded border hover:bg-muted text-muted-foreground hover:text-foreground"><ChevronRight className="h-4 w-4" /></button>
          </div>
        }
      >
        <div className="grid grid-cols-7 gap-1 text-center font-semibold text-[10px] uppercase text-muted-foreground mt-2 border-b pb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1.5 mt-2">
          {calendarDays.map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} className="h-10 sm:h-14 bg-zinc-50/10 rounded-lg" />;
            
            const leadsForDay = getLeadsForDate(day);
            const isSelected = selectedCalendarDate && 
                               selectedCalendarDate.getFullYear() === day.getFullYear() &&
                               selectedCalendarDate.getMonth() === day.getMonth() &&
                               selectedCalendarDate.getDate() === day.getDate();
            const hasLeads = leadsForDay.length > 0;
            
            return (
              <div 
                key={day.toISOString()}
                onClick={() => setSelectedCalendarDate(day)}
                className={`h-10 sm:h-14 border rounded-lg p-1 sm:p-2 cursor-pointer flex flex-col justify-between transition ${
                  isSelected 
                    ? "border-brand bg-brand/5" 
                    : "border-zinc-200/50 dark:border-zinc-800 bg-card hover:bg-muted/10"
                }`}
              >
                <span className={`text-[10px] sm:text-xs font-bold ${
                  day.toDateString() === new Date().toDateString() 
                    ? "bg-primary text-primary-foreground h-5 w-5 grid place-items-center rounded-full" 
                    : "text-foreground"
                }`}>{day.getDate()}</span>
                
                {hasLeads && (
                  <div className="flex justify-center sm:justify-start gap-0.5">
                    {leadsForDay.slice(0, 3).map(lead => (
                      <span 
                        key={lead.id} 
                        className="h-1.5 w-1.5 rounded-full bg-brand" 
                        title={`${lead.name}: ${lead.service}`} 
                      />
                    ))}
                    {leadsForDay.length > 3 && (
                      <span className="text-[7px] text-muted-foreground font-extrabold sm:block hidden">+{leadsForDay.length - 3}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Selected Day Reminders */}
      <Card 
        title={selectedCalendarDate ? selectedCalendarDate.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) : "Reminders"}
        subtitle={`${selectedLeads.length} inquiry follow-ups`}
      >
        {selectedLeads.length === 0 ? (
          <div className="grid h-32 place-items-center rounded-lg border border-dashed text-xs text-muted-foreground italic border-zinc-200 dark:border-zinc-800 mt-2">
            No reminders due on this date.
          </div>
        ) : (
          <ul className="divide-y divide-zinc-200/60 dark:divide-zinc-850 mt-2">
            {selectedLeads.map((l) => {
              const isCompleted = completedTasks.includes(l.id);
              return (
                <li key={l.id} className={`py-3 flex items-center justify-between gap-3 ${isCompleted ? "opacity-45" : ""}`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <input 
                      type="checkbox" 
                      checked={isCompleted}
                      onChange={() => toggleTask(l.id)}
                      className="h-3.5 w-3.5 rounded border-zinc-300 dark:border-zinc-700 accent-brand cursor-pointer shrink-0" 
                    />
                    <div className="min-w-0">
                      <Link 
                        to="/app/leads/$id" 
                        params={{ id: l.id }} 
                        className={`text-xs font-semibold hover:underline block truncate text-foreground ${
                          isCompleted ? "line-through" : ""
                        }`}
                      >
                        {l.name}
                      </Link>
                      <p className="text-[9px] text-muted-foreground truncate mt-0.5">{l.service} · {l.source}</p>
                    </div>
                  </div>
                  <a 
                    href={`tel:${l.phone}`}
                    className="grid h-7 w-7 place-items-center rounded border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}

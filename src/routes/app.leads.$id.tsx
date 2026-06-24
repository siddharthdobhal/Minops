import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/topbar";
import { LEADS, STATUS_COLUMNS, type Lead } from "@/lib/mock-data";
import { StatusPill, Card } from "@/routes/app.dashboard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, Building2, Calendar, MessageCircle, Plus, CheckCircle2, MessageSquare, ExternalLink } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/leads/$id")({
  head: () => ({ meta: [{ title: "Lead — MinOps" }] }),
  loader: ({ params }): Lead => {
    const lead = LEADS.find((l) => l.id === params.id);
    if (!lead) throw notFound();
    return lead;
  },
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center text-sm text-muted-foreground">Lead not found</div>
  ),
  errorComponent: () => <div className="p-6 text-sm text-destructive">Failed to load lead.</div>,
  component: LeadDetail,
});

function LeadDetail() {
  const lead = Route.useLoaderData() as Lead;
  const [currentStatus, setCurrentStatus] = useState<string>(lead.status);
  const [notes, setNotes] = useState(lead.notes);
  const [newNoteText, setNewNoteText] = useState("");
  
  const stageIndex = STATUS_COLUMNS.indexOf(currentStatus as any);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    
    const newNote = {
      id: `n-${Date.now()}`,
      text: newNoteText,
      author: "Alex Morgan",
      at: new Date().toISOString(),
    };
    
    setNotes([newNote, ...notes]);
    setNewNoteText("");
  };

  return (
    <>
      <AppTopbar title={lead.name} subtitle={`${lead.company} · ${lead.service}`} />
      <main className="space-y-6 p-6">
        <Link to="/app/leads" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to leads
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main workspace (Status, Notes, Activity) */}
          <div className="space-y-6 lg:col-span-2">
            
            {/* Status Progress Chevron */}
            <Card title="Status Pipeline" subtitle="Update lead progress across pipeline stages">
              <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-2">
                {STATUS_COLUMNS.map((s, i) => {
                  const reached = i <= stageIndex && currentStatus !== "Lost";
                  const isCurrent = i === stageIndex;
                  const lost = currentStatus === "Lost";
                  return (
                    <div key={s} className="flex-1 min-w-[70px]">
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${
                        lost 
                          ? (i === stageIndex ? "bg-rose-500 shadow-glow" : "bg-zinc-100 dark:bg-zinc-800") 
                          : reached 
                          ? "bg-brand shadow-glow" 
                          : "bg-zinc-100 dark:bg-zinc-800"
                      }`} />
                      <div className={`mt-2 text-[9px] uppercase font-bold tracking-wider transition-all duration-300 ${
                        isCurrent ? "text-brand" : "text-muted-foreground"
                      }`}>{s}</div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-zinc-200/50 dark:border-zinc-800/60 pt-4">
                {STATUS_COLUMNS.map((s) => (
                  <button 
                    key={s} 
                    onClick={() => setCurrentStatus(s)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold tracking-tight transition cursor-pointer ${
                      s === currentStatus 
                        ? "bg-primary border-primary text-primary-foreground shadow-soft" 
                        : "bg-background border-zinc-200 dark:border-zinc-800 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Card>

            {/* Notes Section */}
            <Card title="Notes" subtitle="Conversations, preferences, and details">
              <form onSubmit={handleAddNote} className="mb-5 mt-2">
                <Textarea 
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Type a new update note about this client..." 
                  className="mb-3 text-xs focus:ring-brand focus:border-brand" 
                />
                <div className="flex justify-end">
                  <Button type="submit" size="sm" className="h-8 text-[11px] font-semibold bg-primary text-primary-foreground hover:opacity-90 px-3 rounded-lg">
                    <Plus className="mr-1 h-3.5 w-3.5" /> Save Note
                  </Button>
                </div>
              </form>
              
              <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 pl-6 space-y-5">
                {notes.map((n) => (
                  <div key={n.id} className="relative group">
                    <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-card" />
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <span className="text-foreground">{n.author}</span>
                      <span>·</span>
                      <span>{new Date(n.at).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    <div className="mt-1 text-xs text-foreground bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-800/60 rounded-xl p-3.5 leading-relaxed">
                      {n.text}
                    </div>
                  </div>
                ))}
                {notes.length === 0 && (
                  <div className="text-xs text-muted-foreground italic py-2">No notes added to this lead yet.</div>
                )}
              </div>
            </Card>

            {/* Timeline Activities */}
            <Card title="Activity Log" subtitle="Audit trail of lead events">
              <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 pl-6 space-y-4.5 mt-2">
                {lead.activity.map((a) => (
                  <div key={a.id} className="relative">
                    <span className="absolute -left-[32px] top-0.5 grid h-4 w-4 place-items-center rounded-full border border-zinc-250 dark:border-zinc-750 bg-card text-brand shadow-soft">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                    </span>
                    <div className="text-[10px] text-muted-foreground font-medium">
                      {new Date(a.at).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </div>
                    <div className="text-xs text-foreground font-semibold mt-0.5">{a.text}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Panel (Customer Profile Details) */}
          <div className="space-y-6">
            
            {/* Customer Information Card */}
            <Card title="Customer Profile">
              <div className="flex items-center gap-3.5 border-b pb-4 mb-4 border-zinc-200/50 dark:border-zinc-800/60">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand text-sm font-bold shrink-0">
                  {lead.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground tracking-tight">{lead.name}</div>
                  <div className="mt-1 flex items-center"><StatusPill status={currentStatus} /></div>
                </div>
              </div>
              
              <ul className="space-y-4 text-xs">
                <Row Icon={Mail} label="Email Address" value={lead.email} isLink href={`mailto:${lead.email}`} />
                <Row Icon={Phone} label="Phone Number" value={lead.phone} isLink href={`tel:${lead.phone}`} />
                <Row Icon={Building2} label="Company Name" value={lead.company} />
                <Row Icon={MessageCircle} label="Traffic Source" value={lead.source} />
                <Row Icon={Calendar} label="Next Follow-Up" value={new Date(lead.followUp).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "short", day: "numeric" })} />
              </ul>
              
              <div className="mt-5 grid grid-cols-2 gap-2 border-t border-zinc-200/50 dark:border-zinc-800/60 pt-4">
                <a 
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-muted font-semibold text-xs h-9"
                >
                  <Phone className="h-3.5 w-3.5 mr-1 text-brand" /> Call
                </a>
                <a 
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90 font-semibold text-xs h-9 shadow-soft"
                >
                  <MessageSquare className="h-3.5 w-3.5 mr-1 text-emerald-500" /> WhatsApp
                </a>
              </div>
            </Card>

            {/* Deal Value Card */}
            <Card title="Deal Value">
              <div className="text-3xl font-extrabold tracking-tight font-display text-brand">${lead.value.toLocaleString()}</div>
              <p className="mt-1 text-[10px] text-muted-foreground uppercase font-bold tracking-wide">Estimated contract size</p>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

function Row({ 
  Icon, 
  label, 
  value, 
  isLink, 
  href 
}: { 
  Icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string;
  isLink?: boolean;
  href?: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-muted-foreground border shrink-0"><Icon className="h-4 w-4" /></span>
      <div className="min-w-0 flex-1">
        <div className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground">{label}</div>
        {isLink && href ? (
          <a href={href} className="truncate text-xs font-semibold hover:text-brand hover:underline flex items-center gap-1 text-foreground">
            {value} <ExternalLink className="h-2.5 w-2.5 shrink-0 opacity-60" />
          </a>
        ) : (
          <div className="truncate text-xs font-semibold text-foreground">{value}</div>
        )}
      </div>
    </li>
  );
}

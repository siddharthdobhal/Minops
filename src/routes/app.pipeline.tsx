import { createFileRoute, Link } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/topbar";
import { LEADS, STATUS_COLUMNS, type LeadStatus } from "@/lib/mock-data";
import { motion, Reorder } from "framer-motion";
import { useState } from "react";
import { Phone, Calendar, MoreVertical, MessageCircle, Instagram, Facebook, Globe, DollarSign } from "lucide-react";

export const Route = createFileRoute("/app/pipeline")({
  head: () => ({ meta: [{ title: "Pipeline — MinOps" }] }),
  component: PipelinePage,
});

const sourceIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  WhatsApp: MessageCircle,
  Instagram: Instagram,
  Facebook: Facebook,
  Website: Globe,
  Phone: Phone,
};

function PipelinePage() {
  const initial: Record<LeadStatus, typeof LEADS> = STATUS_COLUMNS.reduce((acc, s) => {
    acc[s] = LEADS.filter((l) => l.status === s);
    return acc;
  }, {} as Record<LeadStatus, typeof LEADS>);
  
  const [cols, setCols] = useState(initial);

  return (
    <>
      <AppTopbar title="Pipeline" subtitle="Drag deals across stages to instantly update deal statuses." />
      <main className="p-6">
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin">
          {STATUS_COLUMNS.map((s) => {
            const columnLeads = cols[s] || [];
            const colTotalVal = columnLeads.reduce((sum, lead) => sum + lead.value, 0);
            
            return (
              <div key={s} className="w-72 shrink-0 flex flex-col max-h-[80vh]">
                {/* Column Header */}
                <div className="mb-3.5 flex items-center justify-between px-1.5 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${columnDot(s)}`} />
                    <h3 className="text-xs font-bold font-display text-foreground uppercase tracking-wider">{s}</h3>
                    <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {columnLeads.length}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-brand uppercase tracking-wider">
                    ${(colTotalVal / 1000).toFixed(1)}k
                  </span>
                </div>
                
                {/* Drag-and-drop Group */}
                <Reorder.Group
                  axis="y"
                  values={columnLeads}
                  onReorder={(next) => setCols((c) => ({ ...c, [s]: next }))}
                  className="space-y-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 p-2.5 overflow-y-auto max-h-[70vh] scrollbar-thin"
                >
                  {columnLeads.map((lead) => {
                    const SourceIcon = sourceIcon[lead.source];
                    return (
                      <Reorder.Item key={lead.id} value={lead}>
                        <motion.div
                          whileHover={{ y: -1 }}
                          className="cursor-grab rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-card p-3.5 shadow-soft hover:shadow-elevated transition duration-200 active:cursor-grabbing hover:border-zinc-350 dark:hover:border-zinc-700"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <Link 
                              to="/app/leads/$id" 
                              params={{ id: lead.id }}
                              className="text-xs font-bold text-foreground hover:text-brand hover:underline transition-colors block truncate"
                            >
                              {lead.name}
                            </Link>
                            <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground">
                              ${(lead.value / 1000).toFixed(1)}k
                            </span>
                          </div>
                          
                          <div className="mt-1 text-[10px] text-muted-foreground truncate">{lead.service}</div>
                          
                          <div className="mt-3.5 flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-800/55 pt-2.5 text-[10px] text-muted-foreground font-medium">
                            <span className="inline-flex items-center gap-1.5">
                              {SourceIcon && <SourceIcon className="h-3 w-3 text-brand" />}
                              <span className="truncate max-w-[80px]">{lead.source}</span>
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-brand" />
                              {new Date(lead.followUp).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                            </span>
                          </div>
                        </motion.div>
                      </Reorder.Item>
                    );
                  })}
                  {columnLeads.length === 0 && (
                    <div className="grid h-24 place-items-center rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 text-[11px] text-muted-foreground italic">
                      No deals in {s}
                    </div>
                  )}
                </Reorder.Group>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

function columnDot(s: string) {
  const map: Record<string, string> = {
    "New": "bg-zinc-400",
    "Contacted": "bg-indigo-500",
    "Interested": "bg-brand",
    "Proposal Sent": "bg-amber-500",
    "Negotiation": "bg-brand",
    "Won": "bg-emerald-500",
    "Lost": "bg-rose-500",
  };
  return map[s] ?? "bg-zinc-400";
}

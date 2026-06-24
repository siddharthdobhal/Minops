import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppTopbar } from "@/components/app/topbar";
import { LEADS, STATUS_COLUMNS, type LeadStatus } from "@/lib/mock-data";
import { StatusPill } from "@/routes/app.dashboard";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, Filter, MoreHorizontal, Phone, Mail, MessageSquare, Trash } from "lucide-react";

export const Route = createFileRoute("/app/leads/")({
  head: () => ({ meta: [{ title: "Leads — MinOps" }] }),
  component: LeadsPage,
});

function LeadsPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<LeadStatus | "All">("All");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Row Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return LEADS.filter((l) =>
      (status === "All" || l.status === status) &&
      (q === "" || (l.name + l.company + l.service + l.phone).toLowerCase().includes(q.toLowerCase()))
    );
  }, [q, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const isAllSelected = rows.length > 0 && rows.every(r => selectedIds.includes(r.id));
  
  const toggleSelectAll = () => {
    if (isAllSelected) {
      // Deselect all on current page
      setSelectedIds(prev => prev.filter(id => !rows.some(r => r.id === id)));
    } else {
      // Select all on current page
      setSelectedIds(prev => {
        const toAdd = rows.filter(r => !prev.includes(r.id)).map(r => r.id);
        return [...prev, ...toAdd];
      });
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      <AppTopbar title="Leads" subtitle={`${filtered.length} of ${LEADS.length} leads`} />
      <main className="space-y-4 p-6">
        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder="Search leads..."
                className="h-9 w-64 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-background pl-8 pr-3 text-xs outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
            </div>
            <div className="flex items-center gap-1 border rounded-lg p-0.5 bg-zinc-50/50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-800">
              {(["All", ...STATUS_COLUMNS] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatus(s as LeadStatus | "All"); setPage(1); }}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                    status === s 
                      ? "bg-background text-foreground border-zinc-200 dark:border-zinc-800 shadow-soft border" 
                      : "text-muted-foreground hover:text-foreground border border-transparent"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <div className="flex items-center gap-1.5 mr-2">
                <span className="text-xs text-muted-foreground font-semibold">
                  {selectedIds.length} selected
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedIds([])}
                  className="h-8 text-[11px] font-semibold px-2"
                >
                  Clear
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-[11px] font-semibold px-2 text-destructive hover:bg-destructive/15 border-destructive/20"
                >
                  <Trash className="h-3.5 w-3.5 mr-1" /> Delete
                </Button>
              </div>
            )}
            <Button variant="outline" size="sm" className="h-9 text-xs border-zinc-200 dark:border-zinc-800 font-semibold"><Filter className="mr-1.5 h-3.5 w-3.5" /> Filters</Button>
            <AddLeadDialog />
          </div>
        </div>

        {/* Attio-Style Spreadsheet Grid */}
        <div className="overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-card shadow-soft">
          <div className="relative overflow-x-auto max-h-[600px] scrollbar-thin">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/90 dark:bg-zinc-950/80 backdrop-blur-md text-[10px] uppercase font-bold text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 w-10 text-center border-r border-zinc-200 dark:border-zinc-800">
                    <input 
                      type="checkbox" 
                      checked={isAllSelected}
                      onChange={toggleSelectAll}
                      className="h-3.5 w-3.5 rounded border-zinc-300 dark:border-zinc-700 accent-brand" 
                    />
                  </th>
                  <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800">Customer</th>
                  <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800">Phone</th>
                  <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800">Source</th>
                  <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800">Service</th>
                  <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800">Status</th>
                  <th className="px-4 py-3 font-semibold border-r border-zinc-200 dark:border-zinc-800">Follow-Up</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-850">
                {rows.map((l) => {
                  const isSelected = selectedIds.includes(l.id);
                  return (
                    <tr 
                      key={l.id} 
                      className={`group hover:bg-muted/30 transition-colors cursor-pointer ${
                        isSelected ? "bg-brand/5 dark:bg-brand/10 hover:bg-brand/10 dark:hover:bg-brand/15" : ""
                      }`}
                      onClick={() => navigate({ to: `/app/leads/${l.id}` })}
                    >
                      {/* Checkbox */}
                      <td 
                        className="px-4 py-3 text-center border-r border-zinc-200/40 dark:border-zinc-800/40"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => toggleSelectRow(l.id)}
                          className="h-3.5 w-3.5 rounded border-zinc-300 dark:border-zinc-700 accent-brand" 
                        />
                      </td>
                      
                      {/* Customer Info */}
                      <td className="px-4 py-3 border-r border-zinc-200/40 dark:border-zinc-800/40">
                        <div className="flex items-center gap-3">
                          <div className="grid h-8 w-8 place-items-center rounded-full bg-brand/10 text-brand text-xs font-bold shrink-0">
                            {l.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground hover:text-brand hover:underline transition-colors">{l.name}</div>
                            <div className="text-[10px] text-muted-foreground">{l.company}</div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Phone */}
                      <td className="px-4 py-3 text-muted-foreground border-r border-zinc-200/40 dark:border-zinc-800/40">
                        {l.phone}
                      </td>
                      
                      {/* Source */}
                      <td className="px-4 py-3 text-muted-foreground border-r border-zinc-200/40 dark:border-zinc-800/40">
                        <span className="inline-flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                          {l.source}
                        </span>
                      </td>
                      
                      {/* Service */}
                      <td className="px-4 py-3 text-muted-foreground border-r border-zinc-200/40 dark:border-zinc-800/40 font-medium">
                        {l.service}
                      </td>
                      
                      {/* Status */}
                      <td className="px-4 py-3 border-r border-zinc-200/40 dark:border-zinc-800/40">
                        <StatusPill status={l.status} />
                      </td>
                      
                      {/* Follow-Up Date */}
                      <td className="px-4 py-3 text-muted-foreground border-r border-zinc-200/40 dark:border-zinc-800/40 font-medium">
                        {new Date(l.followUp).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                      </td>
                      
                      {/* Hover Actions */}
                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <div className="hidden group-hover:flex items-center gap-1">
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
                              title="Send Message"
                            >
                              <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
                            </a>
                          </div>
                          <button className="grid h-7 w-7 place-items-center rounded border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-sm text-muted-foreground italic">
                      No leads match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between border-t px-4 py-3 text-xs text-muted-foreground bg-zinc-50/50 dark:bg-zinc-950/20">
            <span className="font-medium">Page {page} of {pages}</span>
            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="h-8 text-xs font-semibold px-3" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
              <Button variant="outline" size="sm" className="h-8 text-xs font-semibold px-3" disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function AddLeadDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 text-xs bg-primary text-primary-foreground hover:opacity-90 font-semibold shadow-soft rounded-lg">
          <Plus className="mr-1 h-4 w-4" /> Add Lead
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] rounded-xl">
        <DialogHeader>
          <DialogTitle className="font-display font-bold tracking-tight">Add a new lead</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-2" onSubmit={(e) => { e.preventDefault(); setOpen(false); }}>
          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <Label htmlFor="lead-name" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Full name</Label>
              <Input id="lead-name" placeholder="Jane Doe" className="h-9 text-xs focus:ring-brand focus:border-brand" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-company" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Company</Label>
              <Input id="lead-company" placeholder="Acme Inc" className="h-9 text-xs focus:ring-brand focus:border-brand" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-email" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
              <Input id="lead-email" type="email" placeholder="jane@acme.com" className="h-9 text-xs focus:ring-brand focus:border-brand" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-phone" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Phone</Label>
              <Input id="lead-phone" placeholder="+1 555..." className="h-9 text-xs focus:ring-brand focus:border-brand" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-source" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Source</Label>
              <Input id="lead-source" placeholder="WhatsApp" className="h-9 text-xs focus:ring-brand focus:border-brand" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-service" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Service</Label>
              <Input id="lead-service" placeholder="Consultation" className="h-9 text-xs focus:ring-brand focus:border-brand" />
            </div>
          </div>
          <DialogFooter className="pt-2 gap-2 sm:gap-0">
            <Button type="button" variant="outline" className="h-9 text-xs font-semibold rounded-lg" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="h-9 text-xs bg-primary text-primary-foreground hover:opacity-90 font-semibold rounded-lg px-4">Add Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

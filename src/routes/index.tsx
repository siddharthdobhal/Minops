import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, Check, Play, Sparkles, MessageCircle, Instagram, Facebook,
  Globe, Phone, Users, Clock, AlertTriangle, TrendingDown, KanbanSquare,
  Activity, BarChart3, ListChecks, StickyNote, Target, Star, ChevronRight,
  Shield, Zap, Layers, Mail, Plus
} from "lucide-react";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { DashboardMock } from "@/components/marketing/dashboard-mock";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MinOps — Manage Leads. Track Follow-Ups. Close More Deals." },
      {
        name: "description",
        content:
          "MinOps is a premium minimalist CRM for small businesses, agencies, and service providers. Capture leads from WhatsApp, Instagram, Facebook, and phone — and close more deals.",
      },
      { property: "og:title", content: "MinOps — Modern CRM for service businesses" },
      { property: "og:description", content: "Never lose another lead again." },
    ],
  }),
  component: Landing,
});

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-brand/20 selection:text-brand">
      <MarketingNav />
      <Hero />
      <SocialProof />
      <Problem />
      <InteractiveShowcase />
      <Solution />
      <Benefits />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <MarketingFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36">
      {/* Premium ambient light backgrounds */}
      <div className="absolute inset-0 grid-bg opacity-30 dark:opacity-20 radial-fade" />
      <div className="pointer-events-none absolute top-[-10%] left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-brand/10 dark:bg-brand/5 blur-[120px]" />
      
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <motion.div 
            {...fade} 
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-background/60 dark:bg-zinc-900/60 px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-soft backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand" />
              <span className="font-semibold text-foreground">v2.0 Workspace</span>
              <span className="text-zinc-300 dark:text-zinc-700">|</span>
              <span className="flex items-center gap-1">
                Smart Follow-Ups <Sparkles className="h-3 w-3 text-brand" />
              </span>
            </div>
            
            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl md:text-6xl leading-[1.05]">
              Never lose another <br />
              <span className="text-brand">lead again.</span>
            </h1>
            
            <p className="mt-6 max-w-xl text-balance text-sm sm:text-base text-muted-foreground leading-relaxed">
              MinOps unifies your inquiries from WhatsApp, Instagram, Facebook, and forms into a single fast workspace. Organize follow-ups, map your sales pipeline, and close deals without the clutter.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <Button asChild size="lg" className="bg-primary text-primary-foreground font-medium shadow-glow hover:opacity-95 transition-opacity px-6 py-6 h-auto rounded-lg">
                <Link to="/signup">
                  Start Free <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="border-zinc-200 dark:border-zinc-800 hover:bg-muted font-medium px-6 py-6 h-auto rounded-lg">
                <Play className="mr-1.5 h-3.5 w-3.5 fill-current" /> Watch Demo
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-6 w-full text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium"><Check className="h-4 w-4 text-emerald-500" /> Free forever tier</span>
              <span className="inline-flex items-center gap-1.5 font-medium"><Check className="h-4 w-4 text-emerald-500" /> No card required</span>
              <span className="inline-flex items-center gap-1.5 font-medium"><Check className="h-4 w-4 text-emerald-500" /> Setup in 2 mins</span>
            </div>
          </motion.div>
          
          <motion.div 
            {...fade} 
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 relative w-full"
          >
            <div className="relative rounded-2xl p-1 bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-850/50 shadow-2xl">
              <DashboardMock />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const logos = ["Loop Studio", "Northwind", "Helix Agency", "Aurora Tattoo", "Forge Gym", "PixelForge"];
  return (
    <section className="border-y border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/20 dark:bg-zinc-950/10 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">
          POWERING VENTURES & HIGH-GROWTH TEAMS WORLDWIDE
        </p>
        <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-8 sm:grid-cols-3 md:grid-cols-6 opacity-60 dark:opacity-40">
          {logos.map((l) => (
            <div key={l} className="text-sm font-display font-bold tracking-tight text-foreground transition hover:opacity-100 cursor-default">
              {l}
            </div>
          ))}
        </div>
        
        <div className="mt-12 grid grid-cols-3 divide-x divide-zinc-200/80 dark:divide-zinc-800/80 rounded-xl border border-zinc-200/80 dark:border-zinc-850 bg-background/50 py-5 shadow-soft">
          {[
            { n: "10,000+", l: "Leads Managed" },
            { n: "2.4x", l: "Follow-Up Conversion" },
            { n: "99.9%", l: "Workspace Uptime" },
          ].map((s) => (
            <div key={s.l} className="px-4 text-center">
              <div className="text-xl sm:text-2xl font-bold font-display tracking-tight text-brand">{s.n}</div>
              <div className="mt-1 text-[10px] sm:text-xs text-muted-foreground font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const items = [
    { Icon: MessageCircle, t: "Forgotten Chat Leads", d: "WhatsApp, Instagram & Facebook DMs disappear down the feed, costing thousands in uncaptured pipeline." },
    { Icon: AlertTriangle, t: "Slipped Follow-Ups", d: "No reminders mean inquiries go cold. Prospect conversations fade when follow-ups are kept in your head." },
    { Icon: Users, t: "Scattered Customer Data", d: "Customer info and notes are spread across notes apps, call logs, spreadsheet tabs, and DM threads." },
    { Icon: TrendingDown, t: "Blind Conversion Rates", d: "You can't optimize what you can't measure. Conversion data is lost without clean tracking." },
  ];
  return (
    <section className="py-24" id="solutions">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fade} className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand">THE REALITY</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            CRMs are too heavy. DMs are too messy.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Service-based teams lose over 30% of their inquiries simply due to missed follow-ups and unorganized pipelines.
          </p>
        </motion.div>
        
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div 
              key={it.t} 
              {...fade} 
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 bg-card p-6 shadow-soft hover:shadow-elevated hover:border-zinc-350 dark:hover:border-zinc-700 transition duration-300"
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800/50 text-foreground group-hover:bg-brand group-hover:text-brand-foreground transition-all duration-300">
                <it.Icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-4 font-semibold text-sm sm:text-base tracking-tight">{it.t}</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractiveShowcase() {
  const tabs = [
    { id: "dashboard", label: "Executive Dashboard", subtitle: "High-level overview of revenue and lead velocity." },
    { id: "pipeline", label: "Sales Pipeline", subtitle: "Visual drag-and-drop Kanban workflow." },
    { id: "database", label: "Attio-style Leads", subtitle: "Sleek, customizable customer database." },
    { id: "followups", label: "Smart Follow-Ups", subtitle: "Urgency-focused todo system with priority status." },
  ];
  
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <section className="py-24 border-y border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-950/10">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fade} className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand">PRODUCT TOUR</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Interactive Product Preview
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Explore the layout and discover how MinOps refines your CRM workflow.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`rounded-lg border px-4 py-2 text-xs font-semibold tracking-tight transition duration-200 cursor-pointer ${
                activeTab === t.id
                  ? "bg-primary border-primary text-primary-foreground shadow-soft"
                  : "bg-background border-zinc-200 dark:border-zinc-800 text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        
        <div className="mt-4 text-center text-xs text-muted-foreground italic h-5">
          {tabs.find((t) => t.id === activeTab)?.subtitle}
        </div>

        {/* Interactive Mock Container */}
        <motion.div 
          layout
          className="mt-8 rounded-xl border border-zinc-200/80 dark:border-zinc-800/85 p-1 bg-zinc-100/50 dark:bg-zinc-900/30 shadow-2xl overflow-hidden min-h-[400px]"
        >
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <DashboardMock />
            </motion.div>
          )}
          
          {activeTab === "pipeline" && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.4 }}
              className="w-full bg-card rounded-xl overflow-hidden border"
            >
              {/* fake chrome header */}
              <div className="flex items-center gap-1.5 border-b px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950/20">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <span className="ml-4 text-[10px] text-muted-foreground font-semibold">Workspace Pipeline / Leads</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <div className="flex gap-4 min-w-[700px] py-2">
                  {[
                    { title: "Incoming", count: 2, dot: "bg-zinc-400", leads: [{ name: "Noah Bennett", service: "Website Redesign", val: "$4,500", source: "Website" }, { name: "Sofia Rossi", service: "Brand Identity", val: "$2,800", source: "Instagram" }] },
                    { title: "Interested", count: 1, dot: "bg-brand", leads: [{ name: "Aarav Mehta", service: "Premium Membership", val: "$1,200", source: "WhatsApp" }] },
                    { title: "Proposal", count: 1, dot: "bg-amber-500", leads: [{ name: "Liam Carter", service: "SEO Retainer", val: "$3,600", source: "Phone" }] },
                    { title: "Won", count: 1, dot: "bg-emerald-500", leads: [{ name: "Zara Ahmed", service: "Bridal Package", val: "$5,500", source: "WhatsApp" }] },
                  ].map((col) => (
                    <div key={col.title} className="w-1/4 min-w-[180px] bg-zinc-50/30 dark:bg-zinc-950/20 rounded-xl p-3 border">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                          <span className="text-xs font-bold font-display">{col.title}</span>
                          <span className="text-[10px] bg-muted px-1.5 rounded text-muted-foreground">{col.count}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {col.leads.map((l) => (
                          <div key={l.name} className="bg-card border rounded-lg p-3 shadow-soft hover:-translate-y-0.5 transition duration-200">
                            <div className="flex items-start justify-between">
                              <span className="text-xs font-semibold">{l.name}</span>
                              <span className="text-[9px] font-bold text-brand">{l.val}</span>
                            </div>
                            <div className="text-[10px] text-muted-foreground mt-1">{l.service}</div>
                            <div className="mt-2.5 flex items-center justify-between border-t pt-2 text-[9px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                                {l.source}
                              </span>
                              <span>Due today</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === "database" && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.4 }}
              className="w-full bg-card rounded-xl overflow-hidden border"
            >
              {/* fake chrome header */}
              <div className="flex items-center justify-between border-b px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950/20">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                  <span className="text-[10px] text-muted-foreground font-semibold">Leads Directory (Attio-style)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] border px-2 py-0.5 rounded bg-background flex items-center gap-1"><Filter className="h-2.5 w-2.5" /> Filter</span>
                  <span className="text-[10px] bg-brand text-brand-foreground px-2 py-0.5 rounded">+ Add Row</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-muted-foreground border-collapse">
                  <thead>
                    <tr className="border-b bg-muted/30 text-[10px] uppercase font-bold text-foreground">
                      <th className="px-4 py-2.5 border-r">Lead</th>
                      <th className="px-4 py-2.5 border-r">Company</th>
                      <th className="px-4 py-2.5 border-r">Service</th>
                      <th className="px-4 py-2.5 border-r">Source</th>
                      <th className="px-4 py-2.5 border-r">Value</th>
                      <th className="px-4 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground divide-y">
                    {[
                      { name: "Priya Iyer", comp: "Bright Academy", serv: "SAT Coaching", source: "Website", val: "$1,800", status: "Negotiation", color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
                      { name: "Mateo Garcia", comp: "Vela Agency", serv: "Website Redesign", source: "Instagram", val: "$9,200", status: "Proposal Sent", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
                      { name: "Diego Morales", comp: "Lumen Health", serv: "SEO Retainer", source: "WhatsApp", val: "$3,500", status: "Won", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
                      { name: "Lucas Silva", comp: "PixelForge", serv: "Brand Identity", source: "Facebook", val: "$4,200", status: "Contacted", color: "bg-zinc-100 dark:bg-zinc-800 text-muted-foreground border-zinc-200 dark:border-zinc-700" },
                    ].map((row) => (
                      <tr key={row.name} className="hover:bg-muted/10">
                        <td className="px-4 py-3 font-medium border-r flex items-center gap-2">
                          <div className="grid h-6 w-6 place-items-center rounded-full bg-brand/10 text-brand text-[9px] font-bold">
                            {row.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          {row.name}
                        </td>
                        <td className="px-4 py-3 border-r text-muted-foreground">{row.comp}</td>
                        <td className="px-4 py-3 border-r text-muted-foreground">{row.serv}</td>
                        <td className="px-4 py-3 border-r text-muted-foreground">{row.source}</td>
                        <td className="px-4 py-3 font-semibold border-r">{row.val}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold ${row.color}`}>{row.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
          
          {activeTab === "followups" && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.4 }}
              className="w-full bg-card rounded-xl overflow-hidden border p-4"
            >
              <div className="flex items-center justify-between border-b pb-3 mb-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand">Due follow-ups</h4>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="text-destructive font-semibold">2 Overdue</span>
                  <span>·</span>
                  <span className="text-brand font-semibold">1 Today</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {[
                  { text: "Call Aarav Mehta regarding proposal status", source: "WhatsApp", time: "Overdue (2h)", priority: "High", color: "text-destructive bg-destructive/10 border-destructive/20" },
                  { text: "Send updated contract to Sofia Rossi", source: "Instagram", time: "Overdue (5h)", priority: "High", color: "text-destructive bg-destructive/10 border-destructive/20" },
                  { text: "Confirm training session time with Liam Carter", source: "Phone", time: "Today (2:30 PM)", priority: "Medium", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between border rounded-lg p-3 hover:bg-muted/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 dark:border-zinc-700 accent-brand" />
                      <div>
                        <span className="text-xs font-semibold text-foreground block">{item.text}</span>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3" /> {item.time} · source: {item.source}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold ${item.color}`}>{item.priority}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Solution() {
  const items = [
    { Icon: Users, t: "Lead Profiles", d: "Deep customer profiles showing logs, services requested, and contact histories." },
    { Icon: ListChecks, t: "Follow-Up Urgency", d: "Smart sorting ranks follow-ups by due date and priority to keep pipeline hot." },
    { Icon: Activity, t: "Unified Activity Feed", d: "A clear chronologic timeline of status transitions, notes, and messages." },
    { Icon: KanbanSquare, t: "Visual Pipeline Board", d: "Draggable Kanban cards that map to deal sizes, status columns, and next steps." },
    { Icon: StickyNote, t: "Internal Context Notes", d: "Collaborate and drop contextual notes on lead profiles instantly." },
    { Icon: BarChart3, t: "Core Metrics Dashboard", d: "Visual charts for revenue forecasts, conversion funnels, and lead sources." },
  ];
  return (
    <section className="py-24 bg-zinc-50/20 dark:bg-zinc-950/10">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fade} className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand">THE WORKSPACE</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            A premium CRM dashboard that gets out of your way.
          </h2>
        </motion.div>
        
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div 
              key={it.t} 
              {...fade} 
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 bg-card p-6 shadow-soft hover:shadow-elevated transition duration-200"
            >
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand/10 text-brand shadow-soft">
                <it.Icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="mt-4 font-semibold text-sm sm:text-base tracking-tight">{it.t}</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{it.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { Icon: Zap, t: "Zero-Latency UI", d: "Built on modern SPA routing, transitions feel instantaneous, responding at 60fps." },
    { Icon: Shield, t: "Venture-Grade Security", d: "Client data is locked down with encryption at rest, secure JWT authentication, and active HTTPS protocols." },
    { Icon: Layers, t: "Multi-Channel Syncing", d: "Connect your incoming traffic directly. Log incoming phone, web, and social leads automatically." },
  ];
  return (
    <section className="py-24 border-y border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/10 dark:bg-zinc-950/20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand">BENEFITS</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl leading-tight">
              Designed for conversion, not complexity.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We focus purely on the essentials. No bloated plugin structures, just a high-fidelity workspace designed to close deals.
            </p>
          </div>
          
          <div className="lg:col-span-8 grid gap-6 sm:grid-cols-3">
            {items.map((b) => (
              <div key={b.t} className="rounded-xl border border-zinc-200/50 dark:border-zinc-850 bg-card p-5 shadow-soft">
                <div className="grid h-8 w-8 place-items-center rounded bg-brand/10 text-brand mb-4">
                  <b.Icon className="h-4 w-4" />
                </div>
                <h4 className="font-semibold text-xs sm:text-sm tracking-tight">{b.t}</h4>
                <p className="mt-2 text-[11px] sm:text-xs text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { n: "Sarah Chen", c: "Helix Salon", q: "We went from missing half our WhatsApp inquiries to responding within minutes. MinOps paid for itself in a week." },
    { n: "Marcus Lopez", c: "Forge Gym", q: "The simplicity is its superpower. My trainers hate standard CRMs, but they love updating this Kanban pipeline." },
    { n: "Aiko Tanaka", c: "Aurora Tattoo", q: "The typography, clean lines, and dark mode are beautiful. It feels like a premium utility rather than corporate bloat." },
  ];
  return (
    <section className="py-24 bg-zinc-50/20 dark:bg-zinc-950/10">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fade} className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand">TESTIMONIALS</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Loved by service operators
          </h2>
        </motion.div>
        
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {items.map((t, i) => (
            <motion.div 
              key={t.n} 
              {...fade} 
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 bg-card p-6 shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="mt-4 text-xs sm:text-sm text-foreground leading-relaxed italic">"{t.q}"</p>
              </div>
              
              <div className="mt-6 flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-brand/10 text-brand text-xs font-bold">
                  {t.n.split(" ").map(x => x[0]).join("")}
                </div>
                <div>
                  <div className="text-xs font-bold">{t.n}</div>
                  <div className="text-[10px] text-muted-foreground font-medium">{t.c}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free Forever", price: "$0", desc: "Essential tracking for side-projects.",
      features: ["Up to 100 Leads total", "Core Executive Dashboard", "Standard Follow-Up Alerts", "Kanban Sales Pipeline"],
      cta: "Get Started Free", highlighted: false,
    },
    {
      name: "Pro Workspace", price: "$24", desc: "Advanced performance for active teams.",
      features: ["Unlimited Leads & Database Rows", "Advanced Analytics & Funnels", "Priority Slack Support", "Integrations (Zapier, WhatsApp)", "Custom Pipeline Stages", "Multi-user collaboration"],
      cta: "Start 14-day trial", highlighted: true,
    },
  ];
  return (
    <section id="pricing" className="bg-zinc-50/30 dark:bg-zinc-950/20 py-24 border-t border-zinc-200/60 dark:border-zinc-800/60">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div {...fade} className="mx-auto max-w-2xl text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand">PRICING</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Simple, clean plans.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Start free and scale up as you grow. No hidden setups.</p>
        </motion.div>
        
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <motion.div 
              {...fade} 
              key={p.name}
              className={`relative rounded-xl border p-8 shadow-soft flex flex-col justify-between overflow-hidden ${
                p.highlighted 
                  ? "border-brand bg-card shadow-glow" 
                  : "bg-card border-zinc-200/80 dark:border-zinc-800"
              }`}
            >
              {p.highlighted && (
                <div className="absolute top-0 right-0 rounded-bl-lg bg-brand text-brand-foreground px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider">
                  RECOMMENDED
                </div>
              )}
              
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{p.name}</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-display tracking-tight">{p.price}</span>
                  <span className="text-xs text-muted-foreground font-medium">/ month</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{p.desc}</p>
                
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-xs text-foreground/90">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" /> 
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button asChild size="lg" className={`mt-8 w-full font-semibold rounded-lg ${
                p.highlighted 
                  ? "bg-brand text-brand-foreground hover:bg-brand/95" 
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}>
                <Link to="/signup">{p.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "What is MinOps?", a: "MinOps is a premium minimalist CRM designed to capture leads, track customer follow-ups, and visualize sales pipelines. It strips out the clutter of bloated enterprise CRMs so service-based businesses can focus purely on sales velocity." },
    { q: "Which traffic sources are supported?", a: "You can track inquiries originating from WhatsApp, Instagram, Facebook, website contact forms, and direct phone calls, organizing them under visual tags." },
    { q: "Is there a free tier?", a: "Yes, our Free plan supports tracking up to 100 leads with access to the dashboard, pipeline, and follow-ups. No credit card is required to sign up." },
    { q: "Can I export or import lead logs?", a: "Yes, you can import and export data securely via standard CSV format inside the workspace settings in a few clicks." },
    { q: "How is my customer data protected?", a: "Your workspace is protected with end-to-end SSL/TLS encryption. All authentication uses industry-standard secure JSON Web Tokens, and databases are backed up continuously." },
  ];
  return (
    <section id="faq" className="py-24 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/10 dark:bg-zinc-950/10">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div {...fade} className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand">HELP CENTER</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </motion.div>
        
        <Accordion type="single" collapsible className="mt-12 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-card shadow-soft divide-y overflow-hidden">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`i-${i}`} className="px-6 py-1 border-none hover:bg-muted/10 transition-colors">
              <AccordionTrigger className="text-left text-xs sm:text-sm font-semibold hover:no-underline text-foreground py-4">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FAQTrigger({ children }: { children: React.ReactNode }) {
  return (
    <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline py-4 flex items-center justify-between">
      {children}
      <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 accordion-icon text-muted-foreground" />
    </AccordionTrigger>
  );
}

function CTA() {
  return (
    <section className="pb-24 bg-zinc-50/10 dark:bg-zinc-950/10">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div 
          {...fade} 
          className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 md:p-16 shadow-elevated"
        >
          {/* background glow effect */}
          <div className="absolute inset-0 bg-zinc-950/95 dark:bg-zinc-950" />
          <div className="absolute inset-0 grid-bg opacity-15" />
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-brand/10 blur-[64px]" />
          
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-foreground backdrop-blur">
                <Target className="h-3 w-3" /> Get started today
              </div>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Your next deal is one <br className="hidden sm:block" />
                follow-up away.
              </h3>
              <p className="max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Unlock frictionless sales tracking. Join over 2,500+ businesses running their pipeline at maximum speed on MinOps.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-zinc-950 hover:bg-zinc-200 font-semibold px-6 py-6 h-auto rounded-lg">
                <Link to="/signup">
                  Start Free <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold px-6 py-6 h-auto rounded-lg">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

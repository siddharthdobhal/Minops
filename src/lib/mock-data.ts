export type LeadStatus =
  | "New"
  | "Contacted"
  | "Interested"
  | "Proposal Sent"
  | "Negotiation"
  | "Won"
  | "Lost";

export type LeadSource = "WhatsApp" | "Instagram" | "Facebook" | "Website" | "Phone";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: LeadSource;
  service: string;
  status: LeadStatus;
  value: number;
  followUp: string; // ISO date
  createdAt: string;
  avatar?: string;
  notes: { id: string; author: string; text: string; at: string }[];
  activity: { id: string; type: string; text: string; at: string }[];
}

const names = [
  "Aarav Mehta", "Sofia Rossi", "Liam Carter", "Yuki Tanaka", "Noah Bennett",
  "Maya Patel", "Lucas Silva", "Ella Johansson", "Omar Haddad", "Chloé Dubois",
  "Ethan Wright", "Priya Iyer", "Mateo Garcia", "Hana Kim", "Zara Ahmed",
  "Daniel Brooks", "Anya Petrova", "Kai Nakamura", "Ines Ferreira", "Jonas Weber",
  "Aria Thompson", "Diego Morales", "Leah Cohen", "Theo Laurent", "Naomi Park",
];
const companies = [
  "Loop Studio", "Northwind Co", "Helix Salon", "Forge Gym", "Aurora Tattoo",
  "Bright Academy", "PixelForge", "Vela Agency", "Lumen Health", "Drift Realty",
];
const services = [
  "Premium Membership", "Haircut & Color", "Brand Identity", "Personal Training",
  "Tattoo Sleeve", "SAT Coaching", "Website Redesign", "SEO Retainer",
  "Bridal Package", "Photography Session",
];
const sources: LeadSource[] = ["WhatsApp", "Instagram", "Facebook", "Website", "Phone"];
const statuses: LeadStatus[] = [
  "New", "Contacted", "Interested", "Proposal Sent", "Negotiation", "Won", "Lost",
];

function seeded(i: number, mod: number) {
  return Math.abs(Math.sin(i * 9301 + 49297) * 233280) % mod;
}

export const LEADS: Lead[] = names.map((name, i) => {
  const status = statuses[Math.floor(seeded(i, statuses.length))];
  const source = sources[Math.floor(seeded(i + 1, sources.length))];
  const service = services[Math.floor(seeded(i + 2, services.length))];
  const company = companies[Math.floor(seeded(i + 3, companies.length))];
  const value = 500 + Math.floor(seeded(i + 4, 9500));
  const daysOff = Math.floor(seeded(i + 5, 21)) - 7;
  const followUp = new Date(Date.now() + daysOff * 86400000).toISOString();
  const createdAt = new Date(Date.now() - Math.floor(seeded(i + 6, 60)) * 86400000).toISOString();
  return {
    id: `LEAD-${1000 + i}`,
    name,
    email: name.toLowerCase().replace(/[^a-z]/g, ".") + "@mail.com",
    phone: `+1 (555) ${String(100 + Math.floor(seeded(i + 7, 899))).padStart(3, "0")}-${String(1000 + Math.floor(seeded(i + 8, 8999))).padStart(4, "0")}`,
    company,
    source,
    service,
    status,
    value,
    followUp,
    createdAt,
    notes: [
      { id: "n1", author: "You", text: "Initial inquiry via " + source + ". Asked about pricing.", at: createdAt },
      { id: "n2", author: "You", text: "Sent service brochure and follow-up scheduled.", at: new Date(Date.now() - 86400000 * 2).toISOString() },
    ],
    activity: [
      { id: "a1", type: "created", text: "Lead created from " + source, at: createdAt },
      { id: "a2", type: "contacted", text: "Outbound call made", at: new Date(Date.now() - 86400000 * 5).toISOString() },
      { id: "a3", type: "note", text: "Note added by you", at: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: "a4", type: "status", text: "Status changed to " + status, at: new Date(Date.now() - 86400000).toISOString() },
    ],
  };
});

export const STATUS_COLUMNS: LeadStatus[] = [
  "New", "Contacted", "Interested", "Proposal Sent", "Negotiation", "Won", "Lost",
];

export const STATS = {
  totalLeads: LEADS.length * 24 + 312,
  newLeads: 42,
  followUpsToday: LEADS.filter((l) => {
    const d = new Date(l.followUp);
    const t = new Date();
    return d.toDateString() === t.toDateString();
  }).length || 6,
  wonLeads: LEADS.filter((l) => l.status === "Won").length * 12 + 88,
  lostLeads: LEADS.filter((l) => l.status === "Lost").length * 8 + 21,
  conversion: 34.6,
};

export const MONTHLY_LEADS = [
  { month: "Jan", leads: 120, won: 38 },
  { month: "Feb", leads: 145, won: 52 },
  { month: "Mar", leads: 168, won: 61 },
  { month: "Apr", leads: 154, won: 58 },
  { month: "May", leads: 198, won: 79 },
  { month: "Jun", leads: 232, won: 96 },
  { month: "Jul", leads: 268, won: 112 },
  { month: "Aug", leads: 245, won: 105 },
  { month: "Sep", leads: 289, won: 128 },
  { month: "Oct", leads: 312, won: 142 },
  { month: "Nov", leads: 348, won: 161 },
  { month: "Dec", leads: 392, won: 188 },
];

export const SOURCE_DATA = [
  { name: "WhatsApp", value: 38, color: "oklch(0.72 0.16 155)" },
  { name: "Instagram", value: 26, color: "oklch(0.65 0.22 350)" },
  { name: "Facebook", value: 14, color: "oklch(0.62 0.18 250)" },
  { name: "Website", value: 16, color: "oklch(0.62 0.22 268)" },
  { name: "Phone", value: 6, color: "oklch(0.7 0.14 60)" },
];

export const TRENDS = MONTHLY_LEADS.map((m, i) => ({
  month: m.month,
  conversion: 22 + Math.round(seeded(i, 18)),
  revenue: 8000 + Math.round(seeded(i + 1, 24000)),
}));

export const ACTIVITY_FEED = [
  { id: "f1", type: "won", who: "You", text: "Closed deal with Sofia Rossi for $4,200", at: "2h ago" },
  { id: "f2", type: "created", who: "System", text: "New lead from WhatsApp: Aarav Mehta", at: "3h ago" },
  { id: "f3", type: "followup", who: "You", text: "Completed follow-up with Forge Gym", at: "5h ago" },
  { id: "f4", type: "status", who: "You", text: "Moved Liam Carter to Negotiation", at: "8h ago" },
  { id: "f5", type: "note", who: "You", text: "Added note to Helix Salon", at: "Yesterday" },
  { id: "f6", type: "lost", who: "You", text: "Marked Drift Realty as Lost", at: "Yesterday" },
  { id: "f7", type: "created", who: "System", text: "New lead from Instagram: Maya Patel", at: "2d ago" },
  { id: "f8", type: "won", who: "You", text: "Closed deal with Lumen Health for $7,800", at: "3d ago" },
];

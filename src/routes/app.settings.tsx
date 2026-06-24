import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppTopbar } from "@/components/app/topbar";
import { Card } from "@/routes/app.dashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Briefcase, Bell, Palette, Shield, CreditCard } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — MinOps" }] }),
  component: SettingsPage,
});

const tabs = [
  { id: "profile", label: "Profile", Icon: User },
  { id: "workspace", label: "Workspace", Icon: Briefcase },
  { id: "notifications", label: "Notifications", Icon: Bell },
  { id: "appearance", label: "Appearance", Icon: Palette },
  { id: "security", label: "Security", Icon: Shield },
  { id: "subscription", label: "Subscription", Icon: CreditCard },
] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("profile");
  return (
    <>
      <AppTopbar title="Settings" subtitle="Manage your workspace, account and preferences." />
      <main className="grid gap-6 p-6 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
                tab === t.id ? "bg-accent font-medium text-foreground" : "text-muted-foreground hover:bg-accent/60"
              }`}
            >
              <t.Icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </nav>

        <div className="space-y-6">
          {tab === "profile" && (
            <Card title="Profile" subtitle="Your personal information.">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-lg font-bold text-brand">AM</div>
                <Button variant="outline" size="sm" className="font-semibold">Change photo</Button>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field label="Full name" defaultValue="Alex Morgan" />
                <Field label="Email" type="email" defaultValue="alex@minops.io" />
                <Field label="Role" defaultValue="Founder" />
                <Field label="Phone" defaultValue="+1 555 123 4567" />
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-semibold">Save changes</Button>
              </div>
            </Card>
          )}
          {tab === "workspace" && (
            <Card title="Workspace" subtitle="Your team's shared settings.">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Workspace name" defaultValue="MinOps Demo" />
                <Field label="Subdomain" defaultValue="minops-demo" />
                <Field label="Industry" defaultValue="Agency" />
                <Field label="Team size" defaultValue="5-10" />
              </div>
            </Card>
          )}
          {tab === "notifications" && (
            <Card title="Notifications" subtitle="Choose what you want to hear about.">
              {[
                ["Email — Follow-up reminders", true],
                ["Email — Weekly performance digest", true],
                ["Email — New leads", false],
                ["Push — Status changes", true],
                ["Push — Lost deals", false],
              ].map(([l, v]) => (
                <div key={String(l)} className="flex items-center justify-between border-b py-3 last:border-b-0">
                  <span className="text-sm">{l as string}</span>
                  <Switch defaultChecked={v as boolean} />
                </div>
              ))}
            </Card>
          )}
          {tab === "appearance" && (
            <Card title="Appearance" subtitle="How MinOps looks to you.">
              <div className="grid gap-3 sm:grid-cols-3">
                {["Light", "Dark", "System"].map((t, i) => (
                  <button key={t} className={`group rounded-xl border p-4 text-left cursor-pointer transition-all ${i === 0 ? "ring-2 ring-brand border-transparent" : "border-zinc-200 dark:border-zinc-800"}`}>
                    <div className={`mb-3 h-20 rounded-md ${i === 0 ? "bg-white" : i === 1 ? "bg-zinc-900" : "bg-gradient-to-r from-white to-zinc-900"}`} />
                    <div className="text-sm font-medium">{t}</div>
                  </button>
                ))}
              </div>
            </Card>
          )}
          {tab === "security" && (
            <Card title="Security" subtitle="Protect your account.">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Current password" type="password" />
                <Field label="New password" type="password" />
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="text-sm font-medium">Two-factor authentication</div>
                  <div className="text-xs text-muted-foreground">Add an extra layer of security to your account.</div>
                </div>
                <Switch />
              </div>
            </Card>
          )}
          {tab === "subscription" && (
            <Card title="Subscription" subtitle="Manage your plan and billing.">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/40 p-5">
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Current plan</div>
                  <div className="mt-1 text-2xl font-semibold">Pro · $24/mo</div>
                  <div className="text-xs text-muted-foreground">Renews on Jan 12, 2027</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity font-semibold">Manage billing</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input {...rest} />
    </div>
  );
}

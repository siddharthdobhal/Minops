import { createFileRoute } from "@tanstack/react-router";
import { AppTopbar } from "@/components/app/topbar";
import { ACTIVITY_FEED } from "@/lib/mock-data";
import { Card } from "@/routes/app.dashboard";
import { Trophy, UserPlus, CheckCircle2, ArrowRightLeft, StickyNote, X } from "lucide-react";

export const Route = createFileRoute("/app/activities")({
  head: () => ({ meta: [{ title: "Activities — MinOps" }] }),
  component: ActivitiesPage,
});

const ICON: Record<string, { I: React.ComponentType<{ className?: string }>; c: string }> = {
  won: { I: Trophy, c: "bg-emerald-500/10 text-emerald-500" },
  created: { I: UserPlus, c: "bg-brand/10 text-brand" },
  followup: { I: CheckCircle2, c: "bg-indigo-500/10 text-indigo-500" },
  status: { I: ArrowRightLeft, c: "bg-amber-500/10 text-amber-500" },
  note: { I: StickyNote, c: "bg-zinc-100 dark:bg-zinc-800 text-foreground" },
  lost: { I: X, c: "bg-rose-500/10 text-rose-500" },
};

function ActivitiesPage() {
  return (
    <>
      <AppTopbar title="Activities" subtitle="A live feed of everything happening across your pipeline." />
      <main className="p-6">
        <Card title="Recent activity" subtitle="Last 7 days">
          <ol className="relative space-y-5 border-l border-zinc-200 dark:border-zinc-800 pl-6 mt-3">
            {ACTIVITY_FEED.map((a) => {
              const { I, c } = ICON[a.type] ?? ICON.note;
              return (
                <li key={a.id} className="relative">
                  <span className={`absolute -left-[38px] top-0 grid h-6 w-6 place-items-center rounded-full ring-4 ring-card ${c}`}>
                    <I className="h-3 w-3" />
                  </span>
                  <div className="text-xs sm:text-sm text-foreground"><span className="font-semibold">{a.who}</span> {a.text}</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">{a.at}</div>
                </li>
              );
            })}
          </ol>
        </Card>
      </main>
    </>
  );
}

import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/logo";
import { Check } from "lucide-react";

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10">
        <Logo />
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
        <div className="mx-auto w-full max-w-sm text-center text-xs text-muted-foreground">{footer}</div>
      </div>
      <div className="relative hidden overflow-hidden lg:block bg-zinc-950 border-l border-zinc-200/15">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 via-transparent to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-12 text-zinc-100">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Trusted by 2,500+ teams
            </div>
            <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight tracking-tight text-balance">
              The CRM your team will actually love using.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Capture, track and close leads from WhatsApp, Instagram and more — beautifully.
            </p>
          </div>
          <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-300">
            {["Smart follow-ups that never let a lead go cold",
              "Visual Kanban pipeline built for service teams",
              "Real-time analytics on conversion and revenue"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-white/10 text-white shrink-0">
                  <Check className="h-3 w-3" />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            <Link to="/">← Back to homepage</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

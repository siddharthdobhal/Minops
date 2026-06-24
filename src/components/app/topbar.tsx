import { Bell, Search, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function AppTopbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur">
      <div className="min-w-0">
        <h1 className="truncate text-base font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search leads, deals..."
            className="h-9 w-72 rounded-md border bg-background pl-8 pr-12 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</kbd>
        </div>
        <button
          onClick={() => setDark((d) => !d)}
          className="grid h-9 w-9 place-items-center rounded-md border text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <button className="relative grid h-9 w-9 place-items-center rounded-md border text-muted-foreground hover:bg-accent hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand" />
        </button>
        <div className="ml-1 flex items-center gap-2 rounded-md border bg-background py-1 pl-1 pr-3">
          <div className="grid h-7 w-7 place-items-center rounded-md gradient-brand text-xs font-semibold text-brand-foreground">AM</div>
          <div className="hidden text-left sm:block">
            <div className="text-xs font-medium leading-none">Alex Morgan</div>
            <div className="text-[10px] text-muted-foreground">alex@minops.io</div>
          </div>
        </div>
      </div>
    </header>
  );
}

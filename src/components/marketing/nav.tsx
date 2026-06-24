import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Features", to: "/#features" },
  { label: "Solutions", to: "/#solutions" },
  { label: "Pricing", to: "/#pricing" },
  { label: "Resources", to: "/#faq" },
  { label: "Contact", to: "/#contact" },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "glass" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.to}
                className="text-sm text-muted-foreground transition hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="sm" className="text-sm font-medium">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-soft font-semibold rounded-lg px-4 h-9">
            <Link to="/signup">Start Free</Link>
          </Button>
        </div>
        <button
          className="grid h-9 w-9 place-items-center rounded-md border md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="space-y-1 px-6 py-4">
            {links.map((l) => (
              <a key={l.label} href={l.to} className="block py-2 text-sm" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button asChild variant="outline" size="sm" className="flex-1 rounded-lg">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 bg-primary text-primary-foreground hover:opacity-90 rounded-lg">
                <Link to="/signup">Start Free</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

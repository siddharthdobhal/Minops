import { Logo } from "@/components/brand/logo";
import { Github, Twitter, Linkedin } from "lucide-react";

export function MarketingFooter() {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"] },
    { title: "Resources", links: ["Documentation", "Guides", "API Reference", "Blog", "Community"] },
    { title: "Company", links: ["About", "Customers", "Careers", "Press", "Contact"] },
    { title: "Legal", links: ["Terms", "Privacy", "Security", "DPA", "Cookies"] },
  ];
  return (
    <footer id="contact" className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Manage leads, follow-ups, and your entire pipeline — built for modern service businesses.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Linkedin, Github].map((I, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-md border text-muted-foreground transition hover:bg-accent hover:text-foreground">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} MinOps, Inc. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Start Free — MinOps" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  return (
    <AuthShell
      title="Create your account"
      subtitle="Free forever for up to 100 leads. No credit card."
      footer={<>Already have an account? <Link to="/login" className="font-medium text-foreground hover:underline">Login</Link></>}
    >
      <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/app/dashboard" }); }} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required placeholder="Alex Morgan" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" required placeholder="you@company.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required placeholder="At least 8 characters" />
        </div>
        <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          Create account
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By signing up you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </form>
    </AuthShell>
  );
}

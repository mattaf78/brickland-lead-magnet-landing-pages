import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { loading, session, isAdmin } = useAdminAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!session) return <LoginScreen />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <p>You are signed in as <strong>{session.user.email}</strong> but don't have admin access.</p>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/admin" className="font-semibold">Admin</Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground hidden sm:inline">{session.user.email}</span>
            <Button size="sm" variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate({ to: "/admin" });
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error("Enter email and password first");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/admin" },
    });
    setSubmitting(false);
    if (error) toast.error(error.message);
    else toast.success("Check your email to confirm your account");
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/admin",
    });
    if (result.error) toast.error("Google sign-in failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 border rounded-lg p-6">
        <div>
          <h1 className="text-2xl font-semibold">Admin sign-in</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your landing pages</p>
        </div>
        <Button onClick={handleGoogle} variant="outline" className="w-full">
          Continue with Google
        </Button>
        <div className="relative text-center text-xs text-muted-foreground">
          <span className="bg-background px-2 relative z-10">or</span>
          <div className="absolute inset-x-0 top-1/2 border-t" />
        </div>
        <form onSubmit={handleEmailLogin} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>Sign in</Button>
          <Button type="button" variant="ghost" className="w-full" onClick={handleSignup} disabled={submitting}>
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
}
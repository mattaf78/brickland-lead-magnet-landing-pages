import type { ReactNode } from "react";

export function PosterFrame({
  children,
  className = "",
  tone = "cream",
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "green";
}) {
  const bg = tone === "green" ? "bg-brand-green text-brand-green-foreground" : "bg-panel-cream text-foreground";
  return (
    <div className={`relative ${bg} ${className}`}>
      <div className="pointer-events-none absolute inset-2 border border-brand-brown/40" />
      <div className="pointer-events-none absolute inset-0 border-2 border-brand-green" />
      <div className="relative p-6 sm:p-10">{children}</div>
    </div>
  );
}

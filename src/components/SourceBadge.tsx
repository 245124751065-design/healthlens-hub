import { cn } from "@/lib/utils";
import type { SourceKind } from "@/data/demo";

const styles: Record<SourceKind, string> = {
  "USER PROVIDED": "bg-surface-2 text-navy-soft border-border",
  "AI EXTRACTED": "bg-info-soft text-primary border-primary/20",
  "AI GENERATED": "bg-accent text-accent-foreground border-primary/20",
  "HUMAN VERIFIED": "bg-success-soft text-success border-success/25",
};

export function SourceBadge({ kind, className }: { kind: SourceKind; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wider",
        styles[kind],
        className,
      )}
    >
      {kind}
    </span>
  );
}

export function StatusPill({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const tone =
    status === "Processed" || status === "Verified" || status === "NORMAL" || status === "Human Verified"
      ? "bg-success-soft text-success border-success/25"
      : status === "LOW" || status === "HIGH"
        ? "bg-warning-soft text-warning border-warning/30"
        : status === "Needs Verification" || status === "Needs Review"
          ? "bg-danger-soft text-danger border-danger/25"
          : "bg-surface-2 text-navy-soft border-border";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone,
        className,
      )}
    >
      {status}
    </span>
  );
}

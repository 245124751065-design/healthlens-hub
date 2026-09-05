import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, FileText, ShieldCheck, Info } from "lucide-react";
import { conflicts } from "@/data/demo";
import { StatusPill } from "@/components/SourceBadge";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts & Conflicts — MedLens" },
      {
        name: "description",
        content:
          "Potential inconsistencies between existing patient records and newly uploaded documents, flagged for human verification.",
      },
      { property: "og:title", content: "Alerts & Conflicts — MedLens" },
      {
        property: "og:description",
        content: "Potential information conflicts flagged for human verification.",
      },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Alerts & Conflicts</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          2 potential information conflicts require human verification.
        </p>
      </div>

      <div className="space-y-5">
        {conflicts.map((c) => (
          <section key={c.id} className="panel overflow-hidden">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-warning-soft px-5 py-3.5">
              <div className="flex min-w-0 items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
                <p className="truncate text-xs font-bold tracking-wider text-warning">
                  POTENTIAL INFORMATION CONFLICT
                </p>
              </div>
              <span className="shrink-0 text-xs text-navy-soft">{c.id}</span>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy">{c.patient}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.patientId} · detected {c.detected}
                  </p>
                </div>
                <StatusPill status="Requires Human Verification" />
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface-2/60 p-4">
                  <p className="eyebrow">Patient Record</p>
                  <p className="mt-1.5 text-sm font-semibold text-navy">{c.recordItem}</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-2/60 p-4">
                  <p className="eyebrow">Uploaded Prescription</p>
                  <p className="mt-1.5 text-sm font-semibold text-navy">{c.uploadItem}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border px-4 py-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <FileText className="h-4 w-4 shrink-0 text-primary" />
                  <p className="truncate text-xs text-navy-soft">Source: {c.source}</p>
                </div>
                <button className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                  <ShieldCheck className="h-3.5 w-3.5" /> Send for verification
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-info-soft px-4 py-3.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs leading-relaxed text-navy-soft">
          These entries describe differences observed between stored information and uploaded documents.
          They are not diagnoses or safety assessments. MedLens does not provide diagnosis, treatment
          recommendations, or medication instructions.
        </p>
      </div>
    </div>
  );
}

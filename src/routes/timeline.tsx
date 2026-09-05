import { createFileRoute } from "@tanstack/react-router";
import { timeline, aiSummary } from "@/data/demo";
import { SourceBadge } from "@/components/SourceBadge";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Patient Timeline — MedLens" },
      {
        name: "description",
        content:
          "Chronological record of patient creation, report uploads, AI extraction and human verification events.",
      },
      { property: "og:title", content: "Patient Timeline — MedLens" },
      {
        property: "og:description",
        content: "Every record event in order, from patient creation to human verification.",
      },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Patient Timeline</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ananya Sharma · MRN-10428 — every change is traceable to its source event.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="panel p-5 sm:p-7">
          <ol className="relative space-y-6 before:absolute before:bottom-3 before:left-[13px] before:top-3 before:w-px before:bg-border">
            {timeline.map((t, i) => (
              <li key={t.title} className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                <span
                  className={
                    "relative z-10 mt-1 grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full border-2 bg-surface text-[11px] font-bold " +
                    (i === timeline.length - 1
                      ? "border-success text-success"
                      : "border-primary/40 text-primary")
                  }
                >
                  {i + 1}
                </span>
                <div className="min-w-0 rounded-xl border border-border bg-surface-2/60 px-4 py-3">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <p className="truncate text-sm font-bold text-navy">{t.title}</p>
                    <SourceBadge kind={t.kind} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{t.meta}</p>
                  <p className="mt-1.5 text-[13px] text-navy-soft">{t.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="panel h-fit p-5">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0 text-primary" />
              <h3 className="truncate text-sm font-bold text-navy">AI-Powered Information Summary</h3>
            </div>
            <SourceBadge kind="AI GENERATED" />
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-navy-soft">{aiSummary}</p>
          <p className="mt-4 rounded-lg bg-surface-2 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
            MedLens does not provide diagnosis, treatment recommendations, or medication instructions.
          </p>
        </section>
      </div>
    </div>
  );
}

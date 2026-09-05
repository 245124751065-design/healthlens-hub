import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Pencil, X, FileText, Info } from "lucide-react";
import { extractions, RANGE_NOTE } from "@/data/demo";
import { SourceBadge, StatusPill } from "@/components/SourceBadge";

export const Route = createFileRoute("/verification")({
  head: () => ({
    meta: [
      { title: "Verification Center — MedLens" },
      {
        name: "description",
        content:
          "Review AI-extracted laboratory values with their source page and confidence, then verify, edit or reject each item.",
      },
      { property: "og:title", content: "Verification Center — MedLens" },
      {
        property: "og:description",
        content: "Human review queue for AI-extracted clinical information.",
      },
    ],
  }),
  component: VerificationPage,
});

type Decision = "verified" | "rejected" | undefined;

function VerificationPage() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});
  const pending = extractions.filter((e) => !decisions[e.test]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Verification Center</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {pending.length} extracted items awaiting human review.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {extractions.map((e) => {
          const decision = decisions[e.test];
          return (
            <section key={e.test} className="panel flex flex-col p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-extrabold text-navy">{e.test}</h3>
                  <p className="mt-0.5 text-sm text-navy-soft">
                    {e.value} {e.unit}
                  </p>
                </div>
                <SourceBadge kind={decision === "verified" ? "HUMAN VERIFIED" : "AI EXTRACTED"} />
              </div>

              <dl className="mt-4 space-y-3 border-t border-border pt-4 text-xs">
                <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
                  <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <dd className="truncate text-navy-soft">Blood_Report.pdf — Page {e.page}</dd>
                </div>
                <div>
                  <dt className="eyebrow">AI Confidence</dt>
                  <dd className="mt-1.5 flex items-center gap-2">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${e.confidence}%` }}
                      />
                    </div>
                    <span className="shrink-0 font-semibold text-navy">{e.confidence}%</span>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Reference Range</dt>
                  <dd className="mt-1 font-semibold text-navy">
                    {e.range ?? "Reference range not provided"}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Status</dt>
                  <dd className="mt-1.5">
                    <StatusPill
                      status={
                        decision === "verified"
                          ? "Human Verified"
                          : decision === "rejected"
                            ? "Rejected"
                            : "Pending Verification"
                      }
                    />
                  </dd>
                </div>
              </dl>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <button
                  onClick={() => setDecisions((d) => ({ ...d, [e.test]: "verified" }))}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-2 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <Check className="h-3.5 w-3.5" /> Verify
                </button>
                <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-2 py-2 text-xs font-semibold text-navy-soft hover:bg-surface-2">
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  onClick={() => setDecisions((d) => ({ ...d, [e.test]: "rejected" }))}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-danger/25 bg-danger-soft px-2 py-2 text-xs font-semibold text-danger"
                >
                  <X className="h-3.5 w-3.5" /> Reject
                </button>
              </div>
            </section>
          );
        })}
      </div>

      <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-info-soft px-4 py-3.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs leading-relaxed text-navy-soft">{RANGE_NOTE}</p>
      </div>
    </div>
  );
}

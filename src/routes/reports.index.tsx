import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { reports, RANGE_NOTE } from "@/data/demo";
import { StatusPill } from "@/components/SourceBadge";

export const Route = createFileRoute("/reports/")({
  head: () => ({
    meta: [
      { title: "Medical Reports — MedLens" },
      {
        name: "description",
        content:
          "Every uploaded medical report with its type, date, number of extracted items and processing status.",
      },
      { property: "og:title", content: "Medical Reports — MedLens" },
      {
        property: "og:description",
        content: "Uploaded reports, extracted item counts and review status in one place.",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Medical Reports</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          67 reports processed · extraction is always traceable to a source page.
        </p>
      </div>

      <div className="panel p-4">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-10 w-full rounded-lg border border-border bg-surface-2 pl-9 pr-3 text-sm outline-none focus:border-primary/40 focus:bg-surface"
              placeholder="Search reports, file names, tests..."
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-navy-soft hover:bg-surface-2">
            <SlidersHorizontal className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => (
          <Link
            key={r.id}
            to="/reports/$reportId"
            params={{ reportId: r.id }}
            className="panel block p-5 transition-shadow hover:shadow-lift"
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-info-soft text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-navy">{r.file}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {r.patient} · {r.patientId}
                </p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
              <div>
                <dt className="eyebrow">Type</dt>
                <dd className="mt-1 font-semibold text-navy">{r.type}</dd>
              </div>
              <div>
                <dt className="eyebrow">Date</dt>
                <dd className="mt-1 font-semibold text-navy">{r.date}</dd>
              </div>
              <div>
                <dt className="eyebrow">Extracted Items</dt>
                <dd className="mt-1 font-semibold text-navy">{r.extracted}</dd>
              </div>
              <div>
                <dt className="eyebrow">Pages</dt>
                <dd className="mt-1 font-semibold text-navy">{r.pages}</dd>
              </div>
            </dl>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <StatusPill status={r.status} />
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="rounded-xl border border-border bg-surface-2 px-4 py-3 text-xs text-muted-foreground">
        {RANGE_NOTE}
      </p>
    </div>
  );
}

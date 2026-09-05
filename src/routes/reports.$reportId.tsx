import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, FileText, X, Eye, Info, ShieldCheck } from "lucide-react";
import { reports, extractions, RANGE_NOTE, type Extraction } from "@/data/demo";
import { SourceBadge, StatusPill } from "@/components/SourceBadge";

export const Route = createFileRoute("/reports/$reportId")({
  loader: ({ params }) => {
    const report = reports.find((r) => r.id === params.reportId);
    if (!report) throw notFound();
    return { report };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Report unavailable — MedLens" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.report.file} — Extracted Medical Information | MedLens`;
    const description = `Side-by-side document preview and extracted values for ${loaderData.report.file}, with reference ranges, source pages and AI confidence.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ReportAnalysis,
});

function ReportAnalysis() {
  const { report } = Route.useLoaderData();
  const [page, setPage] = useState(2);
  const [selected, setSelected] = useState<Extraction | null>(null);

  return (
    <div className="space-y-6">
      <Link
        to="/reports"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> All reports
      </Link>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="panel flex flex-col overflow-hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-info-soft text-primary">
                <FileText className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-navy">{report.file}</p>
                <p className="truncate text-xs text-muted-foreground">
                  Report date {report.date} · {report.type}
                </p>
              </div>
            </div>
            <StatusPill status={report.status} />
          </div>

          <div className="bg-surface-2 p-5">
            <div className="mx-auto aspect-[3/4] w-full max-w-[420px] rounded-lg border border-border bg-surface p-6 shadow-card">
              <p className="text-[11px] font-bold tracking-wider text-muted-foreground">
                CITY DIAGNOSTIC LABORATORY
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Patient: {report.patient} · {report.patientId}
              </p>
              <div className="mt-4 border-t border-border pt-3">
                <p className="text-xs font-bold text-navy">HAEMATOLOGY REPORT</p>
                <table className="mt-3 w-full text-[10px] text-navy-soft">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="py-1">Test</th>
                      <th className="py-1">Result</th>
                      <th className="py-1">Ref.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {extractions.map((e) => (
                      <tr key={e.test} className="border-t border-border/70">
                        <td className="py-1.5 pr-2">{e.test}</td>
                        <td className="py-1.5 pr-2 font-semibold">
                          {e.value} {e.unit}
                        </td>
                        <td className="py-1.5">{e.range ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 space-y-1.5">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded-full bg-border"
                      style={{ width: `${90 - i * 9}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-t border-border px-5 py-3.5">
            <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
              <button
                className="rounded-md border border-border px-2 py-1 hover:bg-surface-2"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <span className="whitespace-nowrap">
                Page {page} of {report.pages}
              </span>
              <button
                className="rounded-md border border-border px-2 py-1 hover:bg-surface-2"
                onClick={() => setPage((p) => Math.min(report.pages, p + 1))}
              >
                Next
              </button>
            </div>
            <button
              onClick={() => setSelected(extractions[0])}
              className="inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-info-soft px-3 py-2 text-xs font-semibold text-primary"
            >
              <Eye className="h-3.5 w-3.5" /> View Source
            </button>
          </div>
        </section>

        <section className="panel overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <h3 className="text-sm font-bold text-navy">Extracted Medical Information</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {report.extracted} items extracted from {report.file}
            </p>
          </div>

          <div className="flex items-start gap-2.5 border-b border-border bg-info-soft px-5 py-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-xs leading-relaxed text-navy-soft">{RANGE_NOTE}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="bg-surface-2 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Test Name</th>
                  <th className="px-5 py-3 font-semibold">Value</th>
                  <th className="px-5 py-3 font-semibold">Unit</th>
                  <th className="px-5 py-3 font-semibold">Reference Range</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Source</th>
                  <th className="px-5 py-3 font-semibold">Confidence</th>
                  <th className="px-5 py-3 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {extractions.map((e) => (
                  <tr key={e.test} className="border-t border-border hover:bg-surface-2/60">
                    <td className="px-5 py-3.5 font-semibold text-navy">{e.test}</td>
                    <td className="px-5 py-3.5 font-semibold text-navy">{e.value}</td>
                    <td className="px-5 py-3.5 text-navy-soft">{e.unit}</td>
                    <td className="px-5 py-3.5 text-navy-soft">
                      {e.range ?? (
                        <span className="text-muted-foreground">Reference range not provided</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={e.status === "CANNOT DETERMINE" ? "Cannot determine" : e.status} />
                    </td>
                    <td className="px-5 py-3.5 text-navy-soft">Page {e.page}</td>
                    <td className="px-5 py-3.5 text-navy-soft">{e.confidence}%</td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => setSelected(e)}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        View Source
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {selected && (
        <>
          <div
            className="fixed inset-0 z-40 bg-navy/25"
            onClick={() => setSelected(null)}
            aria-hidden
          />
          <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-[420px] overflow-y-auto border-l border-border bg-surface p-5 shadow-lift">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="eyebrow">Source Panel</p>
                <h3 className="mt-1 truncate text-lg font-extrabold text-navy">{selected.test}</h3>
                <p className="text-sm text-muted-foreground">
                  {selected.value} {selected.unit}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-surface-2"
                aria-label="Close source panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <dl className="mt-6 space-y-4">
              <div>
                <dt className="eyebrow">Source Document</dt>
                <dd className="mt-1 text-sm font-semibold text-navy">{report.file}</dd>
              </div>
              <div>
                <dt className="eyebrow">Page Number</dt>
                <dd className="mt-1 text-sm font-semibold text-navy">Page {selected.page}</dd>
              </div>
              <div>
                <dt className="eyebrow">Original Extracted Text</dt>
                <dd className="mt-1 rounded-lg border border-border bg-surface-2 px-3 py-2.5 font-mono text-xs leading-relaxed text-navy-soft">
                  {selected.originalText}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Source Type</dt>
                <dd className="mt-1.5">
                  <SourceBadge kind="AI EXTRACTED" />
                </dd>
              </div>
              <div>
                <dt className="eyebrow">AI Confidence</dt>
                <dd className="mt-1.5">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${selected.confidence}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs font-semibold text-navy">{selected.confidence}%</p>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Verification Status</dt>
                <dd className="mt-1.5">
                  <StatusPill status={selected.verification} />
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Reference Range</dt>
                <dd className="mt-1 text-sm font-semibold text-navy">
                  {selected.range ?? "Reference range not provided"}
                </dd>
              </div>
            </dl>

            <Link
              to="/verification"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <ShieldCheck className="h-4 w-4" /> Open Verification Center
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{RANGE_NOTE}</p>
          </aside>
        </>
      )}
    </div>
  );
}

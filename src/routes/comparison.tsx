import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, FileText, Info } from "lucide-react";
import { comparisonRows, RANGE_NOTE } from "@/data/demo";

export const Route = createFileRoute("/comparison")({
  head: () => ({
    meta: [
      { title: "Report Comparison — MedLens" },
      {
        name: "description",
        content:
          "Compare a previous and a current medical report side by side and see only the observed numerical changes.",
      },
      { property: "og:title", content: "Report Comparison — MedLens" },
      {
        property: "og:description",
        content: "Observed changes between two reports, without medical conclusions.",
      },
    ],
  }),
  component: ComparisonPage,
});

const docs = [
  { label: "Previous Report", file: "Blood_Report_Aug.pdf", date: "12 Aug 2026" },
  { label: "Current Report", file: "Blood_Report.pdf", date: "02 Sep 2026" },
];

function ComparisonPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Report Comparison</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ananya Sharma · MRN-10428 — observed changes only.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {docs.map((d) => (
          <div key={d.label} className="panel p-5">
            <p className="eyebrow">{d.label}</p>
            <div className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-info-soft text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-navy">{d.file}</p>
                <p className="text-xs text-muted-foreground">{d.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="panel overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h3 className="text-sm font-bold text-navy">Observed Changes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-surface-2 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Test</th>
                <th className="px-5 py-3 font-semibold">Previous</th>
                <th className="px-5 py-3 font-semibold">Current</th>
                <th className="px-5 py-3 font-semibold">Change</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((r) => {
                const down = r.change.startsWith("-");
                return (
                  <tr key={r.test} className="border-t border-border hover:bg-surface-2/60">
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-navy">{r.test}</p>
                      <p className="text-xs text-muted-foreground">{r.unit}</p>
                    </td>
                    <td className="px-5 py-3.5 text-navy-soft">{r.previous}</td>
                    <td className="px-5 py-3.5 font-semibold text-navy">{r.current}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={
                          "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold " +
                          (down
                            ? "border-warning/30 bg-warning-soft text-warning"
                            : "border-primary/20 bg-info-soft text-primary")
                        }
                      >
                        {down ? <ArrowDown className="h-3 w-3" /> : <ArrowUp className="h-3 w-3" />}
                        {r.change}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-start gap-2.5 border-t border-border bg-info-soft px-5 py-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-navy-soft">
            Only observed numerical differences between the two source reports are shown. {RANGE_NOTE}{" "}
            MedLens does not provide diagnosis, treatment recommendations, or medication instructions.
          </p>
        </div>
      </section>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, FileCheck2, Clock, ShieldAlert, Sparkles, ArrowRight, Info } from "lucide-react";
import { patients, reports, aiActivity, DISCLAIMER } from "@/data/demo";
import { StatusPill } from "@/components/SourceBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedLens Dashboard — Clinical Information Intelligence" },
      {
        name: "description",
        content:
          "Overview of patients, processed medical reports, pending verifications and potential information conflicts in your MedLens workspace.",
      },
      { property: "og:title", content: "MedLens Dashboard — Clinical Information Intelligence" },
      {
        property: "og:description",
        content:
          "Patients, reports, verifications and conflicts at a glance in one structured clinical record workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Total Patients", value: "24", icon: Users, note: "+3 this week" },
  { label: "Reports Processed", value: "67", icon: FileCheck2, note: "+11 this week" },
  { label: "Pending Verification", value: "8", icon: Clock, note: "Awaiting human review" },
  { label: "Potential Conflicts", value: "2", icon: ShieldAlert, note: "Requires verification" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Workspace</p>
        <h2 className="mt-1 text-2xl font-extrabold text-navy sm:text-3xl">Good Morning</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Your clinical information workspace at a glance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="panel p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-muted-foreground">{s.label}</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy">{s.value}</p>
              </div>
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-info-soft text-primary">
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="panel overflow-hidden">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4">
            <h3 className="truncate text-sm font-bold text-navy">Recent Patients</h3>
            <Link to="/patients" className="text-xs font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="bg-surface-2 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-semibold">Patient</th>
                  <th className="px-5 py-3 font-semibold">Patient ID</th>
                  <th className="px-5 py-3 font-semibold">Age</th>
                  <th className="px-5 py-3 font-semibold">Last Report</th>
                  <th className="px-5 py-3 font-semibold">Reports</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-surface-2/60">
                    <td className="px-5 py-3.5 font-semibold text-navy">{p.name}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{p.id}</td>
                    <td className="px-5 py-3.5 text-navy-soft">{p.age}</td>
                    <td className="px-5 py-3.5 text-navy-soft">{p.lastReport}</td>
                    <td className="px-5 py-3.5 text-navy-soft">{p.reports}</td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={p.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <Link
                        to="/patients/$patientId"
                        params={{ patientId: p.id }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        View <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-6">
          <section className="panel p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-navy">AI Activity</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {aiActivity.map((a) => (
                <li key={a} className="flex items-start gap-3 rounded-lg bg-surface-2 px-3 py-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-[13px] text-navy-soft">{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-primary/20 bg-info-soft p-4">
            <div className="flex items-start gap-2.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-bold tracking-wide text-primary">RESPONSIBLE AI NOTICE</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy-soft">{DISCLAIMER}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="panel overflow-hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4">
          <h3 className="truncate text-sm font-bold text-navy">Recent Medical Reports</h3>
          <Link to="/reports" className="text-xs font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="bg-surface-2 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Report</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Extracted Items</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-t border-border hover:bg-surface-2/60">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-navy">{r.file}</p>
                    <p className="text-xs text-muted-foreground">{r.patient}</p>
                  </td>
                  <td className="px-5 py-3.5 text-navy-soft">{r.type}</td>
                  <td className="px-5 py-3.5 text-navy-soft">{r.date}</td>
                  <td className="px-5 py-3.5 text-navy-soft">{r.extracted} items</td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={r.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      to="/reports/$reportId"
                      params={{ reportId: r.id }}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      Open <ArrowRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

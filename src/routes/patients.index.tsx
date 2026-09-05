import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, UserPlus, ArrowRight } from "lucide-react";
import { patients } from "@/data/demo";
import { StatusPill } from "@/components/SourceBadge";

export const Route = createFileRoute("/patients/")({
  head: () => ({
    meta: [
      { title: "Patients — MedLens Clinical Records" },
      {
        name: "description",
        content:
          "Browse and manage structured patient records, report counts and verification status across your MedLens workspace.",
      },
      { property: "og:title", content: "Patients — MedLens Clinical Records" },
      {
        property: "og:description",
        content: "Search, filter and open structured patient records with verification status.",
      },
    ],
  }),
  component: PatientsPage,
});

function PatientsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-extrabold text-navy sm:text-2xl">Patient Records</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            24 patients · structured, traceable and reviewable.
          </p>
        </div>
        <button className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <UserPlus className="h-4 w-4" /> Add Patient
        </button>
      </div>

      <div className="panel p-4">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-10 w-full rounded-lg border border-border bg-surface-2 pl-9 pr-3 text-sm outline-none focus:border-primary/40 focus:bg-surface"
              placeholder="Search by name or patient ID..."
            />
          </div>
          <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-navy-soft transition-colors hover:bg-surface-2">
            <SlidersHorizontal className="h-4 w-4" /> Filter
          </button>
        </div>
      </div>

      <section className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-sm">
            <thead>
              <tr className="bg-surface-2 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Patient ID</th>
                <th className="px-5 py-3 font-semibold">Age</th>
                <th className="px-5 py-3 font-semibold">Sex</th>
                <th className="px-5 py-3 font-semibold">Reports</th>
                <th className="px-5 py-3 font-semibold">Last Updated</th>
                <th className="px-5 py-3 font-semibold">Verification Status</th>
                <th className="px-5 py-3 font-semibold">View</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-surface-2/60">
                  <td className="px-5 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground">
                        {p.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <span className="truncate font-semibold text-navy">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{p.id}</td>
                  <td className="px-5 py-3.5 text-navy-soft">{p.age}</td>
                  <td className="px-5 py-3.5 text-navy-soft">{p.sex}</td>
                  <td className="px-5 py-3.5 text-navy-soft">{p.reports}</td>
                  <td className="px-5 py-3.5 text-navy-soft">{p.lastUpdated}</td>
                  <td className="px-5 py-3.5">
                    <StatusPill status={p.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      to="/patients/$patientId"
                      params={{ patientId: p.id }}
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

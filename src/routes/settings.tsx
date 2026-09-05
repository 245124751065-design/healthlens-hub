import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { DISCLAIMER } from "@/data/demo";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — MedLens Workspace" },
      {
        name: "description",
        content:
          "Manage your MedLens clinician profile, extraction preferences, verification rules and responsible AI settings.",
      },
      { property: "og:title", content: "Settings — MedLens Workspace" },
      {
        property: "og:description",
        content: "Profile, extraction, verification and responsible AI preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

const toggles = [
  {
    label: "Require human verification for every AI-extracted value",
    detail: "Values stay marked pending until a clinician confirms them.",
    on: true,
  },
  {
    label: "Flag missing reference ranges",
    detail: "Show “Reference range not provided” instead of inferring a range.",
    on: true,
  },
  {
    label: "Detect potential information conflicts",
    detail: "Compare uploads against stored allergies and medications.",
    on: true,
  },
  {
    label: "Show AI confidence on every extracted item",
    detail: "Display the model's confidence next to each value.",
    on: false,
  },
];

function SettingsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-extrabold text-navy sm:text-2xl">Settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Workspace preferences for extraction, verification and traceability.
        </p>
      </div>

      <section className="panel p-5 sm:p-6">
        <h3 className="text-sm font-bold text-navy">Clinician Profile</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ["Full name", "Dr. Nandini Rao"],
            ["Specialty", "Internal Medicine"],
            ["Email", "n.rao@medlens.health"],
            ["Registration ID", "MED-448210"],
          ].map(([label, value]) => (
            <label key={label} className="block">
              <span className="eyebrow">{label}</span>
              <input
                defaultValue={value}
                className="mt-1.5 h-10 w-full rounded-lg border border-border bg-surface-2 px-3 text-sm text-navy outline-none focus:border-primary/40 focus:bg-surface"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="panel p-5 sm:p-6">
        <h3 className="text-sm font-bold text-navy">Extraction & Verification</h3>
        <ul className="mt-4 space-y-3">
          {toggles.map((t) => (
            <li
              key={t.label}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-border bg-surface-2/60 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-navy">{t.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.detail}</p>
              </div>
              <span
                className={
                  "relative h-6 w-11 shrink-0 rounded-full transition-colors " +
                  (t.on ? "bg-primary" : "bg-border")
                }
              >
                <span
                  className={
                    "absolute top-0.5 h-5 w-5 rounded-full bg-surface shadow-sm transition-all " +
                    (t.on ? "left-[22px]" : "left-0.5")
                  }
                />
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-info-soft px-4 py-3.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs leading-relaxed text-navy-soft">{DISCLAIMER}</p>
      </div>
    </div>
  );
}

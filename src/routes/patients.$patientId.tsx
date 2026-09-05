import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, HeartPulse, Pill, AlertTriangle, Stethoscope, NotebookPen } from "lucide-react";
import { patients, aiSummary, type Fact } from "@/data/demo";
import { SourceBadge, StatusPill } from "@/components/SourceBadge";

export const Route = createFileRoute("/patients/$patientId")({
  loader: ({ params }) => {
    const patient = patients.find((p) => p.id === params.patientId);
    if (!patient) throw notFound();
    return { patient };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Patient unavailable — MedLens" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.patient.name} (${loaderData.patient.id}) — MedLens Patient Record`;
    const description = `Structured record for ${loaderData.patient.name}: symptoms, conditions, allergies and medications with source and verification badges.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PatientProfile,
});

const cards: { title: string; key: keyof typeof groupIcons; field: "symptoms" | "conditions" | "allergies" | "medications" | "other" }[] = [
  { title: "Symptoms", key: "symptoms", field: "symptoms" },
  { title: "Existing Conditions", key: "conditions", field: "conditions" },
  { title: "Allergies", key: "allergies", field: "allergies" },
  { title: "Medications", key: "medications", field: "medications" },
  { title: "Other Information", key: "other", field: "other" },
];

const groupIcons = {
  symptoms: Stethoscope,
  conditions: HeartPulse,
  allergies: AlertTriangle,
  medications: Pill,
  other: NotebookPen,
};

function FactRow({ fact }: { fact: Fact }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 rounded-lg border border-border bg-surface-2/60 px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-navy">{fact.label}</p>
        {fact.detail && <p className="mt-0.5 text-xs text-muted-foreground">{fact.detail}</p>}
      </div>
      <SourceBadge kind={fact.source} />
    </li>
  );
}

function PatientProfile() {
  const { patient } = Route.useLoaderData();

  return (
    <div className="space-y-6">
      <Link
        to="/patients"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> All patients
      </Link>

      <section className="panel p-5 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-base font-extrabold text-accent-foreground">
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-xl font-extrabold text-navy sm:text-2xl">{patient.name}</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {patient.id} · {patient.reports} reports
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={patient.status} />
            <Link
              to="/timeline"
              className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-navy-soft hover:bg-surface-2"
            >
              View timeline
            </Link>
          </div>
        </div>

        <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Age", `${patient.age} years`],
            ["Sex", patient.sex],
            ["Date of Birth", patient.dob],
            ["Last Report", patient.lastReport],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow">{k}</dt>
              <dd className="mt-1 text-sm font-semibold text-navy">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map((c) => {
            const Icon = groupIcons[c.key];
            const facts = patient[c.field];
            return (
              <section key={c.title} className="panel p-5">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-navy">{c.title}</h3>
                </div>
                <ul className="mt-3.5 space-y-2">
                  {facts.map((f) => (
                    <FactRow key={f.label} fact={f} />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

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

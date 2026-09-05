import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { UploadCloud, FileText, Check, Loader2, Info } from "lucide-react";
import { DISCLAIMER } from "@/data/demo";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Medical Report — MedLens" },
      {
        name: "description",
        content:
          "Drag and drop a PDF, JPG or PNG medical report and watch it become a structured, source-linked record ready for verification.",
      },
      { property: "og:title", content: "Upload Medical Report — MedLens" },
      {
        property: "og:description",
        content: "Transform medical documents into structured information.",
      },
    ],
  }),
  component: UploadPage,
});

const steps = [
  "Uploading",
  "Reading Document",
  "Extracting Information",
  "Detecting Reference Ranges",
  "Structuring Record",
  "Ready for Verification",
];

function UploadPage() {
  const [file, setFile] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file || step >= steps.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 1300);
    return () => clearTimeout(t);
  }, [file, step]);

  function start(name: string) {
    setFile(name);
    setStep(0);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Upload Medical Report</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Transform medical documents into structured information.
        </p>
      </div>

      {!file ? (
        <section
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            start(e.dataTransfer.files?.[0]?.name ?? "Blood_Report.pdf");
          }}
          className={
            "panel flex flex-col items-center justify-center px-6 py-16 text-center transition-colors " +
            (dragging ? "border-primary bg-info-soft" : "")
          }
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-info-soft text-primary">
            <UploadCloud className="h-7 w-7" />
          </div>
          <p className="mt-5 text-base font-bold text-navy">Drag & drop your report here</p>
          <p className="mt-1.5 text-sm text-muted-foreground">PDF, JPG or PNG</p>
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Browse Files
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => start(e.target.files?.[0]?.name ?? "Blood_Report.pdf")}
          />
        </section>
      ) : (
        <section className="panel p-6">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-surface-2/60 px-4 py-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-info-soft text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-navy">{file}</p>
              <p className="text-xs text-muted-foreground">
                {step === steps.length - 1 ? "Processing complete" : steps[step] + "..."}
              </p>
            </div>
            <span className="shrink-0 text-xs font-semibold text-primary">
              {Math.round(((step + 1) / steps.length) * 100)}%
            </span>
          </div>

          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
              style={{ width: `${((step + 1) / steps.length) * 100}%` }}
            />
          </div>

          <ol className="mt-6 space-y-2">
            {steps.map((s, i) => {
              const done = i < step || step === steps.length - 1;
              const active = i === step && step !== steps.length - 1;
              return (
                <li
                  key={s}
                  className={
                    "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border px-4 py-3 transition-colors " +
                    (done
                      ? "border-success/25 bg-success-soft"
                      : active
                        ? "border-primary/25 bg-info-soft"
                        : "border-border bg-surface")
                  }
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-current/20 bg-surface">
                    {done ? (
                      <Check className="h-3.5 w-3.5 text-success" />
                    ) : active ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-border" />
                    )}
                  </span>
                  <span
                    className={
                      "truncate text-sm font-medium " +
                      (done ? "text-success" : active ? "text-primary" : "text-muted-foreground")
                    }
                  >
                    {s}
                  </span>
                </li>
              );
            })}
          </ol>

          {step === steps.length - 1 && (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                to="/reports/$reportId"
                params={{ reportId: "RPT-2091" }}
                className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Review extracted information
              </Link>
              <Link
                to="/verification"
                className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-navy-soft hover:bg-surface-2"
              >
                Open Verification Center
              </Link>
            </div>
          )}
        </section>
      )}

      <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-info-soft px-4 py-3.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-xs leading-relaxed text-navy-soft">{DISCLAIMER}</p>
      </div>
    </div>
  );
}

import { describe, expect, it } from "vitest";
import {
  DISCLAIMER,
  RANGE_NOTE,
  comparisonRows,
  conflicts,
  extractions,
  patients,
  reports,
  timeline,
} from "./demo";

describe("patients demo data", () => {
  it("has unique record ids", () => {
    const ids = patients.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every fact a traceable source", () => {
    const allowed = ["USER PROVIDED", "AI EXTRACTED", "AI GENERATED", "HUMAN VERIFIED"];
    for (const p of patients) {
      const facts = [...p.symptoms, ...p.conditions, ...p.allergies, ...p.medications, ...p.other];
      expect(facts.length).toBeGreaterThan(0);
      for (const fact of facts) {
        expect(fact.label.trim()).not.toBe("");
        expect(allowed).toContain(fact.source);
      }
    }
  });
});

describe("reports demo data", () => {
  it("links every report to an existing patient", () => {
    const ids = new Set(patients.map((p) => p.id));
    for (const r of reports) {
      expect(ids.has(r.patientId)).toBe(true);
      expect(r.pages).toBeGreaterThan(0);
      expect(r.extracted).toBeGreaterThan(0);
    }
  });
});

describe("extraction statuses", () => {
  it("never states a status when the source report has no reference range", () => {
    for (const e of extractions) {
      if (e.range === null) expect(e.status).toBe("CANNOT DETERMINE");
      else expect(e.status).not.toBe("CANNOT DETERMINE");
    }
  });

  it("keeps confidence within 0-100 and records the original text", () => {
    for (const e of extractions) {
      expect(e.confidence).toBeGreaterThanOrEqual(0);
      expect(e.confidence).toBeLessThanOrEqual(100);
      expect(e.originalText).toContain(e.value);
      expect(e.page).toBeGreaterThan(0);
    }
  });

  it("flags out-of-range values consistently with the stated range", () => {
    for (const e of extractions) {
      if (!e.range) continue;
      const [low, high] = e.range.split(/[–-]/).map((n) => Number(n.trim()));
      const value = Number(e.value);
      if (!Number.isFinite(value) || !Number.isFinite(low) || !Number.isFinite(high)) continue;
      const expected = value < low! ? "LOW" : value > high! ? "HIGH" : "NORMAL";
      expect(e.status).toBe(expected);
    }
  });
});

describe("comparison rows", () => {
  it("reports a change that matches current minus previous", () => {
    for (const row of comparisonRows) {
      const delta = Number(row.current) - Number(row.previous);
      expect(Number(row.change)).toBeCloseTo(delta, 2);
    }
  });
});

describe("conflicts and timeline", () => {
  it("names both sides of each conflict plus its source document", () => {
    for (const c of conflicts) {
      expect(c.recordItem).toBeTruthy();
      expect(c.uploadItem).toBeTruthy();
      expect(c.source).toMatch(/Page/i);
    }
  });

  it("labels each timeline entry with a source kind", () => {
    expect(timeline.length).toBeGreaterThan(0);
    for (const entry of timeline) expect(entry.kind).toBeTruthy();
  });
});

describe("responsible AI copy", () => {
  it("rules out diagnosis and treatment recommendations", () => {
    expect(DISCLAIMER.toLowerCase()).toContain("does not provide medical diagnosis");
    expect(RANGE_NOTE.toLowerCase()).toContain("reference range provided in the source report");
  });
});

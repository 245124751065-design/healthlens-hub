import { describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, within } from "@testing-library/react";
import { renderRoute } from "@/test/render-route";
import { comparisonRows, conflicts, patients, reports, timeline } from "@/data/demo";

describe("dashboard", () => {
  it("shows the workspace greeting and both recent tables", async () => {
    await renderRoute("/");
    expect(screen.getByRole("heading", { name: /good morning/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /recent patients/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /recent medical reports/i })).toBeInTheDocument();
  });

  it("keeps the responsible AI notice visible", async () => {
    await renderRoute("/");
    expect(screen.getByText(/responsible ai notice/i)).toBeInTheDocument();
    expect(screen.getByText(/does not provide medical diagnosis/i)).toBeInTheDocument();
  });
});

describe("patients list", () => {
  it("lists every patient record", async () => {
    await renderRoute("/patients");
    for (const p of patients) expect(screen.getByText(p.name)).toBeInTheDocument();
  });

  it("filters by name", async () => {
    const user = userEvent.setup();
    await renderRoute("/patients");
    await user.type(screen.getByPlaceholderText(/search by name or patient id/i), "Fatima");
    expect(screen.getByText("Fatima Khan")).toBeInTheDocument();
    expect(screen.queryByText("Rahul Mehta")).not.toBeInTheDocument();
  });

  it("filters by patient id", async () => {
    const user = userEvent.setup();
    await renderRoute("/patients");
    await user.type(screen.getByPlaceholderText(/search by name or patient id/i), "MRN-10391");
    expect(screen.getByText("Rahul Mehta")).toBeInTheDocument();
    expect(screen.queryByText("Ananya Sharma")).not.toBeInTheDocument();
  });
});

describe("patient profile", () => {
  it("opens the requested patient with their information summary", async () => {
    const patient = patients[0]!;
    await renderRoute(`/patients/${patient.id}`);
    expect(screen.getByRole("heading", { name: patient.name })).toBeInTheDocument();
    expect(screen.getByText(/ai-powered information summary/i)).toBeInTheDocument();
    expect(screen.getAllByText(patient.symptoms[0]!.label).length).toBeGreaterThan(0);
  });
});

describe("reports", () => {
  it("lists reports and filters them by search", async () => {
    const user = userEvent.setup();
    await renderRoute("/reports");
    for (const r of reports) expect(screen.getByText(r.file)).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText(/search reports/i), "MRI");
    expect(screen.getByText("MRI_Brain_Summary.pdf")).toBeInTheDocument();
    expect(screen.queryByText("Prescription.pdf")).not.toBeInTheDocument();
  });

  it("opens a single report analysis view", async () => {
    await renderRoute("/reports/RPT-2091");
    expect(screen.getAllByText(/Blood_Report\.pdf/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Hemoglobin/).length).toBeGreaterThan(0);
  });
});

describe("comparison", () => {
  it("shows both documents and every observed change", async () => {
    await renderRoute("/comparison");
    expect(screen.getByText("Blood_Report_Aug.pdf")).toBeInTheDocument();
    expect(screen.getByText("Blood_Report.pdf")).toBeInTheDocument();
    const table = screen.getByRole("table");
    for (const row of comparisonRows) {
      expect(within(table).getByText(row.test)).toBeInTheDocument();
    }
  });
});

describe("timeline", () => {
  it("renders each recorded event", async () => {
    await renderRoute("/timeline");
    for (const entry of timeline) expect(screen.getByText(entry.title)).toBeInTheDocument();
  });
});

describe("alerts and conflicts", () => {
  it("shows each conflict with both sides of the information", async () => {
    await renderRoute("/alerts");
    for (const c of conflicts) {
      expect(screen.getByText(c.recordItem)).toBeInTheDocument();
      expect(screen.getByText(c.uploadItem)).toBeInTheDocument();
    }
  });
});

describe("settings", () => {
  it("shows profile and extraction preferences", async () => {
    await renderRoute("/settings");
    expect(screen.getByRole("heading", { name: /clinician profile/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /extraction & verification/i })).toBeInTheDocument();
  });
});

describe("unknown routes", () => {
  it("shows the not found page", async () => {
    await renderRoute("/does-not-exist");
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});

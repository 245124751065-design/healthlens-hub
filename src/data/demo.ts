export type SourceKind =
  | "USER PROVIDED"
  | "AI EXTRACTED"
  | "AI GENERATED"
  | "HUMAN VERIFIED";

export type Fact = {
  label: string;
  detail?: string;
  source: SourceKind;
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  sex: "Male" | "Female";
  dob: string;
  reports: number;
  lastReport: string;
  lastUpdated: string;
  status: "Verified" | "Pending Verification" | "Needs Review";
  symptoms: Fact[];
  conditions: Fact[];
  allergies: Fact[];
  medications: Fact[];
  other: Fact[];
};

export const patients: Patient[] = [
  {
    id: "MRN-10428",
    name: "Ananya Sharma",
    age: 34,
    sex: "Female",
    dob: "12 Mar 1992",
    reports: 5,
    lastReport: "02 Sep 2026",
    lastUpdated: "2 hours ago",
    status: "Pending Verification",
    symptoms: [
      { label: "Fatigue", detail: "Reported for 3 weeks", source: "USER PROVIDED" },
      { label: "Shortness of breath on exertion", source: "AI EXTRACTED" },
    ],
    conditions: [
      { label: "Iron deficiency anaemia", detail: "Noted in 2024 record", source: "AI EXTRACTED" },
      { label: "Hypothyroidism", source: "HUMAN VERIFIED" },
    ],
    allergies: [{ label: "Penicillin", detail: "Rash, reported by patient", source: "USER PROVIDED" }],
    medications: [
      { label: "Levothyroxine 50 mcg", detail: "Once daily", source: "AI EXTRACTED" },
      { label: "Ferrous ascorbate", detail: "Prescription.pdf, page 1", source: "AI EXTRACTED" },
    ],
    other: [
      { label: "Non-smoker", source: "USER PROVIDED" },
      {
        label: "Latest report contains 12 laboratory measurements",
        source: "AI GENERATED",
      },
    ],
  },
  {
    id: "MRN-10391",
    name: "Rahul Mehta",
    age: 47,
    sex: "Male",
    dob: "04 Jul 1979",
    reports: 8,
    lastReport: "01 Sep 2026",
    lastUpdated: "Yesterday",
    status: "Verified",
    symptoms: [{ label: "Occasional chest tightness", source: "USER PROVIDED" }],
    conditions: [{ label: "Type 2 diabetes mellitus", source: "HUMAN VERIFIED" }],
    allergies: [{ label: "No known allergies", source: "USER PROVIDED" }],
    medications: [{ label: "Metformin 500 mg", detail: "Twice daily", source: "HUMAN VERIFIED" }],
    other: [{ label: "Family history of hypertension", source: "USER PROVIDED" }],
  },
  {
    id: "MRN-10377",
    name: "Fatima Khan",
    age: 29,
    sex: "Female",
    dob: "21 Jan 1997",
    reports: 3,
    lastReport: "30 Aug 2026",
    lastUpdated: "3 days ago",
    status: "Needs Review",
    symptoms: [{ label: "Recurrent headaches", source: "AI EXTRACTED" }],
    conditions: [{ label: "Migraine", source: "AI EXTRACTED" }],
    allergies: [{ label: "Sulfa drugs", source: "USER PROVIDED" }],
    medications: [{ label: "Propranolol 20 mg", source: "AI EXTRACTED" }],
    other: [{ label: "Reference range absent for 2 tests", source: "AI GENERATED" }],
  },
  {
    id: "MRN-10322",
    name: "Joseph Abraham",
    age: 62,
    sex: "Male",
    dob: "09 Nov 1963",
    reports: 11,
    lastReport: "28 Aug 2026",
    lastUpdated: "5 days ago",
    status: "Verified",
    symptoms: [{ label: "Knee stiffness", source: "USER PROVIDED" }],
    conditions: [{ label: "Osteoarthritis", source: "HUMAN VERIFIED" }],
    allergies: [{ label: "No known allergies", source: "USER PROVIDED" }],
    medications: [{ label: "Calcium + Vitamin D3", source: "AI EXTRACTED" }],
    other: [{ label: "Retired teacher", source: "USER PROVIDED" }],
  },
  {
    id: "MRN-10298",
    name: "Meera Iyer",
    age: 41,
    sex: "Female",
    dob: "17 Jun 1985",
    reports: 6,
    lastReport: "26 Aug 2026",
    lastUpdated: "1 week ago",
    status: "Pending Verification",
    symptoms: [{ label: "Dizziness in the morning", source: "USER PROVIDED" }],
    conditions: [{ label: "Anaemia, under evaluation", source: "AI EXTRACTED" }],
    allergies: [{ label: "Dust", source: "USER PROVIDED" }],
    medications: [{ label: "Folic acid 5 mg", source: "AI EXTRACTED" }],
    other: [{ label: "Vegetarian diet", source: "USER PROVIDED" }],
  },
];

export type ReportStatus = "Processed" | "Pending Review" | "Needs Verification";

export type Report = {
  id: string;
  file: string;
  patient: string;
  patientId: string;
  type: string;
  date: string;
  pages: number;
  extracted: number;
  status: ReportStatus;
};

export const reports: Report[] = [
  {
    id: "RPT-2091",
    file: "Blood_Report.pdf",
    patient: "Ananya Sharma",
    patientId: "MRN-10428",
    type: "Laboratory — CBC",
    date: "02 Sep 2026",
    pages: 3,
    extracted: 12,
    status: "Needs Verification",
  },
  {
    id: "RPT-2088",
    file: "Prescription.pdf",
    patient: "Ananya Sharma",
    patientId: "MRN-10428",
    type: "Prescription",
    date: "31 Aug 2026",
    pages: 1,
    extracted: 4,
    status: "Pending Review",
  },
  {
    id: "RPT-2081",
    file: "HbA1c_Panel.pdf",
    patient: "Rahul Mehta",
    patientId: "MRN-10391",
    type: "Laboratory — Metabolic",
    date: "01 Sep 2026",
    pages: 2,
    extracted: 7,
    status: "Processed",
  },
  {
    id: "RPT-2075",
    file: "MRI_Brain_Summary.pdf",
    patient: "Fatima Khan",
    patientId: "MRN-10377",
    type: "Radiology",
    date: "30 Aug 2026",
    pages: 4,
    extracted: 5,
    status: "Pending Review",
  },
  {
    id: "RPT-2064",
    file: "Vitamin_Panel.jpg",
    patient: "Meera Iyer",
    patientId: "MRN-10298",
    type: "Laboratory — Vitamins",
    date: "26 Aug 2026",
    pages: 1,
    extracted: 6,
    status: "Processed",
  },
];

export type Extraction = {
  test: string;
  value: string;
  unit: string;
  range: string | null;
  status: "LOW" | "HIGH" | "NORMAL" | "CANNOT DETERMINE";
  page: number;
  confidence: number;
  originalText: string;
  verification: "Pending Verification" | "Human Verified";
};

export const extractions: Extraction[] = [
  {
    test: "Hemoglobin",
    value: "12.1",
    unit: "g/dL",
    range: "13–17",
    status: "LOW",
    page: 2,
    confidence: 96,
    originalText: "HAEMOGLOBIN (Hb) .......... 12.1 g/dL    Ref: 13 - 17 g/dL",
    verification: "Pending Verification",
  },
  {
    test: "Glucose (Fasting)",
    value: "108",
    unit: "mg/dL",
    range: "70–110",
    status: "NORMAL",
    page: 2,
    confidence: 98,
    originalText: "GLUCOSE FASTING 108 mg/dL (70 - 110)",
    verification: "Pending Verification",
  },
  {
    test: "Platelet Count",
    value: "250",
    unit: "thousand/uL",
    range: "150–450",
    status: "NORMAL",
    page: 2,
    confidence: 97,
    originalText: "PLATELET COUNT 250 thousand/uL   150-450",
    verification: "Human Verified",
  },
  {
    test: "Total WBC Count",
    value: "7.4",
    unit: "thousand/uL",
    range: "4.0–11.0",
    status: "NORMAL",
    page: 2,
    confidence: 95,
    originalText: "TOTAL WBC 7.4 thousand/uL  4.0 - 11.0",
    verification: "Pending Verification",
  },
  {
    test: "Serum Ferritin",
    value: "9",
    unit: "ng/mL",
    range: null,
    status: "CANNOT DETERMINE",
    page: 3,
    confidence: 88,
    originalText: "FERRITIN  9 ng/mL",
    verification: "Pending Verification",
  },
];

export const comparisonRows = [
  { test: "Hemoglobin", unit: "g/dL", previous: "12.8", current: "12.1", change: "-0.7" },
  { test: "Glucose (Fasting)", unit: "mg/dL", previous: "101", current: "108", change: "+7" },
  { test: "Platelet Count", unit: "thousand/uL", previous: "240", current: "250", change: "+10" },
  { test: "Total WBC Count", unit: "thousand/uL", previous: "7.1", current: "7.4", change: "+0.3" },
  { test: "Serum Ferritin", unit: "ng/mL", previous: "11", current: "9", change: "-2" },
];

export const timeline = [
  { title: "Patient Created", meta: "18 Jun 2026 · 10:12", detail: "Record created by Dr. N. Rao", kind: "USER PROVIDED" as SourceKind },
  { title: "Previous Report Uploaded", meta: "12 Aug 2026 · 09:40", detail: "Blood_Report_Aug.pdf · 3 pages", kind: "USER PROVIDED" as SourceKind },
  { title: "Prescription Uploaded", meta: "31 Aug 2026 · 16:05", detail: "Prescription.pdf · 1 page", kind: "USER PROVIDED" as SourceKind },
  { title: "Current Report Uploaded", meta: "02 Sep 2026 · 08:22", detail: "Blood_Report.pdf · 3 pages", kind: "USER PROVIDED" as SourceKind },
  { title: "AI Extraction", meta: "02 Sep 2026 · 08:23", detail: "12 laboratory values, 8 reference ranges detected", kind: "AI EXTRACTED" as SourceKind },
  { title: "Human Verification", meta: "02 Sep 2026 · 11:47", detail: "4 of 12 items verified by Dr. N. Rao", kind: "HUMAN VERIFIED" as SourceKind },
];

export const aiActivity = [
  "12 laboratory values extracted",
  "8 reference ranges detected",
  "2 potential conflicts identified",
  "5 reports ready for verification",
];

export const conflicts = [
  {
    id: "CFL-014",
    patient: "Ananya Sharma",
    patientId: "MRN-10428",
    recordItem: "Allergy — Penicillin",
    uploadItem: "Medication — Amoxicillin",
    source: "Prescription.pdf — Page 1",
    detected: "31 Aug 2026 · 16:06",
  },
  {
    id: "CFL-011",
    patient: "Meera Iyer",
    patientId: "MRN-10298",
    recordItem: "Medication list — Folic acid 5 mg",
    uploadItem: "Medication — Folic acid 1 mg",
    source: "Vitamin_Panel.jpg — Page 1",
    detected: "26 Aug 2026 · 12:31",
  },
];

export const aiSummary =
  "The latest uploaded report contains several laboratory measurements. Hemoglobin is below the reference range stated in the report, while glucose and platelet values fall within their reported ranges. One measurement, serum ferritin, has no reference range in the source document, so its status cannot be determined.";

export const DISCLAIMER =
  "MedLens organizes and explains available medical information. It does not provide medical diagnosis or treatment recommendations.";

export const RANGE_NOTE =
  "Status is determined only using the reference range provided in the source report.";

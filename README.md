# MedLens AI

Create a premium, modern healthcare SaaS frontend called “MedLens — AI-Powered Clinical Information Intelligence”.

MedLens helps organize fragmented patient information, medical reports, prescriptions, and previous records into one structured, understandable, traceable, and reviewable patient record.

Build ONLY the frontend for now. Use realistic demo data. Do not implement backend, database, OCR, or AI API functionality yet.

DESIGN:

- Modern clinical intelligence dashboard

- Clean white and very light-gray background

- Deep navy text

- Professional blue accent

- Subtle shadows and borders

- Rounded cards

- Minimal, premium appearance

- Excellent spacing and typography

- Responsive

- Avoid excessive gradients

- Avoid a generic chatbot design

MAIN LAYOUT:

Create a fixed left sidebar:

MEDLENS

AI Clinical Intelligence

Navigation:

• Dashboard

• Patients

• Medical Reports

• Timeline

• Report Comparison

• Alerts & Conflicts

• Verification Center

• Settings

Bottom:

• User profile

• Settings

• Logout

TOP NAVIGATION:

- Current page title

- Search bar: “Search patients, reports, tests...”

- Notification icon

- User profile

- “+ Upload Report” button

DASHBOARD:

Create a professional overview page.

Header:

“Good Morning”

“Your clinical information workspace at a glance.”

Statistics cards:

- Total Patients: 24

- Reports Processed: 67

- Pending Verification: 8

- Potential Conflicts: 2

Create a “Recent Patients” table:

Patient

Patient ID

Age

Last Report

Reports

Status

Action

Use realistic demo patients.

Create a “Recent Medical Reports” section:

Report

Type

Date

Extracted Items

Status

Action

Example statuses:

Processed

Pending Review

Needs Verification

Create an “AI Activity” panel:

“12 laboratory values extracted”

“8 reference ranges detected”

“2 potential conflicts identified”

“5 reports ready for verification”

Create a small Responsible AI notice:

“MedLens organizes and explains available medical information. It does not provide medical diagnosis or treatment recommendations.”

PATIENT PAGE:

Create a clean patient management interface with:

Search

Filter

“+ Add Patient”

Patient table with:

Name

Patient ID

Age

Sex

Reports

Last Updated

Verification Status

View

PATIENT PROFILE:

Show:

Patient Name

Patient ID

Age

Sex

Date of Birth

Information cards:

Symptoms

Existing Conditions

Allergies

Medications

Other Information

Every piece of information should have a small source badge:

USER PROVIDED

AI EXTRACTED

AI GENERATED

HUMAN VERIFIED

MEDICAL REPORT PAGE:

Create a two-column report analysis interface.

LEFT:

Medical document preview.

Show:

File name

Report date

Page number

Document preview

View Source button

RIGHT:

“Extracted Medical Information”

Create a structured table:

Test Name

Value

Unit

Reference Range

Status

Source

Confidence

Example:

Hemoglobin | 12.1 | g/dL | 13–17 | LOW | Page 2 | 96%

Glucose | 108 | mg/dL | 70–110 | NORMAL | Page 2 | 98%

Platelets | 250 | thousand/uL | 150–450 | NORMAL | Page 2 | 97%

Use subtle status badges.

IMPORTANT:

The interface must clearly state:

“Status is determined only using the reference range provided in the source report.”

If no reference range exists:

“Reference range not provided”

“Cannot determine”

Never display an invented reference range.

SOURCE PANEL:

When “View Source” is clicked, show a side panel containing:

Source Document

Page Number

Original Extracted Text

Source Type

AI Confidence

Verification Status

UPLOAD PAGE:

Create a beautiful drag-and-drop upload interface.

Title:

“Upload Medical Report”

Subtitle:

“Transform medical documents into structured information.”

Upload area:

“Drag & drop your report here”

“PDF, JPG or PNG”

Button:

“Browse Files”

After selecting a file, show:

Uploading

↓

Reading Document

↓

Extracting Information

↓

Detecting Reference Ranges

↓

Structuring Record

↓

Ready for Verification

Use a professional, subtle progress animation.

VERIFICATION CENTER:

Create a page showing AI-extracted information awaiting human review.

Example card:

Hemoglobin

12.1 g/dL

Source:

Blood_Report.pdf — Page 2

AI Confidence:

96%

Status:

Pending Verification

Buttons:

Verify

Edit

Reject

ALERTS & CONFLICTS:

Create a page showing potential inconsistencies.

Example:

POTENTIAL INFORMATION CONFLICT

Patient Record:

Allergy — Penicillin

Uploaded Prescription:

Medication — Amoxicillin

Source:

Prescription.pdf

Status:

Requires Human Verification

Do NOT call this a diagnosis or state that the medication is unsafe.

REPORT COMPARISON:

Create a page where users can compare:

Previous Report

Current Report

Display:

Test | Previous | Current | Change

Hemoglobin | 12.8 | 12.1 | -0.7

Glucose | 101 | 108 | +7

Platelets | 240 | 250 | +10

Only display observed changes. Do not provide medical conclusions.

PATIENT TIMELINE:

Create a clean chronological timeline:

Patient Created

↓

Previous Report Uploaded

↓

Prescription Uploaded

↓

Current Report Uploaded

↓

AI Extraction

↓

Human Verification

AI SUMMARY:

Create a patient-friendly summary card.

Title:

“AI-Powered Information Summary”

Label:

AI GENERATED

Example:

“The latest uploaded report contains several laboratory measurements. Hemoglobin is below the reference range stated in the report, while glucose and platelet values fall within their reported ranges.”

Add:

“MedLens does not provide diagnosis, treatment recommendations, or medication instructions.”

FINAL UX:

Make every page visually connected.

The overall product should communicate:

PATIENT INFORMATION

↓

UPLOAD REPORT

↓

AI EXTRACTION

↓

STRUCTURED RECORD

↓

REFERENCE-RANGE AWARENESS

↓

SOURCE & CONFIDENCE

↓

HUMAN VERIFICATION

↓

CONFLICT DETECTION

↓

REPORT COMPARISON

↓

PATIENT-FRIENDLY SUMMARY

Make the final frontend look like a real production-quality clinical information intelligence platform suitable for a major hackathon demonstration.
give me a working website

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/96e70cd0-ab5d-4f2b-9702-e43af9e7d245).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

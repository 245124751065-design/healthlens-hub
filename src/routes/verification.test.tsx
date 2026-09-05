import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { extractions } from "@/data/demo";
import { Route } from "./verification";

const VerificationPage = Route.options.component as () => JSX.Element;

describe("Verification Center", () => {
  it("lists every extracted item as pending review", () => {
    render(<VerificationPage />);
    expect(
      screen.getByText(`${extractions.length} extracted items awaiting human review.`),
    ).toBeInTheDocument();
    for (const e of extractions) {
      expect(screen.getByRole("heading", { name: e.test })).toBeInTheDocument();
    }
  });

  it("marks an item human verified after the reviewer verifies it", async () => {
    const user = userEvent.setup();
    render(<VerificationPage />);
    const card = screen.getByRole("heading", { name: extractions[0]!.test }).closest("section")!;

    expect(within(card).getByText("AI EXTRACTED")).toBeInTheDocument();
    await user.click(within(card).getByRole("button", { name: /verify/i }));

    expect(within(card).getByText("HUMAN VERIFIED")).toBeInTheDocument();
    expect(within(card).getByText("Human Verified")).toBeInTheDocument();
    expect(
      screen.getByText(`${extractions.length - 1} extracted items awaiting human review.`),
    ).toBeInTheDocument();
  });

  it("records a rejection without verifying the item", async () => {
    const user = userEvent.setup();
    render(<VerificationPage />);
    const card = screen.getByRole("heading", { name: extractions[1]!.test }).closest("section")!;

    await user.click(within(card).getByRole("button", { name: /reject/i }));

    expect(within(card).getByText("Rejected")).toBeInTheDocument();
    expect(within(card).queryByText("HUMAN VERIFIED")).not.toBeInTheDocument();
  });

  it("shows an item with no reference range as not provided", () => {
    render(<VerificationPage />);
    const missing = extractions.filter((e) => e.range === null);
    expect(screen.getAllByText("Reference range not provided")).toHaveLength(missing.length);
  });

  it("keeps the reference-range notice on screen", () => {
    render(<VerificationPage />);
    expect(screen.getByText(/only using the reference range provided/i)).toBeInTheDocument();
  });
});

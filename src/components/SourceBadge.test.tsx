import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SourceBadge, StatusPill } from "./SourceBadge";

describe("SourceBadge", () => {
  it("shows the provenance label", () => {
    render(<SourceBadge kind="AI EXTRACTED" />);
    expect(screen.getByText("AI EXTRACTED")).toBeInTheDocument();
  });

  it("styles verified information differently from AI output", () => {
    const { container: verified } = render(<SourceBadge kind="HUMAN VERIFIED" />);
    const { container: extracted } = render(<SourceBadge kind="AI EXTRACTED" />);
    expect(verified.firstElementChild?.className).not.toBe(extracted.firstElementChild?.className);
  });

  it("merges custom classes", () => {
    const { container } = render(<SourceBadge kind="USER PROVIDED" className="mt-4" />);
    expect(container.firstElementChild).toHaveClass("mt-4");
  });
});

describe("StatusPill", () => {
  it.each([
    ["Processed", "text-success"],
    ["LOW", "text-warning"],
    ["Needs Verification", "text-danger"],
    ["CANNOT DETERMINE", "text-navy-soft"],
  ])("renders %s with the expected tone", (status, tone) => {
    const { container } = render(<StatusPill status={status} />);
    expect(screen.getByText(status)).toBeInTheDocument();
    expect(container.firstElementChild).toHaveClass(tone);
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderRoute } from "@/test/render-route";

const STEPS = [
  "Uploading",
  "Reading Document",
  "Extracting Information",
  "Detecting Reference Ranges",
  "Structuring Record",
  "Ready for Verification",
];

describe("upload workflow", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("starts empty with the drop zone and disclaimer", async () => {
    await renderRoute("/upload");
    expect(screen.getByText(/drag & drop your report here/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /browse files/i })).toBeInTheDocument();
    expect(screen.getByText(/does not provide medical diagnosis/i)).toBeInTheDocument();
  });

  it("runs through every processing stage after a file is chosen", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    const { container } = await renderRoute("/upload");
    const input = container.querySelector('input[type="file"]')!;

    await user.upload(
      input as HTMLInputElement,
      new File(["x"], "Blood_Report.pdf", { type: "application/pdf" }),
    );

    expect(screen.getByText("Blood_Report.pdf")).toBeInTheDocument();
    expect(screen.getByText(`${STEPS[0]}...`)).toBeInTheDocument();

    for (let i = 1; i < STEPS.length - 1; i++) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1300);
      });
      expect(screen.getByText(`${STEPS[i]}...`)).toBeInTheDocument();
    }

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1300);
    });

    expect(screen.getByText("Processing complete")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /review extracted information/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open verification center/i })).toBeInTheDocument();
  });
});

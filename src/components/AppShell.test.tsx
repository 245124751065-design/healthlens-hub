import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderRoute } from "@/test/render-route";

describe("AppShell", () => {
  it("shows the page title for the current route", async () => {
    await renderRoute("/patients");
    expect(screen.getAllByText("Patients").length).toBeGreaterThan(0);
  });

  it("derives a title for detail routes", async () => {
    await renderRoute("/reports/RPT-2091");
    expect(screen.getAllByText("Report Analysis").length).toBeGreaterThan(0);
  });

  it("navigates between sections through the sidebar", async () => {
    const user = userEvent.setup();
    const { router } = await renderRoute("/");
    await user.click(screen.getAllByRole("link", { name: /verification center/i })[0]!);
    await waitFor(() => expect(router.state.location.pathname).toBe("/verification"));
  });

  it("exposes the upload action and search box", async () => {
    await renderRoute("/");
    expect(screen.getAllByRole("link", { name: /upload report/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByPlaceholderText(/search/i).length).toBeGreaterThan(0);
  });
});

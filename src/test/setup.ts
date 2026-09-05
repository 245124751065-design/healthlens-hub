import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// jsdom does not implement scrollTo; the router calls it on navigation.
vi.stubGlobal("scrollTo", vi.fn());

afterEach(() => {
  cleanup();
});

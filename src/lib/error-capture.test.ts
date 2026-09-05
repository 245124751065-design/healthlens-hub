import { describe, expect, it } from "vitest";
import { consumeLastCapturedError, describeError } from "./error-capture";

describe("describeError", () => {
  it("keeps the message and stack of an Error", () => {
    const error = new Error("boom");
    const text = describeError(error);
    expect(text).toContain("boom");
    expect(text).toContain("Error");
  });

  it("walks the cause chain", () => {
    const root = new Error("root cause");
    const wrapper = new Error("outer", { cause: root });
    const text = describeError(wrapper);
    expect(text).toContain("outer");
    expect(text).toContain("caused by:");
    expect(text).toContain("root cause");
  });

  it("annotates HTTP-style status codes", () => {
    const error = Object.assign(new Error("nope"), { status: 503 });
    expect(describeError(error)).toContain("(status 503)");
  });

  it("stringifies non-Error values safely", () => {
    expect(describeError("plain string")).toBe("plain string");
    expect(describeError({ a: 1 })).toBe('{"a":1}');
    const circular: Record<string, unknown> = {};
    circular["self"] = circular;
    expect(typeof describeError(circular)).toBe("string");
  });
});

describe("consumeLastCapturedError", () => {
  it("returns the last logged error once, then clears it", () => {
    consumeLastCapturedError();
    const error = new Error("logged once");
    console.error(error);
    expect(consumeLastCapturedError()).toBe(error);
    expect(consumeLastCapturedError()).toBeUndefined();
  });
});

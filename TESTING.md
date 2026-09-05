# Testing

MedLens uses [Vitest](https://vitest.dev) with jsdom and Testing Library.

## Commands

| Command                 | What it does                              |
| ----------------------- | ----------------------------------------- |
| `bun run test`          | Run the whole suite once                  |
| `bun run test:watch`    | Re-run affected tests while you edit      |
| `bun run test:coverage` | Run with a text + HTML coverage report    |

## Layout

- `src/test/setup.ts` — jest-dom matchers, auto cleanup, jsdom shims.
- `src/test/render-route.tsx` — `renderRoute(path)` mounts the real router,
  root layout and app shell at a URL, so page tests exercise navigation too.
- `src/test/utils.tsx` — `renderWithProviders` for isolated component tests.
- `*.test.ts(x)` files live next to the code they cover.

## What is covered

- Demo data invariants: unique record ids, every fact carries a provenance
  source, reports link to real patients, extraction status agrees with the
  reference range in the source report (and is "cannot determine" when the
  range is missing), comparison deltas match previous vs current, and the
  responsible-AI copy rules out diagnosis and treatment advice.
- Components: `SourceBadge` provenance labels, `StatusPill` tones, app shell
  titles, sidebar navigation, upload action and search.
- Pages: dashboard, patients list and profile, reports list and analysis,
  comparison, timeline, alerts, settings, 404.
- Flows: verification (verify / reject / pending counts, missing reference
  range) and the upload pipeline through all six processing stages.

## Conventions

- Query by role, label or visible text — not CSS classes or test ids.
- Drive interactions with `userEvent`, not raw `fireEvent`.
- Use fake timers (`vi.useFakeTimers({ shouldAdvanceTime: true })`) for the
  simulated processing stages so tests stay fast.

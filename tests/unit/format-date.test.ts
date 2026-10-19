import { afterAll, describe, expect, it } from "vitest";
import { formatDate } from "@/lib/posts";

const originalTz = process.env.TZ;

/** Day-of-month as the host zone sees it, used only to prove that changing
 *  `process.env.TZ` actually took effect in this runtime. */
function ambientDay(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getDate();
}

afterAll(() => {
  if (originalTz === undefined) delete process.env.TZ;
  else process.env.TZ = originalTz;
});

describe("formatDate", () => {
  it("renders the authored calendar day", () => {
    process.env.TZ = "UTC";
    expect(formatDate("2026-09-01")).toBe("September 1, 2026");
  });

  it("renders the same day in a UTC-negative zone", () => {
    // Post dates are calendar days, not instants: `2026-09-01` must never
    // render as August 31 just because the viewer sits west of UTC.
    process.env.TZ = "UTC";
    expect(ambientDay("2026-09-01")).toBe(1);

    process.env.TZ = "America/Los_Angeles";
    // Guard against a vacuous pass: if this runtime ignored the zone change the
    // assertions below would compare a value against itself.
    expect(ambientDay("2026-09-01")).toBe(31);

    expect(formatDate("2026-09-01")).toBe("September 1, 2026");
    expect(formatDate("2026-09-26")).toBe("September 26, 2026");
  });
});

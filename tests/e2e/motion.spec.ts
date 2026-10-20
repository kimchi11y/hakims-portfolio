import { expect, test, type Page } from "@playwright/test";

/** Cheap fingerprint of what is actually painted on the nebula banner canvas. */
function canvasHash(): number {
  /* The ASCII element draws inside an open shadow root, so a document-wide
     query would miss its canvas. */
  const findCanvas = (root: Document | ShadowRoot): HTMLCanvasElement | null => {
    const direct = root.querySelector("canvas");
    if (direct) return direct;
    for (const element of root.querySelectorAll("*")) {
      if (element.shadowRoot) {
        const found = findCanvas(element.shadowRoot);
        if (found) return found;
      }
    }
    return null;
  };

  const canvas = findCanvas(document);
  if (!canvas) return -1;
  if (canvas.width === 0 || canvas.height === 0) return -1;

  const context = canvas.getContext("2d");
  if (!context) return -1;

  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  let hash = 0;
  for (let index = 0; index < data.length; index += 397) {
    hash = (hash * 31 + data[index]) | 0;
  }
  return hash;
}

function readingProgressScale(page: Page) {
  return page.locator('div[aria-hidden][style*="scaleX"]').evaluate((element) => {
    const match = getComputedStyle(element).transform.match(/matrix\(([-\d.]+)/);
    return match ? Number(match[1]) : Number.NaN;
  });
}

test("animates the nebula banner while motion is allowed", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator("canvas").first()).toBeVisible();

  const first = await page.evaluate(canvasHash);
  await page.waitForTimeout(500);
  const second = await page.evaluate(canvasHash);

  expect(first, "the nebula banner painted nothing").not.toBe(-1);
  expect(second, "a rotating field should not repeat a frame").not.toBe(first);
});

test("freezes the nebula banner under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("canvas").first()).toBeVisible();

  const first = await page.evaluate(canvasHash);
  await page.waitForTimeout(500);
  const second = await page.evaluate(canvasHash);

  expect(first, "the nebula banner painted nothing").not.toBe(-1);
  expect(second, "reduced motion must stop the run loop").toBe(first);
});

test("reveals off-screen sections without scrolling under reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const total = await page.locator(".reveal").count();
  expect(total).toBeGreaterThan(0);

  await expect
    .poll(() => page.locator(".reveal[data-revealed]").count())
    .toBe(total);
});

test("holds back off-screen sections while motion is allowed", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  // Control for the test above: without the reduced-motion rootMargin, the
  // observer has to gate on the viewport for below-the-fold content.
  const pending = await page.locator(".reveal:not([data-revealed])").count();
  expect(pending).toBeGreaterThan(0);
});

test("tracks reading progress down a post", async ({ page }) => {
  await page.goto("/blog/homelab-journey");
  await expect(page.locator('div[aria-hidden][style*="scaleX"]')).toHaveCount(1);

  expect(await readingProgressScale(page)).toBeLessThan(0.1);

  const scrollable = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );
  expect(scrollable, "the post is too short to scroll").toBeGreaterThan(0);

  await page.evaluate(() =>
    window.scrollTo(0, document.documentElement.scrollHeight),
  );

  await expect.poll(() => readingProgressScale(page)).toBeGreaterThan(0.9);
});

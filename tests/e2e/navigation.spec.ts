import { expect, test } from "@playwright/test";

test("every in-page nav target exists exactly once", async ({ page }) => {
  await page.goto("/");

  const hrefs = await page
    .locator('nav a[href^="#"]')
    .evaluateAll((elements) =>
      [...new Set(elements.map((element) => element.getAttribute("href") ?? ""))],
    );

  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    // `navLinks` holds plain strings, so a renamed section id silently no-ops.
    expect(await page.locator(href).count(), `${href} has no target`).toBe(1);
  }
});

test("every internal link resolves", async ({ page }) => {
  await page.goto("/");

  const hrefs = await page.locator('a[href^="/"]').evaluateAll((elements) =>
    [...new Set(elements.map((element) => element.getAttribute("href") ?? ""))],
  );

  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    const response = await page.request.get(href);
    expect(response.status(), `${href} is broken`).toBe(200);
  }
});

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens, closes on Escape, and returns focus to its trigger", async ({
    page,
  }) => {
    await page.goto("/");
    const panel = page.locator("#mobile-menu");
    // The accessible name flips with the state, so address the trigger by
    // the element it controls instead.
    const trigger = page.locator('nav button[aria-controls="mobile-menu"]');

    await expect(panel).toBeHidden();

    await trigger.click();
    await expect(panel).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("closes when the pointer goes down outside of it", async ({ page }) => {
    await page.goto("/");
    const panel = page.locator("#mobile-menu");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(panel).toBeVisible();

    await page.locator("body").dispatchEvent("pointerdown");
    await expect(panel).toBeHidden();
  });

  test("stays open when the pointer goes down inside of it", async ({
    page,
  }) => {
    await page.goto("/");
    const panel = page.locator("#mobile-menu");

    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(panel).toBeVisible();

    await panel.dispatchEvent("pointerdown");
    await expect(panel).toBeVisible();
  });
});

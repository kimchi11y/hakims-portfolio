import { expect, test, type Page } from "@playwright/test";

const TOGGLE = 'button[aria-label="Toggle theme"]:visible';

function readTheme(page: Page) {
  return page.evaluate(() => document.documentElement.dataset.theme);
}

test("follows the OS preference while nothing is stored", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect.poll(() => readTheme(page)).toBe("light");
  await expect(page.locator(".theme-icon-sun").first()).toBeVisible();
  await expect(page.locator(".theme-icon-moon").first()).toBeHidden();

  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect.poll(() => readTheme(page)).toBe("dark");
  await expect(page.locator(".theme-icon-moon").first()).toBeVisible();
  await expect(page.locator(".theme-icon-sun").first()).toBeHidden();
});

test("persists the chosen theme, beating the OS preference", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect.poll(() => readTheme(page)).toBe("light");

  await page.locator(TOGGLE).first().click();
  await expect.poll(() => readTheme(page)).toBe("dark");
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

  await page.reload();
  await expect.poll(() => readTheme(page)).toBe("dark");
  await expect(page.locator(".theme-icon-moon").first()).toBeVisible();

  // A stored choice outranks a contradicting OS preference.
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await expect.poll(() => readTheme(page)).toBe("dark");
});

test("ignores an unreadable stored value", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "banana"));
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect.poll(() => readTheme(page)).toBe("dark");
});

test("hydrates without mismatches", async ({ page }) => {
  const hydration: string[] = [];
  const crashes: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" && /hydrat/i.test(message.text())) {
      hydration.push(message.text());
    }
  });
  page.on("pageerror", (error) => crashes.push(error.message));

  for (const path of ["/", "/blog", "/blog/homelab-journey"]) {
    await page.goto(path);
    await page.waitForLoadState("load");
  }

  expect(hydration).toEqual([]);
  expect(crashes).toEqual([]);
});

import { expect, test, type Page } from "@playwright/test";

const postLinks = 'a[href^="/blog/"]';

async function listedPostHrefs(page: Page) {
  return page.locator(postLinks).evaluateAll((elements) =>
    [...new Set(elements.map((element) => element.getAttribute("href") ?? ""))],
  );
}

test("lists every post newest first", async ({ page }) => {
  await page.goto("/blog");

  await expect(
    page.getByRole("heading", { level: 1, name: "Blog" }),
  ).toBeVisible();

  const dates = await page
    .locator("article time[datetime]")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("datetime") ?? ""),
    );

  expect(dates.length).toBeGreaterThan(0);
  expect(dates).not.toContain("");

  const timestamps = dates.map((date) => Date.parse(date));
  for (let index = 1; index < timestamps.length; index++) {
    expect(
      timestamps[index - 1],
      `entry ${index - 1} is older than entry ${index}`,
    ).toBeGreaterThanOrEqual(timestamps[index]);
  }
});

test("renders every post the listing links to", async ({ page }) => {
  await page.goto("/blog");
  const hrefs = await listedPostHrefs(page);
  expect(hrefs.length).toBeGreaterThan(0);

  for (const href of hrefs) {
    const response = await page.goto(href);
    // `dynamicParams = false`, so a listed-but-unregistered slug 404s here.
    expect(response?.status(), `${href} did not resolve`).toBe(200);
    expect(
      (await page.locator("article h1").count()),
      `${href} has no single page heading`,
    ).toBe(1);
    await expect(page.locator("article time[datetime]")).toHaveCount(1);
    expect(
      await page.locator("article header span").count(),
      `${href} renders no tags`,
    ).toBeGreaterThan(0);
  }
});

test("404s an unknown slug", async ({ page }) => {
  const response = await page.goto("/blog/does-not-exist");
  expect(response?.status()).toBe(404);
});

test("reveals every post body without waiting for a scroll", async ({
  page,
}) => {
  // The whole article sits inside a <Reveal>, so a broken observer would serve
  // a blank page while the assertions above still pass — `count()` and
  // `toBeVisible()` both ignore `opacity: 0`.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/blog");
  const hrefs = await listedPostHrefs(page);

  for (const href of hrefs) {
    await page.goto(href);
    await expect
      .poll(
        () => page.locator("article .reveal:not([data-revealed])").count(),
        {
          message: `${href} kept its body hidden`,
          /* A post with many code blocks takes a while to compile and hydrate
             on the dev server; in CI this settles in well under a frame. */
          timeout: 20_000,
        },
      )
      .toBe(0);
  }
});

test("previews the newest posts on the home page", async ({ page }) => {
  await page.goto("/blog");
  const listed = await listedPostHrefs(page);

  await page.goto("/");
  const previewed = await listedPostHrefs(page);

  expect(previewed.length).toBeGreaterThan(0);
  expect(previewed).toEqual(listed.slice(0, previewed.length));
});

test("advertises every listed post in the served sitemap", async ({ page }) => {
  await page.goto("/blog");
  const hrefs = await listedPostHrefs(page);

  const response = await page.request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();

  expect(xml).toContain("/blog<");
  for (const href of hrefs) {
    expect(xml, `${href} is missing from sitemap.xml`).toContain(href);
  }
});

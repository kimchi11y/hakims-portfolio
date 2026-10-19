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

test("keeps every diagram label inside its node", async ({ page }) => {
  // Diagrams are rendered during `next build`, where Pele measures labels with
  // a built-in width table because there is no canvas. The browser then paints
  // whatever font `--pele-font` resolves to, so a measurement mismatch shows up
  // as label text spilling out of its node — invisible to every other test.
  await page.goto("/blog");
  const hrefs = await listedPostHrefs(page);

  const cramped: string[] = [];
  const withDiagram: string[] = [];
  let diagrams = 0;

  for (const href of hrefs) {
    await page.goto(href);
    const svgs = page.locator(".diagram svg");
    const count = await svgs.count();
    diagrams += count;
    if (count > 0) withDiagram.push(href);

    const slacks = await svgs.evaluateAll((elements) =>
      elements.flatMap((svg) =>
        [...svg.querySelectorAll(".pele-node")].flatMap((node) => {
          const label = node.querySelector(".pele-label");
          // Diamonds are polygons, everything else a rect or a path.
          const shape = node.querySelector("rect, polygon, path");
          if (!label || !shape) return [];

          const labelWidth = (label as SVGGraphicsElement).getBBox().width;
          const shapeWidth = (shape as SVGGraphicsElement).getBBox().width;
          return [
            {
              id: node.getAttribute("data-id"),
              slack: Math.round(shapeWidth - labelWidth),
            },
          ];
        }),
      ),
    );

    for (const node of slacks) {
      if (node.slack < 8) {
        cramped.push(`${href} node ${node.id}: ${node.slack}px of slack`);
      }
    }
  }

  expect(diagrams, "no diagram rendered on any post").toBeGreaterThan(0);
  expect(cramped).toEqual([]);

  // Flex shrinks the SVG to the available width, so it can never overflow —
  // the phone risk is the opposite: a diagram that grows wide enough gets
  // scaled down until its labels stop being readable.
  await page.setViewportSize({ width: 390, height: 900 });

  const illegible: string[] = [];
  for (const href of withDiagram) {
    await page.goto(href);
    const scales = await page.locator(".diagram svg").evaluateAll((svgs) =>
      svgs.map((svg) => {
        const natural = Number(svg.getAttribute("width"));
        const rendered = svg.getBoundingClientRect().width;
        const label = svg.querySelector(".pele-label");
        const fontSize = label
          ? Number.parseFloat(getComputedStyle(label).fontSize)
          : 16;
        return Math.round(fontSize * (rendered / natural) * 10) / 10;
      }),
    );

    for (const effective of scales) {
      // Below roughly 12px the labels stop being comfortably readable.
      if (effective < 12) {
        illegible.push(`${href}: labels render at ${effective}px on a phone`);
      }
    }
  }

  expect(illegible).toEqual([]);
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

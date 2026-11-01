import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
/* `localhost`, not `127.0.0.1`: Next's dev server blocks cross-origin requests
   to its HMR endpoint by default, and the two spellings are different origins. */
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    /* CI asserts the shipped artifact (static export served by the same
       Workers assets engine as production, so 404s and clean URLs match);
       locally the dev server keeps the loop fast. */
    command: process.env.CI
      ? `npm run build && npx wrangler dev --port ${PORT}`
      : "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { PORT: String(PORT) },
  },
});

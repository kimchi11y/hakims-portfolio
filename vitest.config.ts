import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));
const mdxStub = fileURLToPath(new URL("./tests/stubs/mdx.ts", import.meta.url));

export default defineConfig({
  plugins: [
    {
      /* Posts are React components at runtime; unit tests only read their
         metadata, so `.mdx` resolves to an empty stand-in instead of running
         the MDX + Shiki pipeline. `enforce: "pre"` is required because Vite
         short-circuits relative specifiers before `resolve.alias` sees them. */
      name: "mdx-stub",
      enforce: "pre",
      resolveId(source) {
        if (source.endsWith(".mdx")) return mdxStub;
      },
    },
  ],
  resolve: {
    alias: [{ find: /^@\//, replacement: root }],
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    /* The production image and the CI runner are both UTC; pin it so a local
       run in another zone reports the same result. */
    env: { TZ: "UTC" },
  },
});

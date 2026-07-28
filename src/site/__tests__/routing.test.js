import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "../../..");
const netlifyConfig = readFileSync(resolve(projectRoot, "netlify.toml"), "utf8");

describe("published note routes", () => {
  it("keeps one source for the Urdu migration document after its move to Docs", () => {
    const slug = "why-shabab-moved-from-google-docs-to-canva-and-then-to-its-own-website-urdu.md";
    const docsNote = resolve(projectRoot, "src/site/notes/Docs", slug);
    const staleActivityNote = resolve(projectRoot, "src/site/notes/Act", slug);

    expect(existsSync(docsNote)).toBe(true);
    expect(existsSync(staleActivityNote)).toBe(false);
  });

  it("redirects Digital Garden Docs URLs to flattened note URLs before the 404 fallback", () => {
    const docsRedirect = netlifyConfig.indexOf('from = "/docs/*"');
    const flattenedTarget = netlifyConfig.indexOf('to = "/:splat"', docsRedirect);
    const permanentStatus = netlifyConfig.indexOf("status = 301", docsRedirect);
    const notFoundFallback = netlifyConfig.indexOf('from = "/*"');

    expect(docsRedirect).toBeGreaterThan(-1);
    expect(flattenedTarget).toBeGreaterThan(docsRedirect);
    expect(permanentStatus).toBeGreaterThan(docsRedirect);
    expect(docsRedirect).toBeLessThan(notFoundFallback);
  });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "../../..");
const netlifyConfig = readFileSync(resolve(projectRoot, "netlify.toml"), "utf8");

describe("published note routes", () => {
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

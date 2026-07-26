import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "../../..");
const readProjectFile = (path) => readFileSync(resolve(projectRoot, path), "utf8");

describe("public content boundary", () => {
  it("excludes internal notes from Eleventy", () => {
    const ignoredPaths = readProjectFile(".eleventyignore")
      .split(/\r?\n/)
      .map((line) => line.trim());

    expect(ignoredPaths).toContain("src/site/notes/");
  });

  it("builds search results from blog posts only", () => {
    const searchTemplate = readProjectFile("src/site/search-index.njk");

    expect(searchTemplate).toContain("collections.blog");
    expect(searchTemplate).not.toContain("collections.note");
  });

  it("does not promote internal content on the homepage", () => {
    const homepage = readProjectFile("src/site/index.njk");

    expect(homepage).not.toMatch(/href="\/[0-9]{2}\//);
    expect(homepage).not.toContain("home-explore");
    expect(homepage).not.toContain("Search the full library");
  });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectRoot = resolve(import.meta.dirname, "../../..");
const readProjectFile = (path) => readFileSync(resolve(projectRoot, path), "utf8");

describe("public content boundary & protected search", () => {
  it("builds standard search results from blog posts only", () => {
    const searchTemplate = readProjectFile("src/site/search-index.njk");

    expect(searchTemplate).toContain("collections.blog");
    expect(searchTemplate).not.toContain("collections.note");
  });

  it("builds advanced vault search results from notes collection", () => {
    const vaultSearchTemplate = readProjectFile("src/site/vault-search-index.njk");

    expect(vaultSearchTemplate).toContain("collections.note");
  });

  it("includes lock button component in navbar", () => {
    const navbar = readProjectFile("src/site/_includes/components/navbar.njk");

    expect(navbar).toContain("components/lockButton.njk");
  });

  it("does not promote internal content on the homepage", () => {
    const homepage = readProjectFile("src/site/index.njk");

    expect(homepage).not.toMatch(/href="\/[0-9]{2}\//);
    expect(homepage).not.toContain("home-explore");
    expect(homepage).not.toContain("Search the full library");
  });
});

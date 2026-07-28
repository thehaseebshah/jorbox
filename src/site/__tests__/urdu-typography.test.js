import { existsSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const projectRoot = resolve(import.meta.dirname, "../../..");
const noteData = require("../notes/notes.11tydata.js");
const computed = noteData.eleventyComputed;
const readProjectFile = (path) => readFileSync(resolve(projectRoot, path), "utf8");

describe("Urdu note typography", () => {
  it("marks Urdu note slugs as RTL content", () => {
    const urduNote = {
      page: {
        fileSlug: "why-shabab-moved-from-google-docs-to-canva-and-then-to-its-own-website-urdu",
      },
    };

    expect(computed.contentLanguage(urduNote)).toBe("ur");
    expect(computed.contentDirection(urduNote)).toBe("rtl");
  });

  it("keeps Arabic RTL without classifying it as Urdu", () => {
    const arabicNote = { language: "ar", page: { fileSlug: "arabic-reading" } };

    expect(computed.contentLanguage(arabicNote)).toBe("ar");
    expect(computed.contentDirection(arabicNote)).toBe("rtl");
  });

  it("leaves ordinary note direction unchanged", () => {
    const englishNote = { page: { fileSlug: "cooking" } };

    expect(computed.contentLanguage(englishNote)).toBeUndefined();
    expect(computed.contentDirection(englishNote)).toBeUndefined();
  });

  it("renders language and direction attributes on note content", () => {
    const layout = readProjectFile("src/site/_includes/layouts/note.njk");

    expect(layout).toContain('lang="{{ contentLanguage }}"');
    expect(layout).toContain('dir="{{ contentDirection }}"');
  });

  it("self-hosts the licensed Noto Nastaliq Urdu font", () => {
    const fontPath = resolve(
      projectRoot,
      "src/site/fonts/noto-nastaliq-urdu/NotoNastaliqUrdu-Variable.woff2",
    );
    const license = readProjectFile("src/site/fonts/noto-nastaliq-urdu/OFL.txt");
    const styles = readProjectFile("src/site/styles/custom-style.scss");

    expect(existsSync(fontPath)).toBe(true);
    expect(statSync(fontPath).size).toBeGreaterThan(250_000);
    expect(license).toContain("SIL OPEN FONT LICENSE Version 1.1");
    expect(styles).toContain('font-family: "Noto Nastaliq Urdu"');
    expect(styles).toContain('main.content[lang="ur"]');
    expect(styles).toContain('--font-default: "Product Sans"');
    expect(styles).not.toContain('--font-default: "Noto Nastaliq Urdu"');
  });
});

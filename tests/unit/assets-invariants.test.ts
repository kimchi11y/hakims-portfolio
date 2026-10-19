import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { experienceData, personalData, projectsData, socialLinks } from "@/lib/data";

const PUBLIC_DIR = join(process.cwd(), "public");

function publicFile(href: string): string {
  return join(PUBLIC_DIR, href.replace(/^\//, ""));
}

describe("resume files", () => {
  it("ships both linked files under public/", () => {
    for (const href of [personalData.resume.pdf, personalData.resume.docx]) {
      expect(href.startsWith("/"), `${href} must be public-root relative`).toBe(
        true,
      );
      expect(existsSync(publicFile(href)), `${href} is missing`).toBe(true);
      expect(
        statSync(publicFile(href)).size,
        `${href} is empty`,
      ).toBeGreaterThan(0);
    }
  });
});

describe("project data", () => {
  it("uses unique ids", () => {
    const ids = projectsData.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("ships every cover image", () => {
    // `next/image` with no remotePatterns configured can only serve local
    // files, so a bad path is a 404 rather than a build error.
    for (const project of projectsData) {
      expect(
        project.images.length,
        `${project.title} has no image`,
      ).toBeGreaterThan(0);
      for (const image of project.images) {
        expect(existsSync(publicFile(image)), `${image} is missing`).toBe(true);
      }
    }
  });

  it("links each project over http(s)", () => {
    for (const project of projectsData) {
      expect(project.link, `${project.title} has a bad link`).toMatch(
        /^https?:\/\//,
      );
    }
  });
});

describe("social links", () => {
  it("uses resolvable urls", () => {
    expect(socialLinks.length).toBeGreaterThan(0);
    for (const link of socialLinks) {
      const resolvable =
        /^https:\/\//.test(link.url) ||
        /^mailto:[^@\s]+@[^@\s]+\.[^@\s]+$/.test(link.url);
      expect(resolvable, `${link.name} → ${link.url}`).toBe(true);
    }
  });

  it("exposes the contact address used by the nav", () => {
    // The nav builds `mailto:${personalData.email}`, so the metadata address
    // and the social link must not drift apart.
    const email = socialLinks.find((link) => link.icon === "email");
    expect(email?.url).toBe(`mailto:${personalData.email}`);
  });
});

describe("experience data", () => {
  it("uses unique ids and non-empty bullets", () => {
    const ids = experienceData.map((entry) => entry.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const entry of experienceData) {
      expect(entry.bullets.length, `${entry.company} has no bullets`).toBeGreaterThan(0);
      for (const bullet of entry.bullets) {
        expect(bullet.trim(), `${entry.company} has an empty bullet`).not.toBe("");
      }
    }
  });
});

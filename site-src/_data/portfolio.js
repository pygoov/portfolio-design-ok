const fs = require("node:fs");
const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const CONTENT_ROOT = path.join(REPO_ROOT, "content");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function readJsonDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => readJson(path.join(dirPath, name)));
}

module.exports = function () {
  const sections = readJson(path.join(CONTENT_ROOT, "taxonomy", "sections.json"));
  const subsections = readJson(
    path.join(CONTENT_ROOT, "taxonomy", "subsections.json"),
  );
  const entries = readJsonDirectory(path.join(CONTENT_ROOT, "entries")).map(
    (entry) => {
      const normalized = {
        ...entry,
        coverUrl: `assets/media/${entry.cover}`,
        assets: (entry.assets || []).map((asset) => ({
          ...asset,
          url: `assets/media/${asset.src}`,
        })),
      };

      normalized.href = entry.hasPage
        ? `cases/${entry.slug}/`
        : `work/${entry.sections[0]}/${entry.subsections[0]}/`;

      return normalized;
    },
  );

  const entriesById = Object.fromEntries(entries.map((entry) => [entry.id, entry]));

  const subsectionPages = subsections.map((subsection) => ({
    ...subsection,
    sectionId: subsection.section,
    href: `work/${subsection.section}/${subsection.slug}/`,
    entries: (subsection.entryIds || [])
      .map((entryId) => entriesById[entryId])
      .filter(Boolean),
  }));

  const subsectionById = Object.fromEntries(
    subsectionPages.map((subsection) => [subsection.id, subsection]),
  );

  const sectionPages = sections.map((section) => {
    const linkedSubsections = (section.subsections || [])
      .map((subsectionId) => subsectionById[subsectionId])
      .filter(Boolean);

    const uniqueEntries = new Map();

    linkedSubsections.forEach((subsection) => {
      subsection.entries.forEach((entry) => {
        uniqueEntries.set(entry.id, entry);
      });
    });

    return {
      ...section,
      href: `work/${section.slug}/`,
      subsections: linkedSubsections,
      entries: Array.from(uniqueEntries.values()),
    };
  });

  const sectionById = Object.fromEntries(sectionPages.map((section) => [section.id, section]));

  const normalizedSubsectionPages = subsectionPages.map((subsection) => ({
    ...subsection,
    section: sectionById[subsection.sectionId],
  }));

  entries.forEach((entry) => {
    entry.primarySection = sectionById[entry.sections[0]];
    entry.primarySubsection = normalizedSubsectionPages.find(
      (subsection) => subsection.id === entry.subsections[0],
    );
  });

  const caseEntries = entries.filter((entry) => entry.hasPage);

  return {
    sections: sectionPages,
    subsections: normalizedSubsectionPages,
    entries,
    caseEntries,
    featuredCase: caseEntries[0] || null,
  };
};

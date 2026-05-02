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

function pickFeaturedEntries(entries) {
  const preferredIds = [
    "marketplaces-martin",
    "visualizations-rzhd-zdanie-dushevyh-vizualizatsii",
    "labels-sheag",
    "brand-photos-foto-realizovannyh-brendov",
  ];

  const byId = Object.fromEntries(entries.map((entry) => [entry.id, entry]));
  const preferred = preferredIds.map((id) => byId[id]).filter(Boolean);

  if (preferred.length >= 4) {
    return preferred.slice(0, 4);
  }

  const fallback = [...entries]
    .sort((left, right) => {
      if (right.assets.length !== left.assets.length) {
        return right.assets.length - left.assets.length;
      }

      return left.title.localeCompare(right.title, "ru");
    })
    .filter((entry) => !preferred.some((picked) => picked.id === entry.id));

  return [...preferred, ...fallback].slice(0, 4);
}

function pickHomepageHero(entry) {
  if (!entry) {
    return null;
  }

  const preferredAsset = (entry.assets || []).find((asset) =>
    asset.src.endsWith("/asset-07.webp"),
  );

  return {
    ...entry,
    heroImageUrl: `assets/media/${(preferredAsset || entry.assets[0]).src}`,
    heroImageAlt: (preferredAsset || entry.assets[0]).alt,
  };
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

  const visibleEntryIds = new Set();

  normalizedSubsectionPages.forEach((subsection) => {
    subsection.entries.forEach((entry) => {
      visibleEntryIds.add(entry.id);
    });
  });

  const visibleEntries = entries.filter((entry) => visibleEntryIds.has(entry.id));

  visibleEntries.forEach((entry) => {
    entry.primarySection = sectionById[entry.sections[0]];
    entry.primarySubsection = normalizedSubsectionPages.find(
      (subsection) => subsection.id === entry.subsections[0],
    );
  });

  const caseEntries = visibleEntries.filter((entry) => entry.hasPage);
  const galleryEntries = visibleEntries.filter((entry) => entry.type === "gallery");
  const featuredEntries = pickFeaturedEntries(visibleEntries);
  const homepageHero = pickHomepageHero(entriesById["brand-photos-foto-realizovannyh-brendov"]);
  const totalAssetCount = visibleEntries.reduce(
    (count, entry) => count + entry.assets.length,
    0,
  );

  return {
    sections: sectionPages,
    subsections: normalizedSubsectionPages,
    entries: visibleEntries,
    caseEntries,
    galleryEntries,
    featuredEntries,
    homepageHero,
    stats: {
      sectionCount: sectionPages.length,
      subsectionCount: normalizedSubsectionPages.length,
      caseCount: caseEntries.length,
      galleryCount: galleryEntries.length,
      assetCount: totalAssetCount,
    },
  };
};

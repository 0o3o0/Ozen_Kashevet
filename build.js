#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const config = require("./config/clinic.js");
const { renderPage } = require("./src/templates/layout");
const { breadcrumbLd, absUrl } = require("./src/templates/utils");

const home = require("./src/templates/pages/home");
const hearingTest = require("./src/templates/pages/hearingTest");
const childrenHearingTest = require("./src/templates/pages/childrenHearingTest");
const tympanometry = require("./src/templates/pages/tympanometry");
const specialEducation = require("./src/templates/pages/specialEducation");
const ent = require("./src/templates/pages/ent");
const team = require("./src/templates/pages/team");
const prices = require("./src/templates/pages/prices");
const contact = require("./src/templates/pages/contact");
const accessibilityStatement = require("./src/templates/pages/accessibilityStatement");
const privacyPolicy = require("./src/templates/pages/privacyPolicy");

const DIST = path.join(__dirname, "dist");

function isPlaceholder(v) {
  return v == null || /^\[.*\]$/.test(String(v).trim());
}

// ---- Assemble the page list (ENT only when enabled) --------------------
const pages = [home, hearingTest, childrenHearingTest, tympanometry, specialEducation, team, prices, contact, accessibilityStatement, privacyPolicy];
if (config.entEnabled) pages.splice(5, 0, ent);

// ---- JSON-LD: MedicalClinic / LocalBusiness (home page only) -----------
function organizationLd() {
  const ld = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    name: config.clinicName,
    url: config.siteUrl,
  };
  if (!isPlaceholder(config.logo)) ld.logo = absUrl(config, config.logo);
  if (!isPlaceholder(config.phoneHref)) ld.telephone = config.phoneHref;

  const addr = config.address;
  if (!isPlaceholder(addr.full)) {
    ld.address = {
      "@type": "PostalAddress",
      streetAddress: addr.street,
      addressLocality: addr.city,
      addressCountry: addr.country,
    };
    if (!isPlaceholder(addr.postalCode)) ld.address.postalCode = addr.postalCode;
  }

  if (typeof config.geo.lat === "number" && typeof config.geo.lng === "number") {
    ld.geo = { "@type": "GeoCoordinates", latitude: config.geo.lat, longitude: config.geo.lng };
  }

  if (Array.isArray(config.openingHoursStructured) && config.openingHoursStructured.length) {
    ld.openingHoursSpecification = config.openingHoursStructured.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }

  if (config.pricing.confirmed) ld.priceRange = "₪₪";

  if (!isPlaceholder(config.socialImage)) ld.image = absUrl(config, config.socialImage);

  const services = [
    { name: "בדיקת שמיעה", url: "/hearing-test-yavne/" },
    { name: "בדיקת שמיעה לילדים", url: "/children-hearing-test-yavne/" },
    { name: "טימפנומטריה", url: "/tympanometry-yavne/" },
    { name: "בדיקה לוועדת זכאות ואפיון", url: "/special-education-hearing-test/" },
  ];
  ld.availableService = services.map((s) => ({
    "@type": "MedicalTest",
    name: s.name,
    url: absUrl(config, s.url),
  }));

  return ld;
}

// ---- Render every page ----------------------------------------------
function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writePage(page) {
  const isHome = page.slug === "home";
  const breadcrumbs = isHome ? [] : [{ name: "בית", path: "/" }, { name: page.navLabel || page.title, path: page.path }];

  const jsonLd = [];
  if (isHome) jsonLd.push(organizationLd());
  if (breadcrumbs.length) jsonLd.push(breadcrumbLd(config, breadcrumbs));

  const contentHtml = page.render(config);
  const html = renderPage(config, pages, page, { contentHtml, jsonLd, breadcrumbs });

  const outDir = path.join(DIST, page.path);
  ensureDir(outDir);
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
  console.log("wrote", path.join(page.path, "index.html"));
}

function writeSitemap() {
  const urls = pages
    .filter((p) => !p.noindex)
    .map((p) => `  <url><loc>${absUrl(config, p.path)}</loc></url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, "sitemap.xml"), xml, "utf8");
}

function writeRobots() {
  const txt = `User-agent: *\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nSitemap: ${absUrl(config, "/sitemap.xml")}\n`;
  fs.writeFileSync(path.join(DIST, "robots.txt"), txt, "utf8");
}

function copyAssets() {
  ensureDir(path.join(DIST, "assets"));
  fs.copyFileSync(path.join(__dirname, "src/styles/main.css"), path.join(DIST, "assets/main.css"));
  fs.copyFileSync(path.join(__dirname, "src/scripts/main.js"), path.join(DIST, "assets/main.js"));

  const assetsSrc = path.join(__dirname, "assets");
  if (fs.existsSync(assetsSrc)) {
    for (const file of fs.readdirSync(assetsSrc)) {
      fs.copyFileSync(path.join(assetsSrc, file), path.join(DIST, "assets", file));
    }
  }
}

function main() {
  fs.rmSync(DIST, { recursive: true, force: true });
  ensureDir(DIST);
  copyAssets();
  pages.forEach(writePage);
  writeSitemap();
  writeRobots();
  console.log("\nBuild complete →", DIST);
}

main();

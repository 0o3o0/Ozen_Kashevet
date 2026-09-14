function waHref(config) {
  const digits = String(config.whatsappNumber || "").replace(/[^0-9]/g, "");
  const text = encodeURIComponent(config.whatsappMessage || "");
  if (!digits) return `https://wa.me/?text=${text}`; // placeholder-safe fallback
  return `https://wa.me/${digits}?text=${text}`;
}

function telHref(config) {
  const raw = String(config.phoneHref || "").trim();
  return `tel:${raw}`;
}

function isPlaceholder(v) {
  return !v || /^\[.*\]$/.test(String(v).trim());
}

function hasGeo(config) {
  return typeof config.geo.lat === "number" && typeof config.geo.lng === "number";
}

// Shared by the home-page map square and the /contact/ page map, so
// both always agree on where the pin sits and how confident we are
// in it (exact geo vs. a text-address search).
function mapEmbedQuery(config) {
  const geoKnown = hasGeo(config);
  const addressKnown = !isPlaceholder(config.address.full);
  const query = geoKnown
    ? `${config.geo.lat},${config.geo.lng}`
    : `${config.address.full} ${config.address.city}`;
  return {
    show: geoKnown || addressKnown,
    isDemoPin: geoKnown && !addressKnown,
    embedSrc: `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${geoKnown ? 15 : 16}&output=embed`,
    directionsHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
  };
}

// Waze deep link. Prefers exact coordinates (ll=lat,lng); falls back
// to a text-address search when geo isn't set yet. Works both as a
// mobile deep link (opens the Waze app if installed) and as a plain
// web link otherwise.
function wazeHref(config) {
  if (hasGeo(config)) {
    return `https://waze.com/ul?ll=${config.geo.lat}%2C${config.geo.lng}&navigate=yes`;
  }
  const q = encodeURIComponent(`${config.address.full} ${config.address.city}`);
  return `https://waze.com/ul?q=${q}&navigate=yes`;
}

function jsonLdScript(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj, null, 2)}</script>`;
}

function absUrl(config, path) {
  return config.siteUrl.replace(/\/$/, "") + path;
}

function breadcrumbLd(config, items) {
  // items: [{ name, path }]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(config, item.path),
    })),
  };
}

module.exports = { waHref, telHref, wazeHref, mapEmbedQuery, jsonLdScript, absUrl, breadcrumbLd };

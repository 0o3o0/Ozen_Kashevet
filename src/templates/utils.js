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

module.exports = { waHref, telHref, jsonLdScript, absUrl, breadcrumbLd };

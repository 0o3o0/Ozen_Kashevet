const icons = require("./icons");
const { waHref, telHref, jsonLdScript, absUrl } = require("./utils");

// A set of overlapping sine waves at different "frequencies" — an
// abstract nod to sound/audiometry, not a labelled clinical chart.
function heroWave() {
  return `
  <svg class="hero__wave" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="איור גלי קול">
    <path d="M10 120 Q 42 40, 74 120 T 138 120 T 202 120 T 266 120 T 310 120" stroke="currentColor" stroke-width="2.5" opacity="0.9"/>
    <path d="M10 150 Q 34 100, 58 150 T 106 150 T 154 150 T 202 150 T 250 150 T 298 150" stroke="currentColor" stroke-width="1.6" opacity="0.45"/>
    <path d="M10 90 Q 46 10, 82 90 T 154 90 T 226 90 T 298 90" stroke="currentColor" stroke-width="1.6" opacity="0.3"/>
    <circle cx="272" cy="60" r="3" fill="currentColor" opacity="0.5"/>
    <circle cx="46" cy="182" r="3" fill="currentColor" opacity="0.5"/>
  </svg>`;
}

function navItems(config, pages, currentSlug) {
  return pages
    .filter((p) => p.inNav !== false)
    .map(
      (p) =>
        `<a href="${p.path}"${p.slug === currentSlug ? ' aria-current="page"' : ""}>${p.navLabel || p.title}</a>`
    )
    .join("\n");
}

function header(config, pages, currentSlug) {
  return `
  <header class="site-header">
    <div class="site-header__bar">
      <a class="brand" href="/">
        <span class="brand__mark">${icons.waveform}</span>
        <span class="brand__name">${config.clinicName}</span>
      </a>
      <nav class="site-nav" aria-label="ניווט ראשי">
        ${navItems(config, pages, currentSlug)}
      </nav>
      <div class="header-cta">
        <a class="btn btn--ghost btn--sm" href="${telHref(config)}" data-track="phone_click" data-track-location="header">${icons.phone} ${config.phoneDisplay}</a>
        <a class="btn btn--primary btn--sm" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="header">${icons.whatsapp} קביעת תור בוואטסאפ</a>
      </div>
      <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="פתיחת תפריט ניווט">☰</button>
    </div>
  </header>`;
}

function stickyMobileCta(config) {
  return `
  <div class="mobile-cta-bar" role="region" aria-label="יצירת קשר מהירה">
    <a class="btn btn--primary" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="sticky_bar">${icons.whatsapp} קביעת תור בוואטסאפ</a>
    <a class="btn btn--gold" href="${telHref(config)}" data-track="phone_click" data-track-location="sticky_bar">${icons.phone} התקשרו עכשיו</a>
  </div>`;
}

function footer(config, pages) {
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div>
        <h4>${config.clinicName}</h4>
        <p>${config.description}</p>
        <p>${config.address.full}${config.address.city ? ", " + config.address.city : ""}</p>
      </div>
      <div>
        <h4>ניווט</h4>
        <ul>
          ${pages
            .filter((p) => p.inNav !== false)
            .map((p) => `<li><a href="${p.path}">${p.navLabel || p.title}</a></li>`)
            .join("\n")}
        </ul>
      </div>
      <div>
        <h4>יצירת קשר</h4>
        <ul>
          <li><a href="${telHref(config)}" data-track="phone_click" data-track-location="footer">${config.phoneDisplay}</a></li>
          <li><a href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="footer">וואטסאפ</a></li>
          <li><a href="mailto:${config.email}">${config.email}</a></li>
        </ul>
      </div>
    </div>
    <div class="container footer-bottom">
      © ${year} ${config.clinicName}. כל הזכויות שמורות. תוכן האתר אינו מהווה ייעוץ רפואי ואינו מחליף בדיקה וייעוץ אצל איש מקצוע מוסמך.
    </div>
  </footer>`;
}

function analyticsScripts(config) {
  const ga4 = config.analytics.ga4MeasurementId;
  const isPlaceholder = !ga4 || /^\[.*\]$/.test(ga4);
  if (isPlaceholder) {
    // No real GA4 ID yet — load nothing, but still expose the config
    // object main.js expects, and keep dataLayer available so events
    // queue up harmlessly until a real ID is added.
    return `
    <script>window.dataLayer = window.dataLayer || [];</script>
    <script>window.__CLINIC_ANALYTICS__ = ${JSON.stringify({
      googleAdsConversionId: config.analytics.googleAdsConversionId,
      conversionLabels: config.analytics.conversionLabels,
    })};</script>`;
  }
  return `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ga4}');
      ${config.analytics.googleAdsConversionId && !/^\[.*\]$/.test(config.analytics.googleAdsConversionId)
        ? `gtag('config', '${config.analytics.googleAdsConversionId}');`
        : ""}
      window.__CLINIC_ANALYTICS__ = ${JSON.stringify({
        googleAdsConversionId: config.analytics.googleAdsConversionId,
        conversionLabels: config.analytics.conversionLabels,
      })};
    </script>`;
}

function breadcrumbsHtml(items) {
  if (!items || items.length < 2) return "";
  return `
  <nav class="container breadcrumbs" aria-label="פירורי לחם">
    ${items
      .map((item, i) =>
        i < items.length - 1
          ? `<a href="${item.path}">${item.name}</a><span class="sep">/</span>`
          : `<span aria-current="page">${item.name}</span>`
      )
      .join("\n")}
  </nav>`;
}

function renderPage(config, pages, page, { contentHtml, jsonLd = [], breadcrumbs = [] }) {
  const canonical = absUrl(config, page.path);
  const title = `${page.title} | ${config.clinicName}`;
  const metaDescription = page.description;
  const ogImage = absUrl(config, config.socialImage);

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="${metaDescription}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="${page.noindex ? "noindex, nofollow" : "index, follow"}" />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="he_IL" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${metaDescription}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:site_name" content="${config.clinicName}" />
  <meta name="twitter:card" content="summary_large_image" />

  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;600;700&family=Assistant:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/assets/main.css" />

  ${jsonLd.map(jsonLdScript).join("\n")}
  ${analyticsScripts(config)}
</head>
<body>
  <a class="skip-link" href="#main">דלג לתוכן הראשי</a>
  ${header(config, pages, page.slug)}
  ${breadcrumbsHtml(breadcrumbs)}
  <main id="main">
    ${contentHtml}
  </main>
  ${footer(config, pages)}
  ${stickyMobileCta(config)}
  <script src="/assets/main.js" defer></script>
</body>
</html>`;
}

module.exports = { renderPage, heroWave };

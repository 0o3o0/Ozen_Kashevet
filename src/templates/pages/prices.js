const icons = require("../icons");
const { waHref, telHref } = require("../utils");

const slug = "prices";
const path = "/prices/";
const title = "מחירון";
const description = "מחירי בדיקת שמיעה וטימפנומטריה במכון [CLINIC_NAME] ביבנה.";
const navLabel = "מחירים";

function render(config) {
  const rows = [
    { label: "בדיקת שמיעה (מבוגרים)", value: config.pricing.hearingTest },
    { label: "בדיקת שמיעה (ילדים מגיל 5)", value: config.pricing.childrenHearingTest },
    { label: "טימפנומטריה", value: config.pricing.tympanometry },
  ];
  return `
  <section class="section" style="padding-top:24px;">
    <div class="container">
      <p class="eyebrow">${icons.document} מחירון</p>
      <h1>מחירי הבדיקות</h1>
      ${
        config.pricing.confirmed
          ? `<div class="card" style="max-width:520px;">
              ${rows
                .map(
                  (r) => `<div class="price-row"><span>${r.label}</span><span class="price-row__amount">${r.value}</span></div>`
                )
                .join("\n")}
            </div>
            <p style="margin-top:16px;">המחירים הינם למבוטח/ת פרטי/ת. הסדרים מול קופות חולים: ${config.clalitStatus} · ${config.otherHmoStatus}.</p>`
          : `<div class="price-note" style="max-width:560px;">
              מחירי הבדיקות מתעדכנים כעת ויפורסמו כאן בקרוב. לקבלת מחיר עדכני ניתן לפנות בוואטסאפ או בטלפון.
            </div>`
      }
      <div class="hero__ctas" style="margin-top:24px;">
        <a class="btn btn--primary" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="prices_page">${icons.whatsapp} בירור מחיר בוואטסאפ</a>
        <a class="btn btn--ghost" href="${telHref(config)}" data-track="phone_click" data-track-location="prices_page">${icons.phone} התקשרו עכשיו</a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, render };

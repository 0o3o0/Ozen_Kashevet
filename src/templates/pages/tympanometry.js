const icons = require("../icons");
const { waHref, telHref } = require("../utils");

const slug = "tympanometry";
const path = "/tympanometry/";
const title = "טימפנומטריה בתל אביב";
const description =
  "בדיקת טימפנומטריה בתל אביב — בדיקת תפקוד האוזן התיכונה ועור התוף, לבד או בשילוב עם בדיקת שמיעה.";
const navLabel = "טימפנומטריה";

function render(config) {
  return `
  <section class="section" style="padding-top:24px;">
    <div class="container">
      <p class="eyebrow">${icons.tympanometry} טימפנומטריה</p>
      <h1>טימפנומטריה בתל אביב</h1>
      <p class="lede">בדיקת טימפנומטריה בוחנת את תפקוד האוזן התיכונה ועור התוף, ומבוצעת לבד או בשילוב עם בדיקת שמיעה.</p>
      <div class="hero__ctas">
        <a class="btn btn--primary" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="tympanometry_page">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" href="${telHref(config)}" data-track="phone_click" data-track-location="tympanometry_page">${icons.phone} התקשרו עכשיו</a>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container grid grid--2">
      <div class="card">
        <h2 class="mt-0">מה בודקת טימפנומטריה?</h2>
        <p>הבדיקה מודדת את תגובת עור התוף לשינויי לחץ אוויר, ומספקת מידע על תפקוד האוזן התיכונה — למשל נוכחות נוזלים או בעיה בתנועת עור התוף.</p>
        <p>הבדיקה קצרה, אינה כואבת ומתאימה למבוגרים ולילדים.</p>
      </div>
      <div class="card">
        <h2 class="mt-0">מה ההבדל מבדיקת שמיעה?</h2>
        <p>בדיקת שמיעה (אודיומטריה) בוחנת את יכולת השמיעה בתדרים שונים. טימפנומטריה בוחנת את תפקוד האוזן התיכונה עצמה, ולעיתים מבוצעת כהשלמה לבדיקת השמיעה כדי לקבל תמונה מלאה יותר.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>מחיר טימפנומטריה</h2>
      ${
        config.pricing.confirmed
          ? `<div class="card" style="max-width:420px;"><div class="price-row"><span>טימפנומטריה</span><span class="price-row__amount">${config.pricing.tympanometry}</span></div></div>`
          : `<div class="price-note">מחיר בדיקת טימפנומטריה מתעדכן כעת. ניתן לפנות בוואטסאפ או בטלפון לקבלת מחיר עדכני.</div>`
      }
    </div>
  </section>

  <section class="section section--teal">
    <div class="container text-center">
      <h2>לקביעת תור לטימפנומטריה</h2>
      <div class="hero__ctas" style="justify-content:center;">
        <a class="btn btn--gold" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="tympanometry_cta">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" style="border-color:#fff;color:#fff;" href="${telHref(config)}" data-track="phone_click" data-track-location="tympanometry_cta">${icons.phone} ${config.phoneDisplay}</a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, render };

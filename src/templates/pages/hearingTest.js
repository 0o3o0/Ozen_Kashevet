const icons = require("../icons");
const { waHref, telHref } = require("../utils");

const slug = "hearing-test";
const path = "/hearing-test/";
const title = "בדיקת שמיעה בתל אביב";
const description =
  "בדיקת שמיעה פרטית בתל אביב למבוגרים — אודיומטריה על ידי קלינאי/ת תקשורת מוסמכ/ת, תוצאות והסבר בתום הבדיקה.";
const navLabel = "בדיקת שמיעה";

function render(config) {
  return `
  <section class="section" style="padding-top:24px;">
    <div class="container">
      <p class="eyebrow">${icons.ear} בדיקת שמיעה</p>
      <h1>בדיקת שמיעה בתל אביב</h1>
      <p class="lede">מכון ${config.clinicName} מבצע בדיקות שמיעה בתל אביב למבוגרים, הכוללות אודיומטריה ובחינת תפקוד השמיעה.</p>
      <div class="hero__ctas">
        <a class="btn btn--primary" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="hearing_test_page">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" href="${telHref(config)}" data-track="phone_click" data-track-location="hearing_test_page">${icons.phone} התקשרו עכשיו</a>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container grid grid--2">
      <div class="card">
        <h2 class="mt-0">מה כוללת בדיקת השמיעה?</h2>
        <ul>
          <li>שיחת רקע קצרה על תלונות ורקע רפואי רלוונטי</li>
          <li>בדיקת אודיומטריה בתדרים שונים</li>
          <li>בדיקת טימפנומטריה, כאשר יש לכך צורך קליני</li>
          <li>הסבר על התוצאות בתום הבדיקה</li>
        </ul>
        <p>הבדיקה מתבצעת על ידי קלינאי/ת תקשורת מוסמכ/ת, בציוד אודיולוגי קליני.</p>
      </div>
      <div class="card">
        <h2 class="mt-0">מתאים ל...</h2>
        <ul>
          <li>מי שחש/ה ירידה בשמיעה</li>
          <li>בדיקת שמיעה תקופתית</li>
          <li>הכנה לבדיקות תעסוקתיות (בהתאם לדרישה)</li>
          <li>מעקב לאחר טיפול או ניתוח, בהתאם להנחיית רופא/ה</li>
        </ul>
        <p>הבדיקה אינה מהווה אבחנה רפואית ואינה מחליפה ייעוץ רפואי.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>מחיר בדיקת שמיעה פרטית</h2>
      ${
        config.pricing.confirmed
          ? `<div class="card" style="max-width:420px;"><div class="price-row"><span>בדיקת שמיעה</span><span class="price-row__amount">${config.pricing.hearingTest}</span></div></div>`
          : `<div class="price-note">מחיר בדיקת שמיעה פרטית מתעדכן כעת. ניתן לפנות בוואטסאפ או בטלפון לקבלת מחיר עדכני.</div>`
      }
      <p style="margin-top:16px;">הסדרים מול קופות חולים: ${config.clalitStatus} · ${config.otherHmoStatus}</p>
    </div>
  </section>

  <section class="section section--indigo">
    <div class="container text-center">
      <h2>לקביעת תור לבדיקת שמיעה</h2>
      <div class="hero__ctas" style="justify-content:center;">
        <a class="btn btn--gold" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="hearing_test_cta">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" style="border-color:#fff;color:#fff;" href="${telHref(config)}" data-track="phone_click" data-track-location="hearing_test_cta">${icons.phone} ${config.phoneDisplay}</a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, render };

const icons = require("../icons");
const { waHref, telHref } = require("../utils");

const slug = "children-hearing-test";
const path = "/children-hearing-test/";
const title = "בדיקת שמיעה לילדים בתל אביב";
const description =
  "בדיקת שמיעה לילדים מגיל 5 בתל אביב, בסביבה נעימה ורגועה — אודיומטריה וטימפנומטריה, עם הסבר להורים בתום הבדיקה.";
const navLabel = "בדיקה לילדים";

function render(config) {
  return `
  <section class="section" style="padding-top:24px;">
    <div class="container">
      <p class="eyebrow">${icons.child} לילדים מגיל 5</p>
      <h1>בדיקת שמיעה לילדים בתל אביב</h1>
      <p class="lede">בדיקות שמיעה לילדים מגיל 5, בסביבה נעימה ורגועה, עם הסבר מסודר להורים בתום התהליך.</p>
      <div class="hero__ctas">
        <a class="btn btn--primary" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="children_page">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" href="${telHref(config)}" data-track="phone_click" data-track-location="children_page">${icons.phone} התקשרו עכשיו</a>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container grid grid--2">
      <div class="card">
        <h2 class="mt-0">איך נראית הבדיקה?</h2>
        <ul>
          <li>שיחת היכרות קצרה עם הילד/ה וההורים</li>
          <li>הסבר לילד/ה על מהלך הבדיקה, בהתאם לגיל</li>
          <li>בדיקת אודיומטריה</li>
          <li>טימפנומטריה, כאשר יש לכך צורך קליני</li>
          <li>הסבר להורים על התוצאות בתום הבדיקה</li>
        </ul>
      </div>
      <div class="card">
        <h2 class="mt-0">מתי מומלץ לבדוק?</h2>
        <ul>
          <li>חשש להורים בנוגע לשמיעת הילד/ה</li>
          <li>קשיים בדיבור או בשפה</li>
          <li>בדיקה תקופתית או המלצת גורם מטפל</li>
          <li>הכנה לתהליך מול ועדת זכאות ואפיון</li>
        </ul>
        <p>ראו גם: <a href="/special-education-hearing-test/">בדיקת שמיעה לקראת ועדת זכאות ואפיון</a>.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>מחיר בדיקת שמיעה לילדים</h2>
      ${
        config.pricing.confirmed
          ? `<div class="card" style="max-width:420px;"><div class="price-row"><span>בדיקת שמיעה לילדים</span><span class="price-row__amount">${config.pricing.childrenHearingTest}</span></div></div>`
          : `<div class="price-note">מחיר בדיקת שמיעה לילדים מתעדכן כעת. ניתן לפנות בוואטסאפ או בטלפון לקבלת מחיר עדכני.</div>`
      }
    </div>
  </section>

  <section class="section section--teal">
    <div class="container text-center">
      <h2>לקביעת תור לבדיקת שמיעה לילד/ה</h2>
      <div class="hero__ctas" style="justify-content:center;">
        <a class="btn btn--gold" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="children_cta">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" style="border-color:#fff;color:#fff;" href="${telHref(config)}" data-track="phone_click" data-track-location="children_cta">${icons.phone} ${config.phoneDisplay}</a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, render };

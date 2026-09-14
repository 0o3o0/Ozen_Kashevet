const icons = require("../icons");
const { waHref, telHref } = require("../utils");

const slug = "special-education";
const path = "/special-education-hearing-test/";
const title = "בדיקת שמיעה לוועדת זכאות ואפיון";
const description =
  "בדיקת שמיעה בתל אביב עם דוח כתוב, לצורך הצגה כחלק מתהליך מול ועדת זכאות ואפיון בחינוך המיוחד.";
const navLabel = "ועדת זכאות ואפיון";

function render(config) {
  return `
  <section class="section" style="padding-top:24px;">
    <div class="container">
      <p class="eyebrow">${icons.document} הורים בתהליך ועדה</p>
      <h1>בדיקת שמיעה לקראת ועדת זכאות ואפיון</h1>
      <p class="lede">בדיקת שמיעה ודוח כתוב, שניתן להציג כחלק מהמסמכים בתהליך מול ועדת זכאות ואפיון.</p>
      <div class="hero__ctas">
        <a class="btn btn--primary" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="special_ed_page">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" href="${telHref(config)}" data-track="phone_click" data-track-location="special_ed_page">${icons.phone} התקשרו עכשיו</a>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="disabled-note">
        <strong>חשוב לדעת:</strong> תהליכי ועדות זכאות ואפיון שונים ממקרה למקרה, ולא כל ועדה דורשת את אותם מסמכים או אותו סוג בדיקה. מומלץ לבדוק מראש מול הגורם המטפל או מול צוות בית הספר אילו מסמכים נדרשים במקרה הספציפי, לפני קביעת תור. המכון אינו מספק ייעוץ משפטי או חינוכי בנוגע לתהליך הוועדה עצמו.
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container grid grid--2">
      <div class="card">
        <h2 class="mt-0">מה כוללת הבדיקה?</h2>
        <ul>
          <li>בדיקת אודיומטריה מותאמת לגיל הילד/ה</li>
          <li>טימפנומטריה, כאשר יש לכך צורך קליני</li>
          <li>דוח כתוב עם ממצאי הבדיקה</li>
        </ul>
      </div>
      <div class="card">
        <h2 class="mt-0">לפני שקובעים תור</h2>
        <ul>
          <li>ודאו מול הגורם הרלוונטי אילו מסמכים נדרשים לוועדה</li>
          <li>ספרו לנו על כך בעת קביעת התור, כדי שנוכל להתאים את הדוח לצורך</li>
          <li>שמרו העתק של הדוח שיינתן בסיום הבדיקה</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--indigo">
    <div class="container text-center">
      <h2>לקביעת תור עם דוח לוועדה</h2>
      <div class="hero__ctas" style="justify-content:center;">
        <a class="btn btn--gold" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="special_ed_cta">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" style="border-color:#fff;color:#fff;" href="${telHref(config)}" data-track="phone_click" data-track-location="special_ed_cta">${icons.phone} ${config.phoneDisplay}</a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, render };

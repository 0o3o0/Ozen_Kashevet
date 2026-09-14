const icons = require("../icons");

const slug = "privacy-policy";
const path = "/privacy-policy/";
const title = "מדיניות פרטיות";
const description = "מדיניות הפרטיות של מכון [CLINIC_NAME] ביבנה — אילו פרטים נאספים באתר וכיצד נעשה בהם שימוש.";
const navLabel = "מדיניות פרטיות";
const inNav = false; // footer-only link

function isPlaceholder(v) {
  return !v || /^\[.*\]$/.test(String(v).trim());
}

function render(config) {
  const ga4Configured = !isPlaceholder(config.analytics.ga4MeasurementId);
  return `
  <section class="section" style="padding-top:24px;">
    <div class="container">
      <p class="eyebrow">${icons.document} פרטיות</p>
      <h1>מדיניות פרטיות</h1>
      <p class="lede">מדיניות זו מסבירה אילו פרטים מכון ${config.clinicName} (${config.privacyPolicy.businessId}) אוסף באתר, לשם מה, וכיצד ניתן לפנות בנושא.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container" style="max-width:760px;">
      <h2>איזה מידע נאסף</h2>
      <ul>
        <li>פרטים שמוזנים ביוזמתכם בטופס יצירת קשר: שם, טלפון, ולעיתים תוכן הודעה חופשית.</li>
        <li>פרטים הנמסרים בעת יצירת קשר טלפוני או בהודעת וואטסאפ, לצורך תיאום תור.</li>
        <li>נתוני שימוש טכניים ואנונימיים באתר (כגון עמודים שנצפו), ${
          ga4Configured
            ? "הנאספים באמצעות Google Analytics לצורכי סטטיסטיקה ושיפור השירות."
            : "ככל שייעשה שימוש בכלי ניתוח כגון Google Analytics בעתיד."
        }</li>
      </ul>

      <h2>מטרת השימוש במידע</h2>
      <p>המידע משמש אך ורק לצורך תיאום ומתן השירות המבוקש (קביעת תור, מענה לפנייה), שיפור האתר והשירות, ותקשורת עמכם בנוגע לבדיקה שנקבעה. המידע אינו נמכר לצדדים שלישיים.</p>

      <h2>מסירת מידע לצדדים שלישיים</h2>
      <p>המידע אינו מועבר לצדדים שלישיים, למעט ככל שנדרש על פי דין, או לצורך הפעלת שירותים טכניים המשמשים את האתר (כגון שירותי ניתוח נתונים סטטיסטיים אנונימיים).</p>

      <h2>עוגיות (Cookies)</h2>
      <p>${
        ga4Configured
          ? "האתר משתמש בעוגיות של Google Analytics לצורך איסוף נתוני שימוש סטטיסטיים ואנונימיים. ניתן לחסום עוגיות אלה באמצעות הגדרות הדפדפן."
          : "נכון לעת עדכון מדיניות זו, האתר אינו עושה שימוש בכלי מעקב הדורשים עוגיות. ככל שהדבר ישתנה בעתיד (למשל בשילוב Google Analytics או Google Ads), מדיניות זו תעודכן בהתאם."
      }</p>

      <h2>אבטחת מידע</h2>
      <p>אנו נוקטים באמצעים סבירים ומקובלים כדי לשמור על אבטחת המידע הנמסר, אך אין באפשרותנו להתחייב לחסינות מוחלטת מפני גישה בלתי מורשית.</p>

      <h2>זכות עיון ותיקון</h2>
      <p>בהתאם לחוק הגנת הפרטיות, התשמ"א-1981, כל אדם שמידע עליו נמצא ברשותנו זכאי לעיין בו, ובמידת הצורך לבקש את תיקונו או מחיקתו, בפנייה לפרטי הקשר המפורטים מטה.</p>

      <h2>יצירת קשר בנושא פרטיות</h2>
      <ul class="info-list">
        <li>${icons.phone} <span>${config.phoneDisplay}</span></li>
        <li>${icons.document} <span>${config.email}</span></li>
      </ul>

      <p style="font-size:.85rem;color:var(--ink-faint);margin-top:24px;">עודכן לאחרונה: ${config.privacyPolicy.lastUpdatedDate}.</p>
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, inNav, render };

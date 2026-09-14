const icons = require("../icons");

const slug = "accessibility-statement";
const path = "/accessibility-statement/";
const title = "הצהרת נגישות";
const description = "הצהרת נגישות לאתר ולמכון [CLINIC_NAME] ביבנה, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות.";
const navLabel = "הצהרת נגישות";
const inNav = false; // footer-only link, not in the primary header nav

function isPlaceholder(v) {
  return !v || /^\[.*\]$/.test(String(v).trim());
}

function render(config) {
  const a11y = config.accessibilityStatement;
  return `
  <section class="section" style="padding-top:24px;">
    <div class="container">
      <p class="eyebrow">${icons.accessibility} נגישות</p>
      <h1>הצהרת נגישות</h1>
      <p class="lede">מכון ${config.clinicName} רואה חשיבות רבה במתן שירות שוויוני, מכבד ונגיש לכלל הציבור, לרבות אנשים עם מוגבלות.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container" style="max-width:760px;">
      <h2>נגישות האתר</h2>
      <p>אתר זה נבנה תוך שאיפה לעמידה בתקן הישראלי ת"י 5568 להנגשת תכנים באינטרנט, ברמת AA, המבוסס על הנחיות WCAG 2.0 הבינלאומיות. בין היתר הושם דגש על: מבנה סמנטי וברור, תמיכה מלאה בניווט מקלדת, טקסטים חלופיים לתמונות, ניגודיות צבעים נאותה, ותאימות RTL מלאה לעברית.</p>

      <div class="card" style="margin-top:8px;">
        <h3 class="mt-0">סטטוס הבדיקה</h3>
        ${
          a11y.audited
            ? `<p>האתר נבדק ואומת על ידי ${a11y.auditorName}, בתאריך ${a11y.auditDate}.</p>`
            : `<p><strong>שימו לב:</strong> נכון לעכשיו בוצעה בהתאם למיטב הידע סקירה עצמית של האתר מול הנחיות הנגישות. טרם בוצעה בדיקה על ידי בודק נגישות מוסמך חיצוני. הצהרה זו תעודכן בהתאם לאחר ביצוע בדיקה כזו.</p>`
        }
        <p>תאריך העדכון האחרון של הצהרה זו: ${a11y.lastReviewedDate}.</p>
      </div>

      <h2>נגישות המכון (חלל פיזי)</h2>
      <p>${config.accessibilityConfirmed ? config.accessibilityInfo : "פרטי הנגישות הפיזית המלאים של המכון (כניסה, חניית נכים והתאמות במקום) מתעדכנים כעת ויפורסמו כאן."}</p>

      <h2>פנייה בנושא נגישות</h2>
      <p>נתקלתם בבעיית נגישות באתר או במכון, או שיש לכם הצעה לשיפור? נשמח שתפנו לרכז/ת הנגישות מטעמנו:</p>
      <ul class="info-list">
        <li>${icons.check} <span>${a11y.coordinatorName}</span></li>
        <li>${icons.phone} <span>${a11y.coordinatorPhone}</span></li>
        <li>${icons.document} <span>${a11y.coordinatorEmail}</span></li>
      </ul>
      ${
        isPlaceholder(a11y.coordinatorName)
          ? `<p style="font-size:.85rem;color:var(--ink-faint);">לתשומת לב הצוות: יש למנות רכז/ת נגישות ולמלא את הפרטים לעיל לפני עלייה לאוויר — ראו CHECKLIST.md.</p>`
          : ""
      }
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, inNav, render };

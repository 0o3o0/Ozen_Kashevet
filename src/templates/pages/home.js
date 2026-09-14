const icons = require("../icons");
const { waHref, telHref } = require("../utils");
const { heroWave } = require("../layout");

const slug = "home";
const path = "/";
const title = "בדיקות שמיעה בתל אביב";
const description =
  "מכון בדיקות שמיעה בתל אביב למבוגרים ולילדים מגיל 5 — אודיומטריה וטימפנומטריה, תוצאות ודוח מסודר. קביעת תור בוואטסאפ או בטלפון.";
const navLabel = "בית";

function servicesList(config) {
  const items = [
    {
      icon: icons.ear,
      title: "בדיקת שמיעה",
      text: "בדיקת שמיעה מקיפה למבוגרים, הכוללת אודיומטריה ובחינת תפקוד השמיעה.",
      link: "/hearing-test/",
    },
    {
      icon: icons.child,
      title: "בדיקת שמיעה לילדים מגיל 5",
      text: "בדיקה מותאמת לילדים, בסביבה נעימה ורגועה, עם הסבר להורים בתום התהליך.",
      link: "/children-hearing-test/",
    },
    {
      icon: icons.tympanometry,
      title: "טימפנומטריה",
      text: "בדיקת תפקוד האוזן התיכונה ועור התוף, בשילוב עם בדיקת השמיעה או בנפרד.",
      link: "/tympanometry/",
    },
    {
      icon: icons.document,
      title: "בדיקה לקראת ועדת זכאות ואפיון",
      text: "בדיקת שמיעה ודוח כתוב שניתן להציג כחלק מתהליך מול ועדת זכאות ואפיון.",
      link: "/special-education-hearing-test/",
    },
  ];
  if (config.entEnabled) {
    items.push({
      icon: icons.ear,
      title: "רפואת אא\"ג",
      text: "ייעוץ וטיפול אצל רופא/ת אא\"ג הפועל/ת במכון.",
      link: "/ent/",
    });
  }
  return items
    .map(
      (s) => `
    <div class="card service-card">
      <span class="service-card__icon">${s.icon}</span>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      <a class="service-card__link" href="${s.link}">לפרטים נוספים</a>
    </div>`
    )
    .join("\n");
}

function trustBar(config) {
  return `
  <div class="hero__trust">
    <span class="trust-item">${icons.check} קלינאי תקשורת מורשים</span>
    <span class="trust-item">${icons.tympanometry} ציוד אודיולוגי קליני</span>
    <span class="trust-item">${icons.accessibility} נגישות</span>
    <span class="trust-item">${icons.document} תוצאות ודוח מסודר</span>
  </div>`;
}

function howItWorks() {
  const steps = [
    { n: 1, t: "קובעים תור", d: "בוואטסאפ או בטלפון, בזמן שנוח לכם." },
    { n: 2, t: "מגיעים למכון", d: `${"[ADDRESS]"} בתל אביב, נגיש ופשוט להגעה.` },
    { n: 3, t: "מבצעים את הבדיקה", d: "קלינאי/ת תקשורת מבצע/ת את הבדיקה בציוד אודיולוגי קליני." },
    { n: 4, t: "מקבלים תוצאות והסבר", d: "הסבר ברור על הממצאים, בתום הבדיקה." },
  ];
  return steps
    .map(
      (s) => `
    <div class="step">
      <div class="step__num">${s.n}</div>
      <div>
        <h3 class="mt-0">${s.t}</h3>
        <p>${s.d}</p>
      </div>
    </div>`
    )
    .join("\n");
}

function childrenSection() {
  return `
  <div class="grid grid--2" style="align-items:center;">
    <div>
      <p class="eyebrow">${icons.child} להורים</p>
      <h2>צריכים בדיקת שמיעה לילד?</h2>
      <p class="lede">בדיקות שמיעה לילדים מגיל 5, בסביבה נעימה ורגועה המותאמת לילדים.</p>
      <ul>
        <li>אודיומטריה מותאמת לגיל הילד</li>
        <li>טימפנומטריה, כאשר יש לכך צורך קליני</li>
        <li>תוצאות בכתב עם הסבר להורים</li>
      </ul>
      <p>תהליכי ועדות זכאות ואפיון שונים זה מזה, ולא כל ועדה דורשת את אותם המסמכים — מומלץ לבדוק מראש מול הגורם הרלוונטי אילו מסמכים נדרשים במקרה הספציפי.</p>
      <a class="btn btn--primary" href="/children-hearing-test/">בדיקת שמיעה לילדים</a>
    </div>
    <div class="card">
      <h3 class="mt-0">מה כוללת הבדיקה?</h3>
      <ul>
        <li>שיחת היכרות קצרה עם הילד/ה וההורים</li>
        <li>בדיקת אודיומטריה</li>
        <li>טימפנומטריה במידת הצורך</li>
        <li>הסבר על התוצאות בסיום הבדיקה</li>
      </ul>
    </div>
  </div>`;
}

function faqItems(config) {
  const items = [
    {
      q: "כמה זמן נמשכת בדיקת שמיעה?",
      a: "משך הבדיקה משתנה בהתאם לסוג הבדיקה ולגיל הנבדק/ת. פרטים מדויקים יימסרו בעת קביעת התור.",
    },
    {
      q: "מאיזה גיל ניתן לבצע בדיקת שמיעה?",
      a: "המכון מבצע בדיקות שמיעה למבוגרים ולילדים מגיל 5 ומעלה.",
    },
    {
      q: "מה ההבדל בין בדיקת שמיעה לטימפנומטריה?",
      a: "בדיקת שמיעה (אודיומטריה) בוחנת את יכולת השמיעה בתדרים שונים. טימפנומטריה בוחנת את תפקוד האוזן התיכונה ועור התוף, ולעיתים מבוצעת בנוסף לבדיקת השמיעה.",
    },
    {
      q: "האם צריך הפניה?",
      a: `בדיקה פרטית אינה דורשת הפניה. לגבי בדיקות במסגרת קופת חולים: ${config.clalitStatus}.`,
    },
    {
      q: "כמה עולה בדיקת שמיעה פרטית?",
      a: config.pricing.confirmed
        ? `עלות בדיקת שמיעה פרטית עומדת על ${config.pricing.hearingTest}. מחיר מלא מפורט בעמוד המחירים.`
        : "מחירי הבדיקות מתעדכנים כעת. ניתן לפנות בוואטסאפ או בטלפון לקבלת מחיר עדכני.",
    },
    {
      q: "האם מקבלים תוצאות במקום?",
      a: "כן, בתום הבדיקה ניתן הסבר על הממצאים. ככל שנדרש דוח כתוב, ניתן לבקש זאת מראש.",
    },
    {
      q: "האם המכון נגיש?",
      a: config.accessibilityConfirmed
        ? config.accessibilityInfo
        : "פרטי הנגישות המלאים של המכון מתעדכנים כעת. ניתן לברר מראש בטלפון או בוואטסאפ.",
    },
    {
      q: "איך מגיעים בתחבורה ציבורית?",
      a: `פרטי תחבורה ציבורית ומרחק מהתחנה הקרובה: ${config.distanceFromTrainStation}. פרטים מלאים בעמוד "צור קשר".`,
    },
  ];
  return items
    .map(
      (item, i) => `
    <details class="faq-item" ${i === 0 ? "open" : ""}>
      <summary>${item.q}</summary>
      <p>${item.a}</p>
    </details>`
    )
    .join("\n");
}

function render(config) {
  return `
  <section class="hero">
    <div class="container hero__grid">
      <div>
        <p class="eyebrow">${icons.pin} בדיקות שמיעה בתל אביב</p>
        <h1>בדיקות שמיעה בתל אביב</h1>
        <p class="lede">בדיקות שמיעה למבוגרים ולילדים מגיל 5, כולל אודיומטריה וטימפנומטריה.</p>
        <div class="hero__ctas">
          <a class="btn btn--primary" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="hero">${icons.whatsapp} קביעת תור בוואטסאפ</a>
          <a class="btn btn--ghost" href="${telHref(config)}" data-track="phone_click" data-track-location="hero">${icons.phone} התקשרו עכשיו</a>
        </div>
        ${trustBar(config)}
      </div>
      ${heroWave()}
    </div>
  </section>

  <section class="section">
    <div class="container">
      <p class="eyebrow">השירותים שלנו</p>
      <h2>בדיקות שמיעה וטימפנומטריה בתל אביב</h2>
      <p class="lede">מכון ${config.clinicName} מבצע בדיקות שמיעה בתל אביב למבוגרים ולילדים מגיל 5.</p>
      <div class="grid grid--4" style="margin-top:28px;">
        ${servicesList(config)}
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <p class="eyebrow">${icons.clock} איך זה עובד</p>
      <h2>מהקביעה ועד לתוצאות</h2>
      <div class="grid grid--2" style="margin-top:24px;">
        ${howItWorks()}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${childrenSection()}
    </div>
  </section>

  <section class="section section--teal">
    <div class="container text-center">
      <h2>מוכנים לקבוע תור?</h2>
      <p class="lede">כתבו לנו בוואטסאפ או התקשרו — נשמח לתאם זמן שנוח לכם.</p>
      <div class="hero__ctas" style="justify-content:center;">
        <a class="btn btn--gold" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="cta_band">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" style="border-color:#fff;color:#fff;" href="${telHref(config)}" data-track="phone_click" data-track-location="cta_band">${icons.phone} ${config.phoneDisplay}</a>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <p class="eyebrow">שאלות נפוצות</p>
      <h2>שאלות ותשובות</h2>
      <div style="max-width:760px;margin-top:16px;">
        ${faqItems(config)}
      </div>
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, render };

const icons = require("../icons");
const { waHref, telHref, wazeHref, mapEmbedQuery } = require("../utils");
const { heroWave } = require("../layout");

const slug = "home";
const path = "/";
const title = "בדיקות שמיעה בתל אביב";
const description =
  "מכון בדיקות שמיעה בתל אביב למבוגרים ולילדים מגיל 5 — אודיומטריה וטימפנומטריה, תוצאות ודוח מסודר. קביעת תור בוואטסאפ או בטלפון.";
const navLabel = "בית";

function bookingSection(config) {
  const digits = String(config.whatsappNumber || "").replace(/[^0-9]/g, "");
  // Time slots within the confirmed opening hours (hourly, last slot
  // an hour before closing so the appointment itself fits the day).
  const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
  // English weekday names -> JS Date.getDay() indices, read from the
  // same structured hours that feed the JSON-LD, so the live "closed
  // day" check always matches what's actually published as open.
  const dayIndex = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
  const openDays = (config.openingHoursStructured || []).flatMap((spec) => spec.days.map((d) => dayIndex[d]));

  return `
  <div class="card" style="max-width:760px;margin-inline:auto;">
    <h3 class="mt-0">קביעת תור מהירה</h3>
    <p style="margin-bottom:20px;">מלאו פרטים ובחרו תאריך ושעה מועדפים — הבקשה תישלח אליכם ישירות לוואטסאפ או למייל, לפי מה שנוח לכם.</p>
    <form id="booking-form-live" data-track-form="home_booking">
      <div class="grid grid--2">
        <div class="form-field">
          <label for="bk-name">שם מלא</label>
          <input id="bk-name" name="name" type="text" required />
        </div>
        <div class="form-field">
          <label for="bk-phone">טלפון</label>
          <input id="bk-phone" name="phone" type="tel" required />
        </div>
      </div>
      <div class="grid grid--2">
        <div class="form-field">
          <label for="bk-email">אימייל (לא חובה)</label>
          <input id="bk-email" name="email" type="email" />
        </div>
        <div class="form-field">
          <label for="bk-service">סוג הבדיקה</label>
          <select id="bk-service" name="service">
            <option>בדיקת שמיעה</option>
            <option>בדיקת שמיעה לילדים</option>
            <option>טימפנומטריה</option>
            <option>בדיקה לוועדת זכאות ואפיון</option>
            <option>אחר</option>
          </select>
        </div>
      </div>
      <div class="grid grid--2">
        <div class="form-field">
          <label for="bk-date">תאריך מועדף</label>
          <input id="bk-date" name="date" type="date" required />
          <span id="bk-date-warning" style="display:none;color:#a33;font-size:.85rem;">המכון סגור בתאריך שנבחר (${config.openingHoursDisplay}). אפשר לשלוח בכל זאת ונתאם ידנית.</span>
        </div>
        <div class="form-field">
          <label for="bk-time">שעה מועדפת</label>
          <select id="bk-time" name="time">
            ${timeSlots.map((t) => `<option>${t}</option>`).join("\n")}
          </select>
        </div>
      </div>
      <div class="form-field">
        <label for="bk-notes">הערות (לא חובה)</label>
        <textarea id="bk-notes" name="notes"></textarea>
      </div>
      <div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-top:12px;">
        <button class="btn btn--primary" type="submit" data-channel="whatsapp">${icons.whatsapp} שליחת הבקשה בוואטסאפ</button>
        <button type="submit" data-channel="email" style="background:none;border:none;color:var(--indigo-dark);font-weight:600;cursor:pointer;text-decoration:underline;padding:8px;">שליחה במייל במקום</button>
      </div>
      <p style="font-size:.8rem;color:var(--ink-faint);margin-top:14px;margin-bottom:0;">
        לתשומת לב הצוות הטכני: הבקשה נשלחת כרגע ידנית (וואטסאפ/מייל) ואינה יוצרת הזמנה במערכת יומן. כשיחובר מנוע קביעת תורים אמיתי, ההגשה כאן צריכה לעבור ל-API שלו כדי שגם תישלח הודעת אישור אוטומטית ללקוח.
      </p>
    </form>
  </div>

  <script>
    (function () {
      var form = document.getElementById("booking-form-live");
      if (!form) return;
      var dateInput = document.getElementById("bk-date");
      var dateWarning = document.getElementById("bk-date-warning");
      var openDays = ${JSON.stringify(openDays)};
      var today = new Date();
      dateInput.min = today.toISOString().split("T")[0];

      function checkDate() {
        if (!dateInput.value) { dateWarning.style.display = "none"; return; }
        var picked = new Date(dateInput.value + "T00:00:00");
        var isOpen = openDays.indexOf(picked.getDay()) !== -1;
        dateWarning.style.display = isOpen ? "none" : "block";
      }
      dateInput.addEventListener("change", checkDate);

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var channel = (e.submitter && e.submitter.dataset.channel) || "whatsapp";
        var data = new FormData(form);
        var lines = [
          "בקשה לקביעת תור - ${config.clinicName}",
          "שם: " + data.get("name"),
          "טלפון: " + data.get("phone"),
          data.get("email") ? "אימייל: " + data.get("email") : null,
          "סוג בדיקה: " + data.get("service"),
          "תאריך מועדף: " + data.get("date"),
          "שעה מועדפת: " + data.get("time"),
          data.get("notes") ? "הערות: " + data.get("notes") : null,
        ].filter(Boolean).join("\\n");

        if (channel === "email") {
          var subject = encodeURIComponent("בקשה לקביעת תור - " + data.get("service"));
          window.location.href = "mailto:${config.email}?subject=" + subject + "&body=" + encodeURIComponent(lines);
        } else {
          window.open("https://wa.me/${digits}?text=" + encodeURIComponent(lines), "_blank", "noopener");
        }
      });
    })();
  </script>`;
}

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
    ${config.buzzwords.map((b) => `<span class="trust-item">${icons.check} ${b}</span>`).join("\n")}
  </div>`;
}

function aboutAndLocation(config) {
  const map = mapEmbedQuery(config);
  return `
  <div class="grid grid--2" style="align-items:center;">
    <div>
      <p class="eyebrow">${icons.ear} מי אנחנו</p>
      <h2>מכון שמיעה חם ומקצועי בלב תל אביב</h2>
      <p class="lede">${config.aboutBlurb}</p>
      <div class="hero__ctas">
        <a class="btn btn--primary" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="home_about">${icons.whatsapp} קביעת תור בוואטסאפ</a>
      </div>
      <!-- ניתן להזין תור עצמאי ישירות למטה, או ליצור קשר בוואטסאפ/טלפון -->
    </div>
    <div>
      <div class="map-frame">
        ${
          map.show
            ? `<iframe title="מפת הגעה למכון" loading="lazy" src="${map.embedSrc}"></iframe>`
            : `<div style="display:flex;align-items:center;justify-content:center;height:100%;padding:24px;text-align:center;color:var(--ink-faint);">המפה תוצג לאחר אימות הכתובת המדויקת</div>`
        }
      </div>
      ${
        map.isDemoPin
          ? `<div style="padding-top:8px;font-size:.8rem;color:var(--ink-faint);">מיקום זמני להדגמה בלב תל אביב — יעודכן לכתובת המדויקת של המכון.</div>`
          : ""
      }
      <div style="margin-top:14px;display:flex;flex-direction:column;gap:12px;">
        <span style="display:flex;align-items:center;gap:8px;color:var(--ink-soft);">${icons.clock} שעות פתיחה: ${config.openingHoursDisplay}</span>
        <a class="btn btn--gold btn--block" href="${wazeHref(config)}" target="_blank" rel="noopener" data-track="directions_click" data-track-location="home_waze">${icons.pin} נווט לכאן בוויז</a>
      </div>
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
      ${aboutAndLocation(config)}
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <p class="eyebrow">${icons.document} קביעת תור</p>
      <h2 class="text-center" style="max-width:600px;margin-inline:auto;">קבעו תור עצמאית, ישירות באתר</h2>
      ${bookingSection(config)}
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

  <section class="section section--indigo">
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
      <details class="faq-section">
        <summary class="faq-section__summary"><h2 class="mt-0" style="margin-bottom:0;">שאלות נפוצות ותשובות</h2></summary>
        <div class="faq-section__body">
          ${faqItems(config)}
        </div>
      </details>
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, render };

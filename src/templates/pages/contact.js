const icons = require("../icons");
const { waHref, telHref } = require("../utils");

const slug = "contact";
const path = "/contact/";
const title = "צור קשר והגעה";
const description =
  "פרטי יצירת קשר, כתובת, הגעה בתחבורה ציבורית, חניה ונגישות למכון אוזן קשבת בתל אביב.";
const navLabel = "צור קשר";

function isPlaceholder(v) {
  return !v || /^\[.*\]$/.test(String(v).trim());
}

function render(config) {
  const hasGeo = typeof config.geo.lat === "number" && typeof config.geo.lng === "number";
  const addressKnown = !isPlaceholder(config.address.full);
  const showMap = hasGeo || addressKnown;
  // Prefer exact coordinates once known; fall back to a text-address
  // search embed, which is what will happen once a real street
  // address is confirmed but before precise geo is measured.
  const mapQuery = hasGeo
    ? encodeURIComponent(`${config.geo.lat},${config.geo.lng}`)
    : encodeURIComponent(config.address.full + " " + config.address.city);
  const mapZoom = hasGeo ? "15" : "16";

  return `
  <section class="section" style="padding-top:24px;">
    <div class="container">
      <p class="eyebrow">${icons.pin} צור קשר</p>
      <h1>יצירת קשר והגעה למכון</h1>
      <p class="lede">נשמח לענות על כל שאלה ולתאם עבורכם תור מתאים.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container contact-grid">
      <div>
        <h2 class="mt-0">פרטי המכון</h2>
        <ul class="info-list">
          <li>${icons.pin} <span>${config.address.full}${config.address.city ? ", " + config.address.city : ""}</span></li>
          <li>${icons.phone} <a href="${telHref(config)}" data-track="phone_click" data-track-location="contact_page">${config.phoneDisplay}</a></li>
          <li>${icons.whatsapp} <a href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="contact_page">שלחו הודעת וואטסאפ</a></li>
          <li>${icons.clock} <span>${config.openingHoursDisplay}</span></li>
          <li>${icons.bus} <span>מרחק מהתחנה הקרובה: ${config.distanceFromTrainStation}</span></li>
          <li>${icons.parking} <span>${config.parkingInfo}</span></li>
          <li>${icons.accessibility} <span>${config.accessibilityConfirmed ? config.accessibilityInfo : "פרטי הנגישות המלאים מתעדכנים כעת."}</span></li>
        </ul>

        <div style="margin-top:28px;">
          <a class="btn btn--primary btn--block" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="contact_page_main">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        </div>
      </div>

      <div>
        <div class="map-frame">
          ${
            showMap
              ? `<iframe title="מפת הגעה למכון" loading="lazy" src="https://www.google.com/maps?q=${mapQuery}&z=${mapZoom}&output=embed"></iframe>`
              : `<div style="display:flex;align-items:center;justify-content:center;height:100%;padding:24px;text-align:center;color:var(--ink-faint);">המפה תוצג לאחר אימות הכתובת המדויקת</div>`
          }
        </div>
        ${
          hasGeo && !addressKnown
            ? `<div style="padding-top:8px;font-size:.8rem;color:var(--ink-faint);">מיקום זמני להדגמה בלב תל אביב — יעודכן לכתובת המדויקת של המכון.</div>`
            : ""
        }
        <a class="btn btn--ghost btn--sm" style="margin-top:12px;" href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener" data-track="directions_click" data-track-location="contact_page">${icons.pin} ניווט בגוגל מפות</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>השארת פרטים</h2>
      <p>מעדיפים שנחזור אליכם? השאירו פרטים ונחזור בהקדם.</p>
      <form id="booking-form" data-track-form="contact_page" style="max-width:520px;">
        <div class="form-field">
          <label for="name">שם מלא</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div class="form-field">
          <label for="phone">טלפון</label>
          <input id="phone" name="phone" type="tel" required />
        </div>
        <div class="form-field">
          <label for="topic">מהות הפנייה</label>
          <select id="topic" name="topic">
            <option>בדיקת שמיעה</option>
            <option>בדיקת שמיעה לילדים</option>
            <option>טימפנומטריה</option>
            <option>בדיקה לוועדת זכאות ואפיון</option>
            <option>אחר</option>
          </select>
        </div>
        <div class="form-field">
          <label for="message">הודעה (לא חובה)</label>
          <textarea id="message" name="message"></textarea>
        </div>
        <button class="btn btn--primary btn--block" type="submit">שליחה</button>
      </form>
      <p style="font-size:.85rem;color:var(--ink-faint);max-width:520px;">
        לתשומת לב הצוות הטכני: לטופס זה עדיין אין חיבור לשירות שליחה בפועל (אימייל/CRM) — יש לחבר נקודת קצה לפני העלייה לאוויר. ראו README.
      </p>
    </div>
  </section>

  <script>
    (function () {
      var form = document.getElementById("booking-form");
      if (!form) return;
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var data = new FormData(form);
        var subject = encodeURIComponent("פנייה חדשה מהאתר - " + (data.get("topic") || ""));
        var body = encodeURIComponent(
          "שם: " + data.get("name") + "\\nטלפון: " + data.get("phone") + "\\nהודעה: " + (data.get("message") || "")
        );
        window.location.href = "mailto:${config.email}?subject=" + subject + "&body=" + body;
      });
    })();
  </script>
  `;
}

module.exports = { slug, path, title, description, navLabel, render };

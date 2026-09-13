const icons = require("../icons");
const { waHref, telHref } = require("../utils");

const slug = "team";
const path = "/team/";
const title = "הצוות המקצועי";
const description = "הצוות המקצועי של מכון [CLINIC_NAME] — קלינאי/ות תקשורת מוסמכ/ות ביבנה.";
const navLabel = "הצוות";

function clinicianCard(c) {
  const hasPhoto = c.photo && !/^\[.*\]$/.test(c.photo);
  return `
  <div class="card person-card">
    <div class="person-card__photo">
      ${hasPhoto ? `<img src="${c.photo}" alt="${c.name}" loading="lazy" />` : icons.ear}
    </div>
    <span class="badge">${c.title}</span>
    <h3 class="mt-0">${c.name}</h3>
    <ul style="margin:0;padding-inline-start:1.1em;color:var(--ink-soft);font-size:.95rem;">
      <li>רישוי: ${c.license}</li>
      <li>ותק בתחום: ${c.experienceYears != null ? c.experienceYears + " שנים" : "[ניסיון מקצועי]"}</li>
      <li>שפות: ${c.languages && c.languages.length ? c.languages.join(", ") : "[שפות]"}</li>
    </ul>
    ${c.bio ? `<p>${c.bio}</p>` : ""}
  </div>`;
}

function render(config) {
  return `
  <section class="section" style="padding-top:24px;">
    <div class="container">
      <p class="eyebrow">${icons.check} הצוות המקצועי</p>
      <h1>הצוות של ${config.clinicName}</h1>
      <p class="lede">הבדיקות מבוצעות על ידי קלינאי/ות תקשורת מוסמכ/ות, בעלי/ות הכשרה וניסיון בתחום האודיולוגיה.</p>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container grid grid--3">
      ${config.clinicians.map(clinicianCard).join("\n")}
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="disabled-note">
        פרטי הרישוי, הוותק והשפות של חברי הצוות יעודכנו ברגע שיאומתו. שם המכון עצמו רשום ברישיון: ${config.licenseDetails}.
      </div>
    </div>
  </section>

  <section class="section section--teal">
    <div class="container text-center">
      <h2>רוצים לקבוע תור עם הצוות שלנו?</h2>
      <div class="hero__ctas" style="justify-content:center;">
        <a class="btn btn--gold" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="team_cta">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" style="border-color:#fff;color:#fff;" href="${telHref(config)}" data-track="phone_click" data-track-location="team_cta">${icons.phone} ${config.phoneDisplay}</a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, render };

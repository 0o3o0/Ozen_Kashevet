const icons = require("../icons");
const { waHref, telHref } = require("../utils");

const slug = "ent";
const path = "/ent/";
const title = "רפואת אא\"ג בתל אביב";
const description = "ייעוץ וטיפול אא\"ג בתל אביב, במכון אוזן קשבת.";
const navLabel = "אא\"ג";

function render(config) {
  return `
  <section class="section" style="padding-top:24px;">
    <div class="container">
      <p class="eyebrow">${icons.ear} אא"ג</p>
      <h1>רפואת אא"ג בתל אביב</h1>
      <p class="lede">ייעוץ וטיפול אצל ${config.entDoctor.name || "[ENT_DOCTOR_NAME]"}, הפועל/ת במכון ${config.clinicName}.</p>
      <div class="hero__ctas">
        <a class="btn btn--primary" href="${waHref(config)}" target="_blank" rel="noopener" data-track="whatsapp_click" data-track-location="ent_page">${icons.whatsapp} קביעת תור בוואטסאפ</a>
        <a class="btn btn--ghost" href="${telHref(config)}" data-track="phone_click" data-track-location="ent_page">${icons.phone} התקשרו עכשיו</a>
      </div>
    </div>
  </section>
  `;
}

module.exports = { slug, path, title, description, navLabel, render };

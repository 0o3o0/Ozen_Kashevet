/**
 * main.js
 * - Mobile nav toggle
 * - Conversion tracking for WhatsApp / phone / directions clicks and
 *   booking-form submissions, pushed to dataLayer (GA4) and, when a
 *   conversion label is configured, reported to Google Ads too.
 *
 * This file expects `window.dataLayer` to exist (created by the GA4
 * snippet in layout.js) and reads conversion labels from
 * `window.__CLINIC_ANALYTICS__`, which is inlined per page.
 */
(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];
  function gtagEvent(eventName, params) {
    window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
  }

  function reportAdsConversion(kind) {
    var cfg = window.__CLINIC_ANALYTICS__ || {};
    var sendTo = cfg.googleAdsConversionId && cfg.conversionLabels && cfg.conversionLabels[kind];
    if (sendTo && typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: cfg.googleAdsConversionId + "/" + sendTo,
      });
    }
  }

  function track(kind, extra) {
    gtagEvent(kind === "whatsapp_click" ? "whatsapp_click" : kind, extra);
    reportAdsConversion(
      kind === "whatsapp_click" ? "whatsapp" :
      kind === "phone_click" ? "phone" :
      kind === "directions_click" ? "directions" :
      kind === "booking_form_submit" ? "form" : null
    );
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-track]");
    if (!el) return;
    var kind = el.getAttribute("data-track");
    var location = el.getAttribute("data-track-location") || "unknown";
    track(kind, { link_location: location });
  });

  document.addEventListener("submit", function (e) {
    var form = e.target.closest("[data-track-form]");
    if (!form) return;
    track("booking_form_submit", { form_name: form.getAttribute("data-track-form") });
  });

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("site-nav--open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
})();

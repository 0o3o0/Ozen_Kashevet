/**
 * ============================================================
 *  clinic.js — THE ONE FILE TO EDIT
 * ============================================================
 * Every real-world fact used anywhere on the site is read from
 * this object. Nothing else in /src should contain hard-coded
 * clinic details.
 *
 * Anything still wrapped in square brackets, e.g. "[PHONE]",
 * is a placeholder — it has NOT been confirmed and will be
 * displayed as-is on the live site until you replace it.
 * See CHECKLIST.md for the full list of what's outstanding.
 *
 * Feature flags (entEnabled, pricing.confirmed, etc.) control
 * whether whole sections/pages are shown at all — flip them to
 * `true` only once the underlying fact is real and confirmed.
 * ============================================================
 */

module.exports = {
  // ---- Domain -------------------------------------------------
  // Replace with the real production domain before launch.
  // Used to build canonical URLs, sitemap.xml and JSON-LD.
  siteUrl: "https://www.[CLINIC_DOMAIN].co.il",

  // ---- Identity -------------------------------------------------
  clinicName: "[CLINIC_NAME]",
  shortName: "[CLINIC_NAME]",
  tagline: "בדיקות שמיעה מקצועיות ביבנה",
  description:
    "מכון בדיקות שמיעה ביבנה למבוגרים ולילדים מגיל 5 — אודיומטריה וטימפנומטריה על ידי קלינאי/ות תקשורת מוסמכים.",

  // ---- Contact -------------------------------------------------
  phoneDisplay: "[PHONE]", // e.g. 08-1234567 — shown to visitors
  phoneHref: "[PHONE]", // e.g. +97281234567 — used inside tel: links, digits + leading +
  whatsappNumber: "[WHATSAPP]", // digits only, international format, e.g. 972501234567
  whatsappMessage: "שלום, אשמח לקבוע תור לבדיקת שמיעה",
  email: "[EMAIL]",

  // ---- Location -------------------------------------------------
  address: {
    full: "[ADDRESS]", // e.g. "רחוב הרצל 12, יבנה"
    street: "[ADDRESS]",
    city: "יבנה",
    postalCode: "[POSTAL_CODE]",
    country: "IL",
  },
  // Leave lat/lng as null until confirmed. When both are numbers,
  // the build will add a "geo" field to the JSON-LD and can be
  // used to embed an accurate map pin.
  geo: {
    lat: null,
    lng: null,
  },
  distanceFromYavneWestStation: "[DISTANCE_FROM_YAVNE_WEST_STATION]",
  parkingInfo: "[PARKING_INFO]",
  accessibilityInfo:
    "המכון פועל בהתאם לדרישות הנגישות החוקיות. פרטים מלאים על נגישות הכניסה, חניית נכים והתאמות במקום יעודכנו כאן.",
  accessibilityConfirmed: false, // flip to true once the specific accessibility features above are verified on-site

  // Digital (website) accessibility statement — required by Israeli
  // disability-rights regulations (תקנות נגישות לשירות, תשע"ג-2013).
  // A self-review is not a substitute for a certified audit — keep
  // `audited: false` until an accredited accessibility auditor
  // (בודק נגישות מוסמך) has actually signed off on the site.
  accessibilityStatement: {
    coordinatorName: "[ACCESSIBILITY_COORDINATOR_NAME]",
    coordinatorPhone: "[ACCESSIBILITY_COORDINATOR_PHONE]",
    coordinatorEmail: "[ACCESSIBILITY_COORDINATOR_EMAIL]",
    lastReviewedDate: "[ACCESSIBILITY_LAST_REVIEWED_DATE]",
    audited: false,
    auditorName: "[ACCESSIBILITY_AUDITOR_NAME]",
    auditDate: "[ACCESSIBILITY_AUDIT_DATE]",
  },

  // ---- Privacy policy -------------------------------------------------
  privacyPolicy: {
    businessId: "[BUSINESS_ID]", // ח.פ / עוסק מורשה מספר
    lastUpdatedDate: "[PRIVACY_POLICY_LAST_UPDATED]",
  },

  // ---- Hours -------------------------------------------------
  // Free-text fallback shown until real hours are confirmed.
  openingHoursDisplay: "[OPENING_HOURS]",
  // Structured hours for JSON-LD. Leave as null until confirmed —
  // when you fill this in, openingHoursSpecification will be
  // added automatically. Example shape left in place below.
  openingHoursStructured: null,
  /* Example once confirmed:
  openingHoursStructured: [
    { days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "17:00" },
  ],
  */

  // ---- Regulatory / insurance -------------------------------------------------
  licenseDetails: "[LICENSE_DETAILS]", // Ministry of Health institute license number / details
  clalitStatus: "[CLALIT_STATUS]", // e.g. "בהסדר עם כללית" / "ללא הסדר עם קופות החולים" — do not guess
  otherHmoStatus: "[OTHER_HMO_STATUS]",

  // ---- Team -------------------------------------------------
  // Add one object per clinician. Do not publish a clinician
  // card until all of these fields are confirmed and real.
  clinicians: [
    {
      name: "[CLINICIAN_NAMES]",
      title: "קלינאי/ת תקשורת (אודיולוגיה)",
      license: "[LICENSE_DETAILS]",
      experienceYears: null, // number, e.g. 8
      languages: [], // e.g. ["עברית", "אנגלית", "רוסית"]
      photo: null, // path under /assets, e.g. "/assets/team/name.jpg"
      bio: "",
    },
  ],

  // ---- ENT physician -------------------------------------------------
  // Keep entEnabled=false until a real ENT physician is actually
  // seeing patients at this clinic. When false, /ent-yavne is not
  // built at all and no service card links to it.
  entEnabled: false,
  entDoctor: {
    name: "",
    license: "",
    days: "",
  },

  // ---- Pricing -------------------------------------------------
  // Keep confirmed=false until real, current prices are supplied.
  // While false, the site shows "מחירים מתעדכנים" instead of a number.
  pricing: {
    confirmed: false,
    hearingTest: "[HEARING_TEST_PRICE]",
    tympanometry: "[TYMPANOMETRY_PRICE]",
    childrenHearingTest: "[HEARING_TEST_PRICE]",
  },

  // ---- Appointments -------------------------------------------------
  // Do not put a specific promise here (e.g. "within 48 hours")
  // unless it is a confirmed operational fact.
  appointmentAvailability: "[APPOINTMENT_AVAILABILITY]",

  // ---- Reviews -------------------------------------------------
  // Never fabricate reviews. Leave empty until real, consented
  // reviews exist. When non-empty, a review section can be added —
  // no AggregateRating structured data is generated by this build
  // regardless, since ratings must come from a verified source
  // (e.g. Google Business Profile), not be authored here.
  reviews: [],

  // ---- Assets -------------------------------------------------
  logo: "/assets/logo.svg",
  socialImage: "/assets/og-image.jpg",

  // ---- Analytics -------------------------------------------------
  analytics: {
    ga4MeasurementId: "[GA4_MEASUREMENT_ID]",
    googleAdsConversionId: "[GOOGLE_ADS_CONVERSION_ID]",
    // Per-action Google Ads conversion labels (leave blank until set up in Google Ads)
    conversionLabels: {
      whatsapp: "[GOOGLE_ADS_LABEL_WHATSAPP]",
      phone: "[GOOGLE_ADS_LABEL_PHONE]",
      form: "[GOOGLE_ADS_LABEL_FORM]",
      directions: "[GOOGLE_ADS_LABEL_DIRECTIONS]",
    },
  },
};

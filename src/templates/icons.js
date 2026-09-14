// Minimal, hand-drawn-feeling line icon set. All strokes, no fills,
// so a single `color` CSS property controls every icon's color.
const base = (inner, viewBox = "0 0 24 24") =>
  `<svg viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

module.exports = {
  waveform: base(
    `<path d="M2 12h2.5l1.5-5 2 10 2-14 2 18 2-12 1.5 3H22" />`
  ),
  ear: base(
    `<path d="M9 16c-1.7-1.7-2.5-3.4-2.5-5.6C6.5 6.4 9.7 3 13.5 3S20 6.4 20 10.4c0 3-1.8 4.4-3.4 5.7-1.2 1-2.1 1.8-2.1 3.4A2.5 2.5 0 0 1 12 22c-1.8 0-2.8-1.2-3-2.6" /><path d="M13.5 7.5a3 3 0 0 1 3 3c0 1.5-1 2-1 3.3" />`
  ),
  child: base(
    `<circle cx="12" cy="6" r="2.6" /><path d="M6 21v-4a6 6 0 0 1 12 0v4" /><path d="M9 13v3M15 13v3" />`
  ),
  tympanometry: base(
    `<circle cx="12" cy="12" r="8.5" /><path d="M7.5 12c1-2 2-3 4.5-3s3.5 1 4.5 3-2 3-4.5 3-3.5-1-4.5-3Z" />`
  ),
  document: base(
    `<path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" /><path d="M9.5 13h6M9.5 16.5h6" />`
  ),
  check: base(`<path d="M4 12.5l5 5L20 6" />`),
  clock: base(`<circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" />`),
  pin: base(
    `<path d="M12 21s7-6.4 7-12A7 7 0 0 0 5 9c0 5.6 7 12 7 12Z" /><circle cx="12" cy="9" r="2.4" />`
  ),
  phone: base(
    `<path d="M6 3h3l1.5 4.5-2 1.6a12 12 0 0 0 6.4 6.4l1.6-2L21 15v3a2 2 0 0 1-2 2C11.8 20 4 12.2 4 5a2 2 0 0 1 2-2Z" />`
  ),
  whatsapp: base(
    `<path d="M6.3 17.7 4 21l3.4-2.2A8.5 8.5 0 1 0 4 12.5 8.4 8.4 0 0 0 6.3 17.7Z" /><path d="M8.7 9.6c0 3.6 3 6.6 6.6 6.6.5 0 1-.6.8-1.1l-.4-1a.8.8 0 0 0-.9-.4l-1.2.3a5.7 5.7 0 0 1-3.2-3.2l.3-1.2a.8.8 0 0 0-.4-.9l-1-.4c-.5-.2-1.1.3-1.1.8Z" />`
  ),
  accessibility: base(
    `<circle cx="12" cy="4.5" r="1.8" /><path d="M4 9h16M12 9v5l-4 7M12 14l4 7M9 12h6" />`
  ),
  bus: base(
    `<rect x="4" y="4" width="16" height="13" rx="2" /><path d="M4 12h16M8 20v-3M16 20v-3" /><circle cx="8" cy="14.5" r=".1" /><circle cx="16" cy="14.5" r=".1" />`
  ),
  parking: base(
    `<rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M9.5 16V8h3.2a2.6 2.6 0 0 1 0 5.2H9.5" />`
  ),
  quote: base(`<path d="M7 8.5c-2 1-3 2.6-3 4.7 0 1.8 1.2 3 2.8 3s2.7-1.1 2.7-2.7c0-1.4-.9-2.4-2.2-2.6.2-1.4 1.3-2.5 2.7-3.1L7 8.5Zm9 0c-2 1-3 2.6-3 4.7 0 1.8 1.2 3 2.8 3s2.7-1.1 2.7-2.7c0-1.4-.9-2.4-2.2-2.6.2-1.4 1.3-2.5 2.7-3.1L16 8.5Z" />`),
  chevron: base(`<path d="M9 6l6 6-6 6" />`),
  // Clinic mark: two simple cupped hands (in the style of the
  // "palms up together" emoji) with an ear centered between them.
  handsEar: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g fill="currentColor" stroke="none">
      <rect x="6" y="26" width="15" height="30" rx="7.5" transform="rotate(18 13.5 41)"/>
      <ellipse cx="19" cy="49" rx="6" ry="4.5" transform="rotate(-12 19 49)"/>
      <rect x="43" y="26" width="15" height="30" rx="7.5" transform="rotate(-18 50.5 41)"/>
      <ellipse cx="45" cy="49" rx="6" ry="4.5" transform="rotate(12 45 49)"/>
    </g>
    <g transform="translate(32,26) scale(1.2) translate(-13,-12)" stroke-width="1.8">
      <path d="M9 16c-1.7-1.7-2.5-3.4-2.5-5.6C6.5 6.4 9.7 3 13.5 3S20 6.4 20 10.4c0 3-1.8 4.4-3.4 5.7-1.2 1-2.1 1.8-2.1 3.4A2.5 2.5 0 0 1 12 22c-1.8 0-2.8-1.2-3-2.6" />
      <path d="M13.5 7.5a3 3 0 0 1 3 3c0 1.5-1 2-1 3.3" />
    </g>
  </svg>`,
};

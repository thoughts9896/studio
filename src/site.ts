// ─────────────────────────────────────────────────────────────────────────────
// Site-wide facts. Everything marked TODO must be confirmed by the founder
// before the site goes to production (see TODO.md at the repo root).
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'STDN Technologies',
  short: 'STDN',
  url: 'https://www.stdn.in',
  founder: 'Nitesh Narwal',
  udyam: 'UDYAM-HR-08-0059791',
  place: 'Jind, Haryana',

  // TODO(confirm): WhatsApp number. This is the number the previous stdn.in used.
  whatsapp: '917404019891',
  // TODO(confirm): public email. support@stdn.in is the address MedDesk ships with.
  email: 'support@stdn.in',
} as const

export function waLink(message = 'Hi STDN, I would like to talk about') {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`
}

// Prices are not published yet. Rendered as a visible TODO chip until filled in.
export const PRICES = {
  meddesk: null as string | null, // TODO: MedDesk price / plans
  schoolErp: null as string | null, // TODO: School ERP price
  hotelErp: null as string | null, // TODO: Hotel ERP price
}

// Testimonials: none until real, permission-given quotes exist. TODO.
export const TESTIMONIALS: { quote: string; name: string; role: string }[] = []

/* ============================================================
   ألوان الشارتات (hex ثابت) — لأن Recharts يمرّر الألوان كسمات
   SVG ولا تُحلّ فيها var(--...).
   يجب أن تبقى متطابقة مع القيم في src/styles/tokens.css
   ============================================================ */

export const brandHex = '#2f74c4'
export const brandDeepHex = '#245ea6'

/* ألوان المستويات حسب الـ tone (نفس مفاتيح levels/scale) */
export const toneHex = {
  blue: '#2f74c4', // راشد (الأعلى) — نفس لون العلامة
  teal: '#6270de', // مراهق — نيلي
  orange: '#d2952b', // طفل — كهرماني
  red: '#e06a5a', // رضيع — مرجاني
}

export const chartInk = '#2a323b'
export const chartGrid = '#e7ecf3'
export const chartMuted = '#8a949f'

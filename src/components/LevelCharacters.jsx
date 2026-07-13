/* ============================================================
   شخصيات المستويات (SVG مرسومة يدوياً — خفيفة وقابلة للتلوين)
   رضيع (baby) · طفل (child) · مراهق (teen) · راشد (adult)
   كل شخصية تأخذ: size, color (لون ملابسها = لون المستوى), className
   ============================================================ */

const SKIN = '#f4cba4'
const EYE = '#2a323b'
const CHEEK = '#ef9a9a'

function Frame({ size, className, children }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 96 120"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

/* رضيع — رأس كبير وجسم صغير وخصلة شعر */
export function BabyChar({ size = 72, color, className }) {
  return (
    <Frame size={size} className={className}>
      <ellipse cx="48" cy="115" rx="24" ry="5" fill="#0f1b2e" opacity="0.06" />
      <path d="M27 114c-3-24 5-40 21-40s24 16 21 40Z" fill={color} />
      <path d="M30 114c-1-11 0-21 6-28 6 11 3 20 2 28Z" fill="#fff" opacity="0.16" />
      <ellipse cx="40" cy="113" rx="6" ry="4" fill={SKIN} />
      <ellipse cx="56" cy="113" rx="6" ry="4" fill={SKIN} />
      <circle cx="25" cy="92" r="7" fill={color} />
      <circle cx="71" cy="92" r="7" fill={color} />
      <circle cx="21" cy="98" r="4.6" fill={SKIN} />
      <circle cx="75" cy="98" r="4.6" fill={SKIN} />
      <circle cx="48" cy="46" r="30" fill={SKIN} />
      <path d="M48 13c7-2 12 6 5 10-1-5-5-4-5-1-3-4-3-8 0-9Z" fill="#8a6a4e" />
      <circle cx="33" cy="53" r="6" fill={CHEEK} opacity="0.5" />
      <circle cx="63" cy="53" r="6" fill={CHEEK} opacity="0.5" />
      <circle cx="40" cy="46" r="3.6" fill={EYE} />
      <circle cx="56" cy="46" r="3.6" fill={EYE} />
      <path d="M42 56c3 4 9 4 12 0" stroke={EYE} strokeWidth="2.6" strokeLinecap="round" />
    </Frame>
  )
}

/* طفل — قامة أقصر، ضفيرتان، قميص */
export function ChildChar({ size = 72, color, className }) {
  return (
    <Frame size={size} className={className}>
      <ellipse cx="48" cy="117" rx="22" ry="4" fill="#0f1b2e" opacity="0.06" />
      <rect x="39" y="94" width="7" height="22" rx="3.5" fill="#3a4657" />
      <rect x="50" y="94" width="7" height="22" rx="3.5" fill="#3a4657" />
      <ellipse cx="40" cy="116" rx="6" ry="3.5" fill="#252c38" />
      <ellipse cx="56" cy="116" rx="6" ry="3.5" fill="#252c38" />
      <path d="M32 60c0-4 4-6 8-6h16c4 0 8 2 8 6v30c-11 4-21 4-32 0Z" fill={color} />
      <path d="M35 60c0-3 3-5 6-5 2 8 1 22 0 31-3-1-5-2-6-4Z" fill="#fff" opacity="0.16" />
      <rect x="24" y="60" width="7" height="26" rx="3.5" fill={color} />
      <rect x="65" y="60" width="7" height="26" rx="3.5" fill={color} />
      <circle cx="27" cy="88" r="4.6" fill={SKIN} />
      <circle cx="69" cy="88" r="4.6" fill={SKIN} />
      <circle cx="48" cy="36" r="21" fill={SKIN} />
      <circle cx="27" cy="35" r="6.5" fill="#6d4a32" />
      <circle cx="69" cy="35" r="6.5" fill="#6d4a32" />
      <path d="M27 37c0-16 10-25 21-25s21 9 21 25c-4-9-9-11-13-11-6-4-16-4-22 0-4 1-6 6-7 11Z" fill="#6d4a32" />
      <circle cx="41" cy="37" r="3.1" fill={EYE} />
      <circle cx="55" cy="37" r="3.1" fill={EYE} />
      <path d="M42 45c3 4 9 4 12 0" stroke={EYE} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="35" cy="43" r="4.6" fill={CHEEK} opacity="0.45" />
      <circle cx="61" cy="43" r="4.6" fill={CHEEK} opacity="0.45" />
    </Frame>
  )
}

/* مراهق — أطول، هودي + سماعات، شعر مائل */
export function TeenChar({ size = 72, color, className }) {
  return (
    <Frame size={size} className={className}>
      <ellipse cx="48" cy="117" rx="22" ry="4" fill="#0f1b2e" opacity="0.06" />
      <rect x="39" y="92" width="7" height="24" rx="3.5" fill="#33405a" />
      <rect x="50" y="92" width="7" height="24" rx="3.5" fill="#33405a" />
      <ellipse cx="40" cy="116" rx="6" ry="3.5" fill="#252c38" />
      <ellipse cx="56" cy="116" rx="6" ry="3.5" fill="#252c38" />
      <path d="M30 58c0-6 5-10 10-10h16c5 0 10 4 10 10v34c-12 4-24 4-36 0Z" fill={color} />
      <path d="M33 58c0-4 3-8 7-9 2 9 1 27 0 35-4-1-6-2-7-4Z" fill="#fff" opacity="0.15" />
      <path d="M38 50c4 6 16 6 20 0-2 6-8 9-10 9s-8-3-10-9Z" fill={color} />
      <rect x="45.5" y="55" width="2" height="12" rx="1" fill="#fff" opacity="0.55" />
      <rect x="49" y="55" width="2" height="12" rx="1" fill="#fff" opacity="0.55" />
      <rect x="23" y="58" width="8" height="28" rx="4" fill={color} />
      <rect x="65" y="58" width="8" height="28" rx="4" fill={color} />
      <circle cx="27" cy="88" r="4.6" fill={SKIN} />
      <circle cx="69" cy="88" r="4.6" fill={SKIN} />
      <circle cx="48" cy="34" r="20" fill={SKIN} />
      <path d="M28 34c0-15 9-23 20-23 8 0 15 4 18 12-6-4-11-3-14-1-8 0-16 2-20 8-2 1-3 2-4 4Z" fill="#3a3128" />
      <path d="M27 34a21 21 0 0 1 42 0" stroke="#2a323b" strokeWidth="3" />
      <rect x="22.5" y="31" width="8.5" height="13" rx="3.5" fill="#2a323b" />
      <rect x="65" y="31" width="8.5" height="13" rx="3.5" fill="#2a323b" />
      <circle cx="42" cy="35" r="2.9" fill={EYE} />
      <circle cx="54" cy="35" r="2.9" fill={EYE} />
      <path d="M43 43c3 3 7 3 10 0" stroke={EYE} strokeWidth="2.2" strokeLinecap="round" />
    </Frame>
  )
}

/* راشد — الأطول، جاكيت بياقة + رابطة عنق، شعر مرتّب */
export function AdultChar({ size = 72, color, className }) {
  return (
    <Frame size={size} className={className}>
      <ellipse cx="48" cy="117" rx="23" ry="4" fill="#0f1b2e" opacity="0.07" />
      <rect x="38" y="90" width="8" height="26" rx="3.5" fill="#2f3b52" />
      <rect x="50" y="90" width="8" height="26" rx="3.5" fill="#2f3b52" />
      <ellipse cx="40" cy="116" rx="6.5" ry="3.5" fill="#1c232f" />
      <ellipse cx="56" cy="116" rx="6.5" ry="3.5" fill="#1c232f" />
      <path d="M28 56c0-6 5-10 11-10h18c6 0 11 4 11 10v36c-13 4-27 4-40 0Z" fill={color} />
      <path d="M31 56c0-4 3-8 8-9 2 9 1 29 0 37-4-1-7-2-8-4Z" fill="#fff" opacity="0.14" />
      <path d="M40 48l8 11 8-11-2 9-6 8-6-8Z" fill="#fff" opacity="0.92" />
      <path d="M46 58h4l2 15-4 5-4-5Z" fill="#2a323b" opacity="0.6" />
      <rect x="22" y="56" width="8" height="30" rx="4" fill={color} />
      <rect x="66" y="56" width="8" height="30" rx="4" fill={color} />
      <circle cx="26" cy="88" r="4.6" fill={SKIN} />
      <circle cx="70" cy="88" r="4.6" fill={SKIN} />
      <circle cx="48" cy="32" r="19" fill={SKIN} />
      <path d="M33 34c2 10 8 15 15 15s13-5 15-15c-2 6-8 9-15 9s-13-3-15-9Z" fill="#41352a" opacity="0.35" />
      <path d="M30 30c0-13 8-19 18-19s18 6 18 19c-3-6-6-8-9-8-3-3-15-3-18 0-3 0-6 2-9 8Z" fill="#41352a" />
      <circle cx="42" cy="33" r="2.9" fill={EYE} />
      <circle cx="54" cy="33" r="2.9" fill={EYE} />
      <path d="M43 41c3 3 7 3 10 0" stroke={EYE} strokeWidth="2.2" strokeLinecap="round" />
    </Frame>
  )
}

/* خريطة الشخصيات حسب معرّف المستوى */
export const levelChars = {
  infant: BabyChar,
  child: ChildChar,
  adolescent: TeenChar,
  adult: AdultChar,
}

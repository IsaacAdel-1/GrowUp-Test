import { sectionIcons } from './icons.jsx'
import styles from './SectionCard.module.css'

/**
 * بطاقة القسم: شارة المبدأ + العنوان + وصف اختياري + الأيقونة، ثم الأسئلة (children).
 *
 * props:
 *  - label: شارة صغيرة أعلى العنوان (مثل "المبدأ الأول") — اختيارية
 *  - title: عنوان القسم
 *  - subtitle: وصف القسم — اختياري
 *  - icon: مفتاح الأيقونة (eye, history, leaf, shield, droplet, heart, ...)
 *  - children: بطاقات الأسئلة
 */
export default function SectionCard({ label, title, subtitle, icon, children }) {
  const Icon = sectionIcons[icon] || sectionIcons.heart

  return (
    <section className={styles.wrap}>
      <header className={styles.head}>
        <div className={styles.titles}>
          {label && <span className={styles.eyebrow}>{label}</span>}
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        <div className={styles.iconBox}>
          <Icon width={26} height={26} />
        </div>
      </header>

      <div className={styles.questions}>{children}</div>
    </section>
  )
}

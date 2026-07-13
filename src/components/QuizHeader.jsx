import { BrandIcon, ActivityIcon } from './icons.jsx'
import styles from './QuizHeader.module.css'

/**
 * ترويسة الصفحة: أيقونة العلامة + الشارة + العنوان الرئيسي.
 *
 * props:
 *  - badge: نص الشارة الصغيرة
 *  - title: العنوان الرئيسي
 */
export default function QuizHeader({ badge, title }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <BrandIcon width={30} height={30} />
      </div>

      <span className={styles.badge}>
        <ActivityIcon width={16} height={16} />
        {badge}
      </span>

      <h1 className={styles.title}>{title}</h1>
    </header>
  )
}

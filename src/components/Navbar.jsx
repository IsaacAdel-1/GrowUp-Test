import { BrandIcon } from './icons.jsx'
import styles from './Navbar.module.css'

/**
 * شريط تنقّل علوي ثابت + تابّات.
 *
 * props:
 *  - view: المسار الحالي (quiz | result | stages | guide)
 *  - onNavigate: (path) => void
 *  - resultAvailable: هل اكتمل الاختبار؟ (لتفعيل تاب النتيجة)
 */
export default function Navbar({ view, onNavigate, resultAvailable }) {
  const tabs = [
    { id: 'quiz', label: 'الاختبار', path: '/quiz' },
    { id: 'result', label: 'النتيجة', path: '/result', locked: !resultAvailable },
    { id: 'stages', label: 'مراحل النمو', path: '/stages' },
    { id: 'guide', label: 'دليل النمو', path: '/guide' },
  ]

  return (
    <header className={styles.bar} data-noprint="true">
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.brand}
          onClick={() => onNavigate('/quiz')}
        >
          <span className={styles.logo}>
            <BrandIcon width={20} height={20} />
          </span>
          <span className={styles.brandText}>اختبار النضج</span>
        </button>

        <nav className={styles.tabs}>
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={styles.tab}
              data-active={view === t.id ? 'true' : 'false'}
              data-locked={t.locked ? 'true' : 'false'}
              onClick={() => !t.locked && onNavigate(t.path)}
              title={t.locked ? 'أكمل الاختبار أولاً لعرض النتيجة' : undefined}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

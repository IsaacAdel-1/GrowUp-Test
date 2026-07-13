import styles from './ProgressBar.module.css'

/**
 * شريط التقدّم: مؤشر القسم + عدّاد الإجابات + شريط مقسّم لكل قسم.
 *
 * props:
 *  - currentSection: رقم القسم الحالي (يبدأ من 1)
 *  - totalSections: عدد الأقسام
 *  - answered: عدد الأسئلة المُجابة
 *  - total: إجمالي الأسئلة
 *  - segments: مصفوفة نسب اكتمال كل قسم [0..1]
 */
export default function ProgressBar({
  currentSection,
  totalSections,
  answered,
  total,
  segments,
}) {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <span className={styles.section}>
          القسم {currentSection} من {totalSections}
        </span>
        <span className={styles.count}>
          {answered} / {total} إجابة
        </span>
      </div>

      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={answered}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        {segments.map((ratio, i) => (
          <span
            key={i}
            className={styles.segment}
            data-current={i === currentSection - 1 ? 'true' : 'false'}
          >
            <span
              className={styles.fill}
              style={{ transform: `scaleX(${ratio})` }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

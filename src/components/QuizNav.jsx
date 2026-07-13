import { ArrowRightIcon, ArrowLeftIcon, CheckIcon } from './icons.jsx'
import styles from './QuizNav.module.css'

/**
 * أزرار التنقّل بين الأقسام + نص مساعد.
 *
 * props:
 *  - onPrev, onNext: الدوال
 *  - canPrev: تفعيل زر السابق
 *  - canNext: تفعيل زر التالي (كل أسئلة القسم مُجابة)
 *  - isLast: هل هذا آخر قسم؟ (يتغير نص الزر إلى "عرض النتيجة")
 *  - helper: النص المساعد في المنتصف
 */
export default function QuizNav({
  onPrev,
  onNext,
  canPrev,
  canNext,
  isLast,
  helper,
}) {
  return (
    <nav className={styles.nav}>
      <button
        type="button"
        className={styles.prev}
        onClick={onPrev}
        disabled={!canPrev}
      >
        <ArrowRightIcon width={18} height={18} />
        السابق
      </button>

      {helper && <span className={styles.helper}>{helper}</span>}

      <button
        type="button"
        className={styles.next}
        onClick={onNext}
        disabled={!canNext}
      >
        {isLast ? 'عرض النتيجة' : 'التالي'}
        {isLast ? (
          <CheckIcon width={18} height={18} />
        ) : (
          <ArrowLeftIcon width={18} height={18} />
        )}
      </button>
    </nav>
  )
}

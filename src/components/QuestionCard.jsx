import RatingScale from './RatingScale.jsx'
import styles from './QuestionCard.module.css'

/**
 * بطاقة سؤال واحد: رقم + نص السؤال + مقياس التقييم.
 *
 * props:
 *  - number: رقم السؤال المعروض
 *  - text: نص السؤال
 *  - scale: خيارات المقياس
 *  - value: القيمة المختارة
 *  - onChange: (value) => void
 *  - name: اسم فريد لمجموعة الراديو
 */
export default function QuestionCard({
  number,
  text,
  scale,
  value,
  onChange,
  name,
}) {
  return (
    <div
      className={styles.card}
      data-answered={value != null ? 'true' : 'false'}
    >
      <div className={styles.head}>
        <span className={styles.number}>{number}</span>
        <p className={styles.text}>{text}</p>
      </div>
      <RatingScale
        scale={scale}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  )
}

import styles from './RatingScale.module.css'

/**
 * مقياس التقييم — الدوائر الأربعة الملوّنة أسفل كل سؤال.
 *
 * props:
 *  - scale: مصفوفة الخيارات [{ value, label, tone }]
 *  - value: القيمة المختارة حالياً (أو null)
 *  - onChange: (value) => void
 *  - name: اسم مجموعة الراديو (للـ accessibility)
 */
export default function RatingScale({ scale, value, onChange, name }) {
  return (
    <div className={styles.scale} role="radiogroup">
      {scale.map((opt) => {
        const selected = value === opt.value
        return (
          <label
            key={opt.value}
            className={styles.option}
            data-tone={opt.tone}
            data-selected={selected ? 'true' : 'false'}
          >
            <input
              type="radio"
              className={styles.input}
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
            />
            <span className={styles.circle}>{opt.value}</span>
            <span className={styles.label}>{opt.label}</span>
          </label>
        )
      })}
    </div>
  )
}

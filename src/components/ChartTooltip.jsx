import styles from './ChartTooltip.module.css'

/* تولتيب مخصّص للشارتين — يعرض اسم المبدأ + النسبة + المستوى */
export default function ChartTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null
  const d = payload[0].payload
  return (
    <div className={styles.tip}>
      <div className={styles.name}>{d.subject}</div>
      <div className={styles.row}>
        <span>النسبة</span>
        <strong>{d.percent}%</strong>
      </div>
      <div className={styles.level} style={d.color ? { color: d.color } : undefined}>
        {d.level}
      </div>
    </div>
  )
}

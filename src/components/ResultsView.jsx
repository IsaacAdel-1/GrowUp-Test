import {
  sectionIcons,
  RefreshIcon,
  ArrowLeftIcon,
  DownloadIcon,
} from './icons.jsx'
import MaturityRadar from './MaturityRadar.jsx'
import MaturityBar from './MaturityBar.jsx'
import styles from './ResultsView.module.css'

/**
 * صفحة النتيجة — التركيز على نتيجة كل مبدأ منفصلة + مقارنة بصرية.
 *
 * props:
 *  - results: مخرجات computeResults
 *  - onNavigate: (path) => void
 *  - onRestart: () => void
 */
export default function ResultsView({ results, onNavigate, onRestart }) {
  const { sectionResults, overallPercent, overallLevel, weakest, strongest } =
    results

  const chartData = sectionResults.map((r) => ({
    subject: r.short,
    percent: r.percent,
    level: r.level.name,
    tone: r.level.tone,
    color: r.color,
  }))

  return (
    <section className={styles.wrap}>
      {/* ===== ترويسة موجزة (النتيجة العامة ثانوية) ===== */}
      <header className={styles.header}>
        <h1 className={styles.title}>نتيجتك في كل مبدأ</h1>
        <p className={styles.sub}>
          لكل مبدأ نسبته ومستواه على حدة. ركّز على الجوانب المنخفضة — هي فرصتك
          التالية للنمو.
          <span className={styles.overallChip} data-tone={overallLevel.tone}>
            متوسطك العام: {overallLevel.name} · {overallPercent}٪
          </span>
        </p>
      </header>

      {/* ===== المقارنة البصرية ===== */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>مقارنة نضجك عبر المبادئ</h2>
        <div className={styles.charts}>
          <MaturityBar data={chartData} />
          <MaturityRadar data={chartData} />
        </div>
      </div>

      {/* ===== بطاقات المبادئ (التركيز الأساسي) ===== */}
      <div className={styles.grid}>
        {sectionResults.map((r) => {
          const Icon = sectionIcons[r.icon] || sectionIcons.heart
          return (
            <div key={r.id} className={styles.card} style={{ '--tone': r.color }}>
              <div className={styles.cardHead}>
                <span className={styles.cardIcon}>
                  <Icon width={22} height={22} />
                </span>
                <div className={styles.cardTitles}>
                  <h3 className={styles.cardTitle}>{r.short}</h3>
                  <span className={styles.cardLevel}>{r.level.name}</span>
                </div>
                <div className={styles.cardScore}>
                  <span className={styles.cardPercent}>{r.percent}%</span>
                  <span className={styles.cardRaw}>
                    {r.sum}/{r.max}
                  </span>
                </div>
              </div>
              <div className={styles.bar}>
                <span
                  className={styles.barFill}
                  style={{ transform: `scaleX(${r.percent / 100})` }}
                />
              </div>
              <p className={styles.cardTagline}>{r.level.tagline}</p>
              <button
                type="button"
                className={styles.cardLink}
                onClick={() => onNavigate(`/guide/${r.id}`)}
              >
                خطوات النمو في هذا المبدأ
                <ArrowLeftIcon width={15} height={15} />
              </button>
            </div>
          )
        })}
      </div>

      {/* ===== الأقوى والأضعف ===== */}
      <div className={styles.callouts}>
        <div className={styles.callout} data-kind="weak">
          <span className={styles.calloutTag}>ابدأ من هنا</span>
          <h4 className={styles.calloutTitle}>{weakest.title}</h4>
          <p className={styles.calloutText}>
            أكثر جانب يحتاج انتباهك ({weakest.percent}٪ — {weakest.level.name}).
            نموّك فيه سيصنع أكبر فرق.
          </p>
          <button
            type="button"
            className={styles.calloutBtn}
            onClick={() => onNavigate(`/guide/${weakest.id}`)}
          >
            خطوات النمو في هذا المبدأ
            <ArrowLeftIcon width={16} height={16} />
          </button>
        </div>

        <div className={styles.callout} data-kind="strong">
          <span className={styles.calloutTag}>أقوى جوانبك</span>
          <h4 className={styles.calloutTitle}>{strongest.title}</h4>
          <p className={styles.calloutText}>
            أنت متميّز هنا ({strongest.percent}٪ — {strongest.level.name}).
            استثمر هذه القوة لتدعم بها باقي الجوانب.
          </p>
        </div>
      </div>

      {/* ===== الأزرار ===== */}
      <div className={styles.ctaRow}>
        <button
          type="button"
          className={styles.ctaPrimary}
          onClick={() => onNavigate('/report')}
        >
          <DownloadIcon width={18} height={18} />
          تصدير التقرير كامل PDF
        </button>
        <button
          type="button"
          className={styles.ctaSecondary}
          onClick={() => onNavigate('/guide')}
        >
          دليل خطوات النمو
          <ArrowLeftIcon width={18} height={18} />
        </button>
      </div>

      <button type="button" className={styles.restart} onClick={onRestart}>
        <RefreshIcon width={18} height={18} />
        إعادة الاختبار
      </button>
    </section>
  )
}

import {
  sectionIcons,
  DownloadIcon,
  ArrowRightIcon,
  BrandIcon,
  CheckIcon,
} from './icons.jsx'
import MaturityRadar from './MaturityRadar.jsx'
import MaturityBar from './MaturityBar.jsx'
import { guideById } from '../data/growthGuide.js'
import styles from './ReportView.module.css'

/**
 * تقرير كامل قابل للطباعة/التصدير PDF:
 * نتيجة كل مبدأ + مستواه + الشارتات + خطوات النمو لكل مبدأ.
 * زر «حفظ / طباعة PDF» يفتح مربّع الطباعة (اختر: حفظ كـ PDF).
 *
 * props: results, onNavigate
 */
export default function ReportView({ results, onNavigate }) {
  const { sectionResults, overallPercent, overallLevel } = results

  const chartData = sectionResults.map((r) => ({
    subject: r.short,
    percent: r.percent,
    level: r.level.name,
    tone: r.level.tone,
  }))

  let dateStr = ''
  try {
    dateStr = new Date().toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    dateStr = ''
  }

  return (
    <div className={styles.page}>
      {/* شريط أدوات (لا يظهر في الطباعة) */}
      <div className={styles.toolbar} data-noprint="true">
        <button className={styles.back} onClick={() => onNavigate('/result')}>
          <ArrowRightIcon width={18} height={18} />
          العودة للنتيجة
        </button>
        <button className={styles.print} onClick={() => window.print()}>
          <DownloadIcon width={18} height={18} />
          حفظ / طباعة PDF
        </button>
      </div>

      <p className={styles.hint} data-noprint="true">
        اضغط «حفظ / طباعة PDF» ثم اختر «حفظ كـ PDF» من وجهة الطباعة.
      </p>

      <article className={styles.report}>
        <header className={styles.reportHead}>
          <div className={styles.brand}>
            <span className={styles.logo}>
              <BrandIcon width={22} height={22} />
            </span>
            <div>
              <div className={styles.brandName}>اختبار النضج الشخصي</div>
              {dateStr && <div className={styles.date}>{dateStr}</div>}
            </div>
          </div>
          <h1 className={styles.reportTitle}>تقرير نتيجتك الكامل</h1>
          <p className={styles.reportSub}>
            متوسطك العام: <strong>{overallLevel.name}</strong> · {overallPercent}٪
          </p>
        </header>

        {/* الشارتات */}
        <section className={styles.charts}>
          <MaturityBar data={chartData} animate={false} />
          <MaturityRadar data={chartData} animate={false} />
        </section>

        {/* نتيجة + خطوات كل مبدأ */}
        <section className={styles.principles}>
          {sectionResults.map((r) => {
            const Icon = sectionIcons[r.icon] || sectionIcons.heart
            const guide = guideById[r.id]
            return (
              <div key={r.id} className={styles.principle} style={{ '--tone': r.color }}>
                <div className={styles.pHead}>
                  <span className={styles.pIcon}>
                    <Icon width={20} height={20} />
                  </span>
                  <div className={styles.pTitles}>
                    <div className={styles.pLabel}>{r.label}</div>
                    <h2 className={styles.pTitle}>{r.title}</h2>
                  </div>
                  <div className={styles.pScore}>
                    <span className={styles.pPercent}>{r.percent}%</span>
                    <span className={styles.pLevel}>{r.level.name}</span>
                  </div>
                </div>

                <div className={styles.pBar}>
                  <span
                    className={styles.pBarFill}
                    style={{ transform: `scaleX(${r.percent / 100})` }}
                  />
                </div>

                <h3 className={styles.pStepsTitle}>خطوات النمو</h3>
                <ol className={styles.pSteps}>
                  {guide.steps.map((s, i) => (
                    <li key={i}>
                      <strong>{s.title}:</strong> {s.detail}
                    </li>
                  ))}
                </ol>

                <p className={styles.pPractice}>
                  <span className={styles.pPracticeIcon}>
                    <CheckIcon width={14} height={14} />
                  </span>
                  <span>
                    <strong>ممارسة هذا الأسبوع:</strong> {guide.practice}
                  </span>
                </p>
              </div>
            )
          })}
        </section>

        <footer className={styles.reportFoot}>
          إجاباتك محفوظة داخل الجلسة فقط ولا تُرسل لأي جهة — GrowUp
        </footer>
      </article>
    </div>
  )
}

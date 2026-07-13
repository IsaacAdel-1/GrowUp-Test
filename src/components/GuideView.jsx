import { useEffect } from 'react'
import { sections } from '../data/quizData.js'
import { guideById } from '../data/growthGuide.js'
import { sectionIcons, CheckIcon, ArrowLeftIcon } from './icons.jsx'
import styles from './GuideView.module.css'

/**
 * دليل النمو لكل مبدأ: تحليل + علامات + خطوات + ممارسة أسبوعية.
 *
 * props:
 *  - focusId: معرّف مبدأ للتمرير إليه (اختياري، من الرابط /guide/<id>)
 *  - results: نتائج المستخدم (اختياري، لعرض مستواه في كل مبدأ)
 *  - onNavigate: (path) => void
 */
export default function GuideView({ focusId, results, onNavigate }) {
  useEffect(() => {
    if (!focusId) return
    const el = document.getElementById(`guide-${focusId}`)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [focusId])

  const resultById = {}
  results?.sectionResults.forEach((r) => {
    resultById[r.id] = r
  })

  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>دليل النمو</span>
        <h1 className={styles.title}>كيف أنمو في كل مبدأ؟</h1>
        <p className={styles.intro}>
          خطوات عملية مباشرة لكل مبدأ تنقلك خطوة نحو النضج، مع ممارسة أسبوعية
          تبدأ بها. ابدأ بالجانب الأكثر احتياجاً لك.
        </p>
      </header>

      {/* شرائط تنقّل سريعة */}
      <div className={styles.chips}>
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            className={styles.chip}
            style={{ '--tone': s.color }}
            data-active={focusId === s.id ? 'true' : 'false'}
            onClick={() => onNavigate(`/guide/${s.id}`)}
          >
            {s.short}
          </button>
        ))}
      </div>

      {sections.map((s) => {
        const guide = guideById[s.id]
        const Icon = sectionIcons[s.icon] || sectionIcons.heart
        const res = resultById[s.id]
        return (
          <article
            key={s.id}
            id={`guide-${s.id}`}
            className={styles.card}
            data-focus={focusId === s.id ? 'true' : 'false'}
            style={{ '--tone': s.color }}
          >
            <div className={styles.cardHead}>
              <span className={styles.icon}>
                <Icon width={24} height={24} />
              </span>
              <div className={styles.headText}>
                <span className={styles.label}>{s.label}</span>
                <h2 className={styles.cardTitle}>{s.title}</h2>
              </div>
              {res && (
                <div className={styles.resultBadge}>
                  <span className={styles.resultPercent}>{res.percent}%</span>
                  <span className={styles.resultLevel}>{res.level.name}</span>
                </div>
              )}
            </div>

            <h3 className={styles.stepsHeading}>خطوات عملية للنمو</h3>
            <ol className={styles.steps}>
              {guide.steps.map((step, i) => (
                <li key={i} className={styles.step}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <div>
                    <strong className={styles.stepTitle}>{step.title}</strong>
                    <span className={styles.stepDetail}>{step.detail}</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className={styles.practice}>
              <span className={styles.practiceIcon}>
                <CheckIcon width={18} height={18} />
              </span>
              <div>
                <strong className={styles.practiceTitle}>ممارسة هذا الأسبوع</strong>
                <span className={styles.practiceText}>{guide.practice}</span>
              </div>
            </div>
          </article>
        )
      })}

      <button
        type="button"
        className={styles.backBtn}
        onClick={() => onNavigate(results ? '/result' : '/stages')}
      >
        {results ? 'العودة للنتيجة' : 'مراحل النمو'}
        <ArrowLeftIcon width={18} height={18} />
      </button>
    </section>
  )
}

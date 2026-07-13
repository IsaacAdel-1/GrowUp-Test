import { levels } from '../data/levels.js'
import { stagesIntro } from '../data/growthGuide.js'
import { CheckIcon, ArrowLeftIcon } from './icons.jsx'
import { levelChars } from './LevelCharacters.jsx'
import { toneHex } from '../utils/palette.js'
import MaturityLadder from './MaturityLadder.jsx'
import styles from './StagesView.module.css'

/**
 * صفحة مراحل النمو الوجداني الأربع + شرح كل مرحلة.
 *
 * props:
 *  - currentOrder: ترتيب مستوى المستخدم العام (اختياري، للإبراز)
 *  - onNavigate: (path) => void
 */
export default function StagesView({ currentOrder, onNavigate }) {
  return (
    <section className={styles.wrap}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>رحلة النضج</span>
        <h1 className={styles.title}>مراحل النمو الوجداني</h1>
        <p className={styles.intro}>{stagesIntro}</p>
      </header>

      <div className={styles.ladderCard}>
        <MaturityLadder levels={levels} currentOrder={currentOrder} />
      </div>

      <div className={styles.stages}>
        {[...levels]
          .slice()
          .reverse()
          .map((lvl) => {
            const Char = levelChars[lvl.id] || levelChars.infant
            return (
            <article
              key={lvl.id}
              className={styles.stage}
              data-tone={lvl.tone}
              data-current={lvl.order === currentOrder ? 'true' : 'false'}
            >
              <div className={styles.stageHead}>
                <span className={styles.charBadge}>
                  <Char size={62} color={toneHex[lvl.tone]} />
                  <span className={styles.order}>{lvl.order}</span>
                </span>
                <div>
                  <h2 className={styles.stageName}>
                    {lvl.name}
                    {lvl.order === currentOrder && (
                      <span className={styles.youBadge}>مستواك الحالي</span>
                    )}
                  </h2>
                  <p className={styles.stageTagline}>{lvl.tagline}</p>
                </div>
              </div>

              <p className={styles.desc}>{lvl.description}</p>

              <ul className={styles.traits}>
                {lvl.traits.map((t, i) => (
                  <li key={i} className={styles.trait}>
                    <CheckIcon width={15} height={15} />
                    {t}
                  </li>
                ))}
              </ul>
            </article>
            )
          })}
      </div>

      <button
        type="button"
        className={styles.cta}
        onClick={() => onNavigate('/guide')}
      >
        كيف أنتقل للمرحلة التالية؟ — دليل النمو
        <ArrowLeftIcon width={18} height={18} />
      </button>
    </section>
  )
}

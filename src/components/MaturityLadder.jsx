import { levelChars } from './LevelCharacters.jsx'
import { toneHex } from '../utils/palette.js'
import styles from './MaturityLadder.module.css'

/**
 * سُلّم النضج — أربع شخصيات صاعدة من رضيع إلى راشد، تُبرز مرحلتك الحالية.
 *
 * props:
 *  - levels: مصفوفة المستويات (مرتّبة تصاعدياً)
 *  - currentOrder: ترتيب المستوى الحالي (1..4) — يُبرز
 *  - onSelect: (levelId) => void  اختياري
 */
export default function MaturityLadder({ levels, currentOrder, onSelect }) {
  return (
    <div className={styles.ladder} role="list">
      {levels.map((lvl) => {
        const Char = levelChars[lvl.id] || levelChars.infant
        const isCurrent = lvl.order === currentOrder
        const charSize = 58 + lvl.order * 6 // 64 → 82
        return (
          <button
            type="button"
            key={lvl.id}
            role="listitem"
            className={styles.step}
            data-tone={lvl.tone}
            data-current={isCurrent ? 'true' : 'false'}
            onClick={() => onSelect?.(lvl.id)}
          >
            {isCurrent && <span className={styles.here}>أنت هنا</span>}
            <span
              className={styles.charWrap}
              style={{ animationDelay: `${lvl.order * 0.25}s` }}
            >
              <Char size={charSize} color={toneHex[lvl.tone]} />
            </span>
            <span className={styles.num}>{lvl.order}</span>
            <span className={styles.name}>{lvl.name}</span>
          </button>
        )
      })}
    </div>
  )
}

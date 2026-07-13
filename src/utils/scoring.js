/* ============================================================
   منطق حساب النتائج — يعتمد على جدول الدرجات الرسمي
   ------------------------------------------------------------
   • درجة كل مبدأ = مجموع إجاباته (كل سؤال من 1 إلى 4).
   • المستوى يُحدَّد بمقارنة المجموع بحدود المبدأ (thresholds):
       المجموع ≥ adult       → راشد وجدانياً
       المجموع ≥ adolescent  → مراهق وجدانياً
       المجموع ≥ child       → طفل وجدانياً
       غير ذلك               → رضيع وجدانياً
   • المستوى العام = متوسط ترتيب مستويات المبادئ الستة.
   ============================================================ */

import { levels, levelsById } from '../data/levels.js'

const MAX_PER_QUESTION = 4

/* يحدّد مستوى مبدأ من مجموعه وحدوده */
export function levelIdForScore(sum, thresholds) {
  if (sum >= thresholds.adult) return 'adult'
  if (sum >= thresholds.adolescent) return 'adolescent'
  if (sum >= thresholds.child) return 'child'
  return 'infant'
}

/* يحسب نتيجة كل مبدأ + النتيجة الإجمالية والمستوى العام */
export function computeResults(sections, answers, questionKey) {
  let totalSum = 0
  let totalMax = 0
  let orderSum = 0

  const sectionResults = sections.map((section) => {
    const max = section.questions.length * MAX_PER_QUESTION
    const sum = section.questions.reduce((acc, _q, i) => {
      const v = answers[questionKey(section.id, i)]
      return acc + (typeof v === 'number' ? v : 0)
    }, 0)

    totalSum += sum
    totalMax += max

    const percent = max > 0 ? Math.round((sum / max) * 100) : 0
    const levelId = levelIdForScore(sum, section.thresholds)
    const level = levelsById[levelId]
    orderSum += level.order

    return {
      id: section.id,
      title: section.title,
      short: section.short,
      icon: section.icon,
      label: section.label,
      color: section.color,
      sum,
      max,
      percent,
      level,
    }
  })

  const overallPercent =
    totalMax > 0 ? Math.round((totalSum / totalMax) * 100) : 0

  // المستوى العام = متوسط ترتيب مستويات المبادئ (مقرّب، محصور 1..4)
  const avgOrder = sectionResults.length
    ? Math.round(orderSum / sectionResults.length)
    : 1
  const clamped = Math.min(4, Math.max(1, avgOrder))
  const overallLevel = levels.find((l) => l.order === clamped) || levels[0]

  // أضعف وأقوى مبدأ (لعرض التوصيات)
  const sorted = [...sectionResults].sort((a, b) => a.percent - b.percent)
  const weakest = sorted[0]
  const strongest = sorted[sorted.length - 1]

  return {
    sectionResults,
    overallPercent,
    overallLevel,
    weakest,
    strongest,
  }
}

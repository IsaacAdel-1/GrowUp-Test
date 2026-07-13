import { questionKey } from '../data/quizData.js'
import QuizHeader from './QuizHeader.jsx'
import ProgressBar from './ProgressBar.jsx'
import SectionCard from './SectionCard.jsx'
import QuestionCard from './QuestionCard.jsx'
import QuizNav from './QuizNav.jsx'
import QuizFooter from './QuizFooter.jsx'
import styles from '../App.module.css'

/**
 * واجهة الاختبار (عرض فقط) — الترويسة + التقدّم + القسم + التنقّل.
 * تستقبل الحالة والدوال من App.
 */
export default function QuizView({
  meta,
  scale,
  section,
  current,
  totalSections,
  answeredCount,
  totalQuestions,
  segments,
  answers,
  sectionComplete,
  isLast,
  onAnswer,
  onPrev,
  onNext,
}) {
  return (
    <>
      <QuizHeader badge={meta.badge} title={meta.title} />

      <div className={styles.card}>
        <ProgressBar
          currentSection={current + 1}
          totalSections={totalSections}
          answered={answeredCount}
          total={totalQuestions}
          segments={segments}
        />

        <div className={styles.body}>
          <SectionCard
            key={section.id}
            label={section.label}
            title={section.title}
            subtitle={section.subtitle}
            icon={section.icon}
          >
            {section.questions.map((q, i) => (
              <QuestionCard
                key={`${section.id}-${i}`}
                number={i + 1}
                text={q}
                scale={scale}
                value={answers[questionKey(section.id, i)] ?? null}
                onChange={(v) => onAnswer(i, v)}
                name={questionKey(section.id, i)}
              />
            ))}
          </SectionCard>

          <QuizNav
            onPrev={onPrev}
            onNext={onNext}
            canPrev={current > 0}
            canNext={sectionComplete}
            isLast={isLast}
            helper={sectionComplete ? undefined : 'أجب على كل الأسئلة للمتابعة'}
          />
        </div>
      </div>

      <QuizFooter note={meta.sessionNote} />
    </>
  )
}

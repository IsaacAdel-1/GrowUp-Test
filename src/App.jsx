import { useEffect, useMemo, useState } from 'react'
import {
  meta,
  scale,
  sections,
  totalQuestions,
  questionKey,
} from './data/quizData.js'
import { computeResults } from './utils/scoring.js'
import { useHashRoute } from './hooks/useHashRoute.js'
import Navbar from './components/Navbar.jsx'
import QuizView from './components/QuizView.jsx'
import ResultsView from './components/ResultsView.jsx'
import StagesView from './components/StagesView.jsx'
import GuideView from './components/GuideView.jsx'
import ReportView from './components/ReportView.jsx'
import styles from './App.module.css'

const STORAGE_KEY = 'growup-maturity-answers'

function loadAnswers() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export default function App() {
  const [answers, setAnswers] = useState(loadAnswers)
  const [current, setCurrent] = useState(0) // فهرس القسم في الاختبار
  const [route, navigate] = useHashRoute()

  /* حفظ الإجابات داخل الجلسة */
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    } catch {
      /* تجاهل */
    }
  }, [answers])

  /* التمرير لأعلى عند تبديل القسم داخل الاختبار */
  useEffect(() => {
    if (route.view === 'quiz') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [current, route.view])

  const setAnswer = (sectionId, index, value) => {
    setAnswers((prev) => ({ ...prev, [questionKey(sectionId, index)]: value }))
  }

  const answeredCount = useMemo(
    () =>
      sections.reduce(
        (acc, s) =>
          acc +
          s.questions.filter(
            (_q, i) => typeof answers[questionKey(s.id, i)] === 'number',
          ).length,
        0,
      ),
    [answers],
  )

  const segments = useMemo(
    () =>
      sections.map((s) => {
        const done = s.questions.filter(
          (_q, i) => typeof answers[questionKey(s.id, i)] === 'number',
        ).length
        return s.questions.length ? done / s.questions.length : 0
      }),
    [answers],
  )

  const allAnswered = answeredCount === totalQuestions

  const results = useMemo(
    () => computeResults(sections, answers, questionKey),
    [answers],
  )

  const section = sections[current]
  const sectionComplete = section.questions.every(
    (_q, i) => typeof answers[questionKey(section.id, i)] === 'number',
  )
  const isLast = current === sections.length - 1

  const handleNext = () => {
    if (!sectionComplete) return
    if (isLast) {
      navigate('/result')
    } else {
      setCurrent((c) => Math.min(c + 1, sections.length - 1))
    }
  }

  const handlePrev = () => setCurrent((c) => Math.max(c - 1, 0))

  const handleRestart = () => {
    setAnswers({})
    setCurrent(0)
    try {
      sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      /* تجاهل */
    }
    navigate('/quiz')
  }

  /* اختيار العرض حسب المسار */
  const renderView = () => {
    switch (route.view) {
      case 'result':
        return allAnswered ? (
          <ResultsView
            results={results}
            onNavigate={navigate}
            onRestart={handleRestart}
          />
        ) : (
          <div className={styles.notReady}>
            <h2>لم تُكمل الاختبار بعد</h2>
            <p>أجب على كل الأسئلة أولاً لعرض نتيجتك وتحليلها.</p>
            <button type="button" onClick={() => navigate('/quiz')}>
              العودة للاختبار
            </button>
          </div>
        )
      case 'report':
        return allAnswered ? (
          <ReportView results={results} onNavigate={navigate} />
        ) : (
          <div className={styles.notReady}>
            <h2>لم تُكمل الاختبار بعد</h2>
            <p>أجب على كل الأسئلة أولاً لإنشاء التقرير.</p>
            <button type="button" onClick={() => navigate('/quiz')}>
              العودة للاختبار
            </button>
          </div>
        )
      case 'stages':
        return (
          <StagesView
            currentOrder={allAnswered ? results.overallLevel.order : undefined}
            onNavigate={navigate}
          />
        )
      case 'guide':
        return (
          <GuideView
            focusId={route.param}
            results={allAnswered ? results : null}
            onNavigate={navigate}
          />
        )
      case 'quiz':
      default:
        return (
          <QuizView
            meta={meta}
            scale={scale}
            section={section}
            current={current}
            totalSections={sections.length}
            answeredCount={answeredCount}
            totalQuestions={totalQuestions}
            segments={segments}
            answers={answers}
            sectionComplete={sectionComplete}
            isLast={isLast}
            onAnswer={(i, v) => setAnswer(section.id, i, v)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )
    }
  }

  return (
    <>
      <Navbar
        view={route.view}
        onNavigate={navigate}
        resultAvailable={allAnswered}
      />
      <main className={styles.page}>
        <div className={styles.container}>{renderView()}</div>
      </main>
    </>
  )
}

import styles from './QuizFooter.module.css'

/**
 * تذييل: ملاحظة الخصوصية أسفل الاختبار.
 * props: note (نص الملاحظة)
 */
export default function QuizFooter({ note }) {
  return <p className={styles.note}>{note}</p>
}

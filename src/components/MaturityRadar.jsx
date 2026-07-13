import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import ChartTooltip from './ChartTooltip.jsx'
import { brandHex, brandDeepHex, chartGrid, chartInk } from '../utils/palette.js'
import styles from './MaturityChart.module.css'

/**
 * رادار شارت — يعرض "شكل" النضج عبر المبادئ الستة (سلسلة واحدة)،
 * مع نقاط وأسماء ملوّنة بلون كل مبدأ.
 * props:
 *  - data = [{ subject, percent, level, tone, color }]
 *  - animate: تفعيل الأنيميشن (false للتقرير/الطباعة)
 */
export default function MaturityRadar({ data, animate = true }) {
  const colorBySubject = {}
  data.forEach((d) => {
    colorBySubject[d.subject] = d.color || brandDeepHex
  })

  // نقطة ملوّنة عند كل رأس (بلون المبدأ)
  const ColoredDot = (props) => {
    const { cx, cy, payload } = props
    if (cx == null || cy == null) return null
    const c = payload?.color || brandDeepHex
    return (
      <circle cx={cx} cy={cy} r={5} fill={c} stroke="#fff" strokeWidth={2} />
    )
  }

  // اسم المبدأ ملوّن حول الرادار
  const AngleTick = (props) => {
    const { x, y, textAnchor, payload } = props
    const c = colorBySubject[payload.value] || chartInk
    return (
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        dominantBaseline="central"
        fill={c}
        fontSize={13}
        fontWeight={700}
      >
        {payload.value}
      </text>
    )
  }

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>خريطة النضج عبر المبادئ</h3>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="70%">
            <PolarGrid stroke={chartGrid} />
            <PolarAngleAxis dataKey="subject" tick={<AngleTick />} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              dataKey="percent"
              stroke={brandDeepHex}
              strokeWidth={2}
              fill={brandHex}
              fillOpacity={0.22}
              dot={<ColoredDot />}
              isAnimationActive={animate}
              animationDuration={900}
            />
            <Tooltip content={<ChartTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

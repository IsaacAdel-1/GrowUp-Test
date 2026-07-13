import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import ChartTooltip from './ChartTooltip.jsx'
import { chartGrid, chartInk } from '../utils/palette.js'
import styles from './MaturityChart.module.css'

/**
 * شارت أعمدة أفقية مرتّبة — يقارن نسبة النضج بين المبادئ الستة
 * (من الأعلى للأدنى)، كل عمود بلون مستواه.
 * props:
 *  - data = [{ subject, percent, level, tone }]
 *  - animate: تفعيل الأنيميشن (false للطباعة)
 */
export default function MaturityBar({ data, animate = true }) {
  const sorted = [...data].sort((a, b) => b.percent - a.percent)

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>ترتيب المبادئ من الأقوى للأضعف</h3>
      <div
        className={styles.chart}
        style={{ height: `${Math.max(230, sorted.length * 46)}px` }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={sorted}
            margin={{ top: 4, right: 40, left: 8, bottom: 4 }}
            barCategoryGap="28%"
          >
            <CartesianGrid horizontal={false} stroke={chartGrid} strokeDasharray="4 4" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="subject"
              width={86}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 13, fontWeight: 700, fill: chartInk }}
            />
            <Bar
              dataKey="percent"
              radius={[0, 6, 6, 0]}
              isAnimationActive={false}
              barSize={18}
            >
              {sorted.map((d) => (
                <Cell key={d.subject} fill={d.color} />
              ))}
              <LabelList
                dataKey="percent"
                position="right"
                formatter={(v) => `${v}%`}
                style={{ fill: chartInk, fontSize: 13, fontWeight: 800 }}
              />
            </Bar>
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(42,58,52,0.05)' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

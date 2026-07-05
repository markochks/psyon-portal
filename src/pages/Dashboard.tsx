import { BriefcaseMedical, CalendarDays } from 'lucide-react'
import { formatRub, payrollMonths } from '../data/payroll'
import type { User } from '../types'

type Props = {
  user: User
}

const current = payrollMonths[2]

export function Dashboard({ user }: Props) {
  return (
    <section className="flex-1 p-6 animate-fade-in-up">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-emerald-700">{current.label}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Итоги отчетного периода
          </h1>
          <p className="mt-2 text-slate-500">
            {user.name} · {user.position} · {user.branch}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          <CalendarDays size={18} />
          Период: {current.period}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Оплата труда" value={formatRub(current.total)} delta="+8,2% к маю" />
        <MetricCard title="KPI" value={`${current.kpi}%`} delta="цель выполнена" />
        <MetricCard title="Консультации" value={String(current.consultations)} delta="+8 к маю" />
        <MetricCard title="Выручка врача" value={formatRub(current.revenue)} delta="+11,4% к маю" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Динамика оплаты труда</h2>
              <p className="mt-1 text-sm text-slate-500">Последние 3 месяца</p>
            </div>
            <BriefcaseMedical className="text-emerald-700" size={22} />
          </div>

          <div className="flex h-64 items-end gap-4">
            {payrollMonths.map((month) => (
              <div key={month.key} className="flex flex-1 flex-col items-center gap-3">
                <div
                  className="w-full rounded-t-2xl bg-emerald-700/80 transition-all duration-500 hover:bg-emerald-800"
                  style={{ height: `${month.total / 1000}px` }}
                />
                <span className="text-xs text-slate-500">{month.label.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <InsightCard
            title="Что увеличило доход"
            items={[
              'Рост консультаций к маю',
              'KPI выше целевого значения',
              'Выручка врача выросла на 11,4%',
            ]}
          />

          <InsightCard
            title="Зона внимания"
            items={[
              'Заявки с сайта ниже прошлого месяца',
              'Есть потенциал по LTV новых клиентов',
              'Онлайн-консультации можно усилить',
            ]}
            muted
          />
        </div>
      </div>
    </section>
  )
}

function MetricCard({ title, value, delta }: { title: string; value: string; delta: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-3 text-sm font-medium text-emerald-700">{delta}</p>
    </div>
  )
}

function InsightCard({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <p key={item} className={muted ? 'text-sm text-slate-500' : 'text-sm text-slate-700'}>
            • {item}
          </p>
        ))}
      </div>
    </div>
  )
}

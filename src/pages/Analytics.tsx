import type { User } from '../types'

type Props = {
  user: User
}

const branches = [
  ['Екатеринбург', '4 820 000 ₽', '94%', '38%', 'Рост'],
  ['Санкт-Петербург', '3 940 000 ₽', '89%', '34%', 'Стабильно'],
  ['Тюмень', '2 760 000 ₽', '87%', '31%', 'Зона роста'],
]

export function Analytics({ user }: Props) {
  return (
    <section className="flex-1 p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-emerald-700">C-Level аналитика</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Сводка по филиалам
        </h1>
        <p className="mt-2 text-slate-500">
          {user.name} · агрегированные показатели по расчету оплаты труда.
        </p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <Card title="Общая выручка" value="11 520 000 ₽" />
        <Card title="ФОТ" value="2 360 000 ₽" />
        <Card title="Средний KPI" value="91%" />
        <Card title="Средний LTV" value="4.5" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Динамика выручки и ФОТ</h2>
          <p className="mt-1 text-sm text-slate-500">Демо-график за 6 месяцев</p>

          <div className="mt-8 flex h-72 items-end gap-4">
            {[52, 61, 58, 69, 78, 86].map((value, index) => (
              <div key={value} className="flex flex-1 flex-col items-center gap-3">
                <div
                  className="w-full rounded-t-2xl bg-emerald-700/80"
                  style={{ height: `${value * 3}px` }}
                />
                <span className="text-xs text-slate-500">
                  {['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-semibold">Филиалы</h2>
          </div>

          <div className="divide-y divide-slate-100">
            {branches.map(([branch, revenue, kpi, fot, status]) => (
              <div key={branch} className="p-5">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{branch}</p>
                  <p className="text-sm font-medium text-emerald-700">{status}</p>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-sm text-slate-500">
                  <p>Выручка<br /><span className="font-medium text-slate-900">{revenue}</span></p>
                  <p>KPI<br /><span className="font-medium text-slate-900">{kpi}</span></p>
                  <p>ФОТ %<br /><span className="font-medium text-slate-900">{fot}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
    </div>
  )
}
import type { User } from '../types'

type Props = {
  user: User
}

const kpiRows = [
  ['Заявки с сайта', '42', '50', '84%', 'Среднее влияние'],
  ['Консультации', '118', '110', '107%', 'Высокое влияние'],
  ['Выручка врача', '2 140 000 ₽', '1 900 000 ₽', '113%', 'Высокое влияние'],
  ['LTV клиента', '4.7', '4.3', '109%', 'Среднее влияние'],
]

export function Kpi({ user }: Props) {
  return (
    <section className="flex-1 p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-emerald-700">Июнь 2026</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">KPI</h1>
        <p className="mt-2 text-slate-500">
          Показатели эффективности: {user.name} · {user.position}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Итоговый KPI</p>
          <p className="mt-3 text-3xl font-semibold">94%</p>
          <p className="mt-3 text-sm font-medium text-emerald-700">цель выполнена</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">KPI-бонус</p>
          <p className="mt-3 text-3xl font-semibold">4 000 ₽</p>
          <p className="mt-3 text-sm font-medium text-emerald-700">включен в расчет</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Статус периода</p>
          <p className="mt-3 text-3xl font-semibold">Закрыт</p>
          <p className="mt-3 text-sm font-medium text-slate-500">данные синтетические</p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold">Детализация KPI</h2>
          <p className="mt-1 text-sm text-slate-500">
            Таблица показывает план, факт и степень выполнения по ключевым метрикам.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Показатель</th>
                <th className="px-6 py-4 font-medium">Факт</th>
                <th className="px-6 py-4 font-medium">План</th>
                <th className="px-6 py-4 font-medium">Выполнение</th>
                <th className="px-6 py-4 font-medium">Влияние</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {kpiRows.map(([name, fact, plan, percent, impact]) => (
                <tr key={name}>
                  <td className="px-6 py-4 font-medium text-slate-900">{name}</td>
                  <td className="px-6 py-4 text-slate-600">{fact}</td>
                  <td className="px-6 py-4 text-slate-600">{plan}</td>
                  <td className="px-6 py-4 font-medium text-emerald-700">{percent}</td>
                  <td className="px-6 py-4 text-slate-600">{impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
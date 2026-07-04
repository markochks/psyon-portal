import type { User } from '../types'

type Props = {
  user: User
}

const accrualRows = [
  ['Базовая ставка', 'Фиксированная часть за отчетный период', '80 000 ₽'],
  ['Заявки с сайта', '42 заявки × 650 ₽', '27 300 ₽'],
  ['Консультации', '118 консультаций с учетом типа услуги', '64 900 ₽'],
  ['Выручка врача', '2 140 000 ₽ × 1,4%', '29 960 ₽'],
  ['LTV клиентов', 'Коэффициент повторных обращений', '8 640 ₽'],
  ['KPI-бонус', 'KPI 94%, цель выполнена', '4 000 ₽'],
]

const coefficientRows = [
  ['Заявка с сайта', '650 ₽', 'Администратор'],
  ['Первичная консультация', '1.00', 'Руководитель'],
  ['Повторная консультация', '1.15', 'Руководитель'],
  ['Выручка врача', '1.4%', 'C-Level'],
  ['LTV', '0.8', 'C-Level'],
  ['KPI-бонус', 'до 5 000 ₽', 'Администратор'],
]

export function Salary({ user }: Props) {
  return (
    <section className="flex-1 p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-medium text-emerald-700">Расчетный лист · июнь 2026</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Оплата труда
          </h1>
          <p className="mt-2 text-slate-500">
            {user.name} · {user.position} · {user.branch}
          </p>
        </div>

        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          Скачать PDF
        </button>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <SummaryCard title="Итого к начислению" value="214 800 ₽" accent />
        <SummaryCard title="Период" value="Июнь 2026" />
        <SummaryCard title="Статус" value="Согласовано" />
        <SummaryCard title="Версия формулы" value="v2.4" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-lg font-semibold">Структура начислений</h2>
              <p className="mt-1 text-sm text-slate-500">
                Каждый блок показывает источник суммы и принцип расчета.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {accrualRows.map(([name, description, amount]) => (
                <div
                  key={name}
                  className="grid gap-4 p-5 md:grid-cols-[220px_1fr_150px] md:items-center"
                >
                  <div className="font-medium text-slate-900">{name}</div>
                  <div className="text-sm text-slate-500">{description}</div>
                  <div className="text-left font-semibold md:text-right">{amount}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 p-6">
              <span className="text-sm font-medium text-slate-600">Итого</span>
              <span className="text-2xl font-semibold">214 800 ₽</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-lg font-semibold">Коэффициенты расчета</h2>
              <p className="mt-1 text-sm text-slate-500">
                Показывает, какие параметры повлияли на расчетный лист.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Параметр</th>
                    <th className="px-6 py-4 font-medium">Значение</th>
                    <th className="px-6 py-4 font-medium">Кто управляет</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {coefficientRows.map(([name, value, owner]) => (
                    <tr key={name}>
                      <td className="px-6 py-4 font-medium text-slate-900">{name}</td>
                      <td className="px-6 py-4 text-slate-600">{value}</td>
                      <td className="px-6 py-4 text-slate-600">{owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
            <p className="text-sm font-medium text-emerald-800">Главная ценность</p>
            <p className="mt-3 text-sm leading-6 text-emerald-950">
              Сотрудник видит не только итоговую сумму, но и прозрачную детализацию:
              из каких показателей сложилась оплата труда и какие коэффициенты
              были применены.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Формула периода</h2>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              База + заявки + консультации + % от выручки + LTV + KPI-бонус
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Статус расчетного листа</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <p>✓ Данные из CRM загружены</p>
              <p>✓ Коэффициенты применены</p>
              <p>✓ Расчет проверен</p>
              <p>✓ Доступен сотруднику</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function SummaryCard({
  title,
  value,
  accent = false,
}: {
  title: string
  value: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-3xl border p-5 shadow-sm ${
        accent
          ? 'border-emerald-100 bg-emerald-50'
          : 'border-slate-200 bg-white'
      }`}
    >
      <p className={accent ? 'text-sm text-emerald-800' : 'text-sm text-slate-500'}>
        {title}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  )
}
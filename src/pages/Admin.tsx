import type { User } from '../types'

type Props = {
  user: User
}

const settings = [
  ['Заявка с сайта', '650 ₽', 'фиксированная сумма за заявку'],
  ['Первичная консультация', '1.00', 'базовый коэффициент услуги'],
  ['Повторная консультация', '1.15', 'коэффициент повторного визита'],
  ['Процент от выручки', '1.4%', 'переменная часть от выручки врача'],
  ['LTV', '0.8', 'коэффициент удержания клиента'],
  ['KPI-бонус', 'до 5 000 ₽', 'премия за выполнение KPI'],
]

export function Admin({ user }: Props) {
  return (
    <section className="flex-1 p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-emerald-700">Администрирование</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Коэффициенты расчета
        </h1>
        <p className="mt-2 text-slate-500">
          {user.name}. Настройки, влияющие на расчетные листы сотрудников.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-lg font-semibold">Параметры формулы</h2>
            <p className="mt-1 text-sm text-slate-500">
              В MVP поля демонстрационные. В боевой версии изменения сохраняются в БД.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {settings.map(([name, value, description]) => (
              <div key={name} className="grid gap-4 p-5 md:grid-cols-[220px_160px_1fr] md:items-center">
                <div className="font-medium text-slate-900">{name}</div>
                <input
                  defaultValue={value}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
                />
                <div className="text-sm text-slate-500">{description}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-end border-t border-slate-200 bg-slate-50 p-6">
            <button className="rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900">
              Сохранить изменения
            </button>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
            <p className="text-sm font-medium text-emerald-800">Контроль изменений</p>
            <p className="mt-3 text-sm leading-6 text-emerald-950">
              Каждое изменение формулы должно сохраняться с версией, автором и датой.
              Это позволяет объяснять сотрудникам, по какой логике был сделан расчет.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Текущая версия</h2>
            <p className="mt-4 text-3xl font-semibold">v2.4</p>
            <p className="mt-2 text-sm text-slate-500">Применяется с 01.06.2026</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
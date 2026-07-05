import type { User } from '../types'

type Props = {
  user: User
}

const teamRows = [
  ['Анна Викторовна', 'Психотерапевт', 'Екатеринбург', '94%', '214 800 ₽', 'Согласовано'],
  ['Сергей Павлович', 'Психиатр', 'Санкт-Петербург', '89%', '201 300 ₽', 'На проверке'],
  ['Мария Игоревна', 'Психолог', 'Тюмень', '91%', '188 600 ₽', 'Согласовано'],
  ['Дмитрий Олегович', 'Психотерапевт', 'Екатеринбург', '76%', '162 400 ₽', 'Требует внимания'],
]

export function Team({ user }: Props) {
  return (
    <section className="flex-1 p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-emerald-700">Команда · июнь 2026</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Сотрудники и расчетные листы
        </h1>
        <p className="mt-2 text-slate-500">
          Роль: {user.roleLabel}. Сводка по специалистам и статусам расчетов.
        </p>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <Card title="Специалистов" value="12" />
        <Card title="Средний KPI" value="91%" />
        <Card title="ФОТ периода" value="2 360 000 ₽" />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-semibold">Расчетные листы сотрудников</h2>
          <p className="mt-1 text-sm text-slate-500">
            Быстрый контроль сумм, KPI и статуса согласования.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">Сотрудник</th>
                <th className="px-6 py-4 font-medium">Профиль</th>
                <th className="px-6 py-4 font-medium">Филиал</th>
                <th className="px-6 py-4 font-medium">KPI</th>
                <th className="px-6 py-4 font-medium">К начислению</th>
                <th className="px-6 py-4 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teamRows.map(([name, position, branch, kpi, salary, status]) => (
                <tr key={name}>
                  <td className="px-6 py-4 font-medium text-slate-900">{name}</td>
                  <td className="px-6 py-4 text-slate-600">{position}</td>
                  <td className="px-6 py-4 text-slate-600">{branch}</td>
                  <td className="px-6 py-4 font-medium text-emerald-700">{kpi}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{salary}</td>
                  <td className="px-6 py-4 text-slate-600">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
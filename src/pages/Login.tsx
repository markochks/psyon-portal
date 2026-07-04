import type { UserRole } from '../types'

type Props = {
  onSelectRole: (role: UserRole) => void
}

export function Login({ onSelectRole }: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-900">
      <section className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
            PSYONCLINIC
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Портал оплаты труда
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Демонстрационный внутренний портал для специалистов, руководителей,
            C-Level и администратора системы.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-sm font-medium text-slate-900">
            Быстрый вход в демо-роль
          </p>

          <div className="grid gap-3">
            <RoleButton title="Специалист" description="Своя оплата труда, KPI и динамика" onClick={() => onSelectRole('specialist')} />
            <RoleButton title="Руководитель" description="Команда и корректировка KPI" onClick={() => onSelectRole('manager')} />
            <RoleButton title="C-Level" description="Аналитика по всем филиалам" onClick={() => onSelectRole('c-level')} />
            <RoleButton title="Администратор" description="Коэффициенты и логика расчета" onClick={() => onSelectRole('admin')} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          В демо используются только синтетические данные
        </p>
      </section>
    </main>
  )
}

function RoleButton({
  title,
  description,
  onClick,
}: {
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-slate-200 px-4 py-4 text-left transition hover:border-emerald-700 hover:bg-emerald-50"
    >
      <span className="block font-medium">{title}</span>
      <span className="text-sm text-slate-500">{description}</span>
    </button>
  )
}
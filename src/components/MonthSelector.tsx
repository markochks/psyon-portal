import type { PayrollMonth, PayrollMonthKey } from '../data/payroll'

type Props = {
  months: PayrollMonth[]
  selected: PayrollMonthKey
  onChange: (key: PayrollMonthKey) => void
}

export function MonthSelector({ months, selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      {months.map((month) => (
        <button
          key={month.key}
          type="button"
          onClick={() => onChange(month.key)}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            selected === month.key
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          {month.label.replace(' 2026', '')}
        </button>
      ))}
    </div>
  )
}

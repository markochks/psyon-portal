import { useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { MonthSelector } from '../components/MonthSelector'
import { formatRub, payrollMonths, type PayrollMonthKey } from '../data/payroll'
import type { User } from '../types'

type Props = {
  user: User
}

const coefficientRows = [
  ['Заявка с сайта', '650 ₽', 'Администратор'],
  ['Первичная консультация', '1.00', 'Руководитель'],
  ['Повторная консультация', '1.15', 'Руководитель'],
  ['Выручка врача', '1.4%', 'C-Level'],
  ['LTV', '0.8', 'C-Level'],
  ['KPI-бонус', 'до 5 000 ₽', 'Администратор'],
]

export function Salary({ user }: Props) {
  const [selectedMonth, setSelectedMonth] = useState<PayrollMonthKey>('june')
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const pdfRef = useRef<HTMLDivElement>(null)

  const month = useMemo(
    () => payrollMonths.find((item) => item.key === selectedMonth) ?? payrollMonths[0],
    [selectedMonth],
  )

  const diff = month.previousTotal ? month.total - month.previousTotal : 0

  async function downloadPdf() {
    if (!pdfRef.current) return

    setIsGeneratingPdf(true)

    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
      })

      const imageData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const imageWidth = pageWidth
      const imageHeight = (canvas.height * imageWidth) / canvas.width

      let heightLeft = imageHeight
      let position = 0

      pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imageHeight
        pdf.addPage()
        pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight)
        heightLeft -= pageHeight
      }

      pdf.save(` расчетный-лист-${user.name}-${month.label}.pdf`)
    } finally {
      setIsGeneratingPdf(false)
    }
  }

  return (
    <section className="flex-1 p-6 animate-fade-in-up">
      <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-sm font-medium text-emerald-700">Расчетный лист · {month.label}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Оплата труда</h1>
          <p className="mt-2 text-slate-500">
            {user.name} · {user.position} · {user.branch}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <MonthSelector months={payrollMonths} selected={selectedMonth} onChange={setSelectedMonth} />
          <button
            type="button"
            onClick={downloadPdf}
            disabled={isGeneratingPdf}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-70"
          >
            {isGeneratingPdf ? 'Готовим PDF...' : 'Скачать PDF'}
          </button>
        </div>
      </div>

      <div ref={pdfRef} className="bg-slate-50 pb-1">
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <SummaryCard title="Итого к начислению" value={formatRub(month.total)} accent />
          <SummaryCard title="Период" value={month.label} />
          <SummaryCard title="Статус" value={month.status} />
          <SummaryCard title="Версия формулы" value={month.formulaVersion} />
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <MiniMetric title="KPI" value={`${month.kpi}%`} />
          <MiniMetric title="Консультации" value={String(month.consultations)} />
          <MiniMetric title="Выручка" value={formatRub(month.revenue)} />
          <MiniMetric title="LTV" value={String(month.ltv)} />
        </div>

        {month.previousTotal && (
          <div className="mb-6 rounded-3xl border border-emerald-100 bg-emerald-50 p-5 text-sm text-emerald-950 shadow-sm">
            <span className="font-semibold">Изменение к прошлому месяцу:</span>{' '}
            {diff >= 0 ? '+' : ''}{formatRub(diff)}. Основные причины указаны в детализации ниже.
          </div>
        )}

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
                {month.rows.map((row) => (
                  <div
                    key={row.name}
                    className="grid gap-4 p-5 transition hover:bg-slate-50 md:grid-cols-[220px_1fr_150px] md:items-center"
                  >
                    <div className="flex items-center gap-3 font-medium text-slate-900">
                      <span className={indicatorClass(row.kind)} />
                      {row.name}
                    </div>
                    <div className="text-sm text-slate-500">{row.description}</div>
                    <div className="text-left font-semibold md:text-right">{formatRub(row.amount)}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 p-6">
                <span className="text-sm font-medium text-slate-600">Итого</span>
                <span className="text-2xl font-semibold">{formatRub(month.total)}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <h2 className="text-lg font-semibold">Коэффициенты расчета</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Какие параметры повлияли на расчетный лист.
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
              <p className="text-sm font-medium text-emerald-800">Почему именно такая сумма</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-emerald-950">
                {month.notes.map((note) => (
                  <p key={note}>✓ {note}</p>
                ))}
              </div>
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
      </div>
    </section>
  )
}

function SummaryCard({ title, value, accent = false }: { title: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-3xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${accent ? 'border-emerald-100 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
      <p className={accent ? 'text-sm text-emerald-800' : 'text-sm text-slate-500'}>{title}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  )
}

function MiniMetric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-xl font-semibold tracking-tight">{value}</p>
    </div>
  )
}

function indicatorClass(kind: 'positive' | 'neutral' | 'negative') {
  if (kind === 'positive') return 'h-2.5 w-2.5 rounded-full bg-emerald-500'
  if (kind === 'negative') return 'h-2.5 w-2.5 rounded-full bg-amber-500'
  return 'h-2.5 w-2.5 rounded-full bg-slate-300'
}

export type PayrollMonthKey = 'april' | 'may' | 'june'

export type PayrollRow = {
  name: string
  description: string
  amount: number
  kind: 'positive' | 'neutral' | 'negative'
}

export type PayrollMonth = {
  key: PayrollMonthKey
  label: string
  period: string
  formulaVersion: string
  status: string
  total: number
  previousTotal?: number
  kpi: number
  consultations: number
  revenue: number
  ltv: number
  siteRequests: number
  rows: PayrollRow[]
  notes: string[]
}

export const payrollMonths: PayrollMonth[] = [
  {
    key: 'april',
    label: 'Апрель 2026',
    period: '01.04.2026 — 30.04.2026',
    formulaVersion: 'v2.2',
    status: 'Согласовано',
    total: 189100,
    kpi: 88,
    consultations: 104,
    revenue: 1840000,
    ltv: 4.1,
    siteRequests: 39,
    rows: [
      { name: 'Базовая ставка', description: 'Фиксированная часть за отчетный период', amount: 80000, kind: 'neutral' },
      { name: 'Заявки с сайта', description: '39 заявок × 650 ₽', amount: 25350, kind: 'positive' },
      { name: 'Консультации', description: '104 консультации с учетом типа услуги', amount: 55600, kind: 'positive' },
      { name: 'Выручка врача', description: '1 840 000 ₽ × 1,25%', amount: 23000, kind: 'positive' },
      { name: 'LTV клиентов', description: 'Коэффициент повторных обращений', amount: 4150, kind: 'positive' },
      { name: 'KPI-бонус', description: 'KPI 88%, частичное выполнение', amount: 1000, kind: 'positive' },
    ],
    notes: ['KPI ниже целевого значения', 'Повторные консультации ниже плана', 'Расчет согласован руководителем'],
  },
  {
    key: 'may',
    label: 'Май 2026',
    period: '01.05.2026 — 31.05.2026',
    formulaVersion: 'v2.3',
    status: 'Согласовано',
    total: 198400,
    previousTotal: 189100,
    kpi: 91,
    consultations: 110,
    revenue: 1930000,
    ltv: 4.3,
    siteRequests: 48,
    rows: [
      { name: 'Базовая ставка', description: 'Фиксированная часть за отчетный период', amount: 80000, kind: 'neutral' },
      { name: 'Заявки с сайта', description: '48 заявок × 650 ₽', amount: 31200, kind: 'positive' },
      { name: 'Консультации', description: '110 консультаций с учетом типа услуги', amount: 58900, kind: 'positive' },
      { name: 'Выручка врача', description: '1 930 000 ₽ × 1,25%', amount: 24125, kind: 'positive' },
      { name: 'LTV клиентов', description: 'Коэффициент повторных обращений', amount: 4175, kind: 'positive' },
      { name: 'KPI-бонус', description: 'KPI 91%, цель выполнена', amount: 0, kind: 'neutral' },
    ],
    notes: ['Рост заявок с сайта', 'KPI достиг целевого уровня', 'LTV стабилен'],
  },
  {
    key: 'june',
    label: 'Июнь 2026',
    period: '01.06.2026 — 30.06.2026',
    formulaVersion: 'v2.4',
    status: 'Согласовано',
    total: 214800,
    previousTotal: 198400,
    kpi: 94,
    consultations: 118,
    revenue: 2140000,
    ltv: 4.7,
    siteRequests: 42,
    rows: [
      { name: 'Базовая ставка', description: 'Фиксированная часть за отчетный период', amount: 80000, kind: 'neutral' },
      { name: 'Заявки с сайта', description: '42 заявки × 650 ₽', amount: 27300, kind: 'negative' },
      { name: 'Консультации', description: '118 консультаций с учетом типа услуги', amount: 64900, kind: 'positive' },
      { name: 'Выручка врача', description: '2 140 000 ₽ × 1,4%', amount: 29960, kind: 'positive' },
      { name: 'LTV клиентов', description: 'Коэффициент повторных обращений', amount: 8640, kind: 'positive' },
      { name: 'KPI-бонус', description: 'KPI 94%, цель выполнена', amount: 4000, kind: 'positive' },
    ],
    notes: ['Консультации выше плана', 'Выручка выросла к маю', 'Заявки с сайта ниже прошлого месяца'],
  },
]

export function formatRub(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}

const benefits = [
  'Прозрачный расчет оплаты труда для специалистов',
  'Единая логика расчета для разных филиалов',
  'Подключение нескольких CRM через API',
  'Контроль коэффициентов и версий формулы',
  'Сводная аналитика для руководства',
]

export function About() {
  return (
    <section className="flex-1 p-6">
      <div className="mb-6">
        <p className="text-sm font-medium text-emerald-700">О проекте</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Как работает портал
        </h1>
        <p className="mt-2 text-slate-500">
          Мини-документация MVP: источники данных, расчетная логика и роли доступа.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Схема работы</h2>

          <div className="mt-6 space-y-4 text-sm">
            <FlowBox text="CRM Екатеринбург" />
            <FlowBox text="CRM Санкт-Петербург" />
            <FlowBox text="CRM Тюмень" />

            <div className="mx-auto h-8 w-px bg-slate-300" />
            <FlowBox text="API-интеграции и обработка данных" accent />
            <div className="mx-auto h-8 w-px bg-slate-300" />
            <FlowBox text="PostgreSQL / расчетная база" accent />
            <div className="mx-auto h-8 w-px bg-slate-300" />
            <FlowBox text="Портал оплаты труда" accent />

            <div className="grid gap-3 pt-2 md:grid-cols-4">
              <FlowBox text="Специалист" />
              <FlowBox text="Руководитель" />
              <FlowBox text="C-Level" />
              <FlowBox text="Администратор" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6">
            <p className="text-sm font-medium text-emerald-800">Основная ценность</p>
            <p className="mt-3 text-sm leading-6 text-emerald-950">
              Портал снижает количество ручных вопросов к бухгалтерии и руководителям:
              сотрудник видит итоговую сумму, показатели и формулу расчета в одном месте.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Что демонстрирует MVP</h2>
            <div className="mt-4 space-y-3">
              {benefits.map((item) => (
                <p key={item} className="text-sm text-slate-600">✓ {item}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FlowBox({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 text-center font-medium ${
        accent
          ? 'border-emerald-100 bg-emerald-50 text-emerald-900'
          : 'border-slate-200 bg-slate-50 text-slate-700'
      }`}
    >
      {text}
    </div>
  )
}
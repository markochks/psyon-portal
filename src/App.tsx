import { useState } from 'react'
import { Layout } from './components/Layout'
import { demoUsers } from './data/demo'
import { Dashboard } from './pages/Dashboard.tsx'
import { Kpi } from './pages/Kpi.tsx'
import { Login } from './pages/Login.tsx'
import { Salary } from './pages/Salary.tsx'
import type { AppPage, UserRole } from './types'

function App() {
  const [role, setRole] = useState<UserRole | null>(null)
  const [page, setPage] = useState<AppPage>('dashboard')

  if (!role) {
    return <Login onSelectRole={setRole} />
  }

  const user = demoUsers[role]

  return (
    <Layout
      user={user}
      page={page}
      onChangePage={setPage}
      onLogout={() => {
        setRole(null)
        setPage('dashboard')
      }}
    >
      {page === 'dashboard' && <Dashboard user={user} />}
      {page === 'salary' && <Salary user={user} />}
      {page === 'kpi' && <Kpi user={user} />}
      {!['dashboard', 'salary', 'kpi'].includes(page) && (
        <section className="flex-1 p-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-emerald-700">
              Раздел в разработке
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {page}
            </h1>
            <p className="mt-2 text-slate-500">
              Следующим шагом добавим полноценный экран для этого раздела.
            </p>
          </div>
        </section>
      )}
    </Layout>
  )
}

export default App
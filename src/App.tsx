import { useState } from 'react'
import { Layout } from './components/Layout'
import { demoUsers } from './data/demo'
import { Dashboard } from './pages/Dashboard.tsx'
import { Kpi } from './pages/Kpi.tsx'
import { Login } from './pages/Login.tsx'
import { Salary } from './pages/Salary.tsx'
import { Admin } from './pages/Admin.tsx'
import { Analytics } from './pages/Analytics.tsx'
import { About } from './pages/About.tsx'
import { Team } from './pages/Team.tsx'
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
     {page === 'team' && <Team user={user} />}
     {page === 'analytics' && <Analytics user={user} />}
     {page === 'admin' && <Admin user={user} />}
     {page === 'about' && <About />}
    </Layout>
  )
}

export default App
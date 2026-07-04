import {
  BarChart3,
  CircleDollarSign,
  FileText,
  Info,
  LineChart,
  LogOut,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react'
import type { AppPage, User } from '../types'

type Props = {
  user: User
  page: AppPage
  onChangePage: (page: AppPage) => void
  onLogout: () => void
  children: React.ReactNode
}

const menuByRole: Record<User['role'], Array<{ page: AppPage; label: string; icon: React.ReactNode }>> = {
  specialist: [
    { page: 'dashboard', label: 'Главная', icon: <BarChart3 size={18} /> },
    { page: 'salary', label: 'Оплата труда', icon: <CircleDollarSign size={18} /> },
    { page: 'kpi', label: 'KPI', icon: <TrendingUp size={18} /> },
    { page: 'about', label: 'О проекте', icon: <Info size={18} /> },
  ],
  manager: [
    { page: 'dashboard', label: 'Главная', icon: <BarChart3 size={18} /> },
    { page: 'salary', label: 'Оплата труда', icon: <CircleDollarSign size={18} /> },
    { page: 'kpi', label: 'KPI', icon: <TrendingUp size={18} /> },
    { page: 'team', label: 'Команда', icon: <Users size={18} /> },
    { page: 'about', label: 'О проекте', icon: <Info size={18} /> },
  ],
  'c-level': [
    { page: 'dashboard', label: 'Главная', icon: <BarChart3 size={18} /> },
    { page: 'analytics', label: 'Аналитика', icon: <LineChart size={18} /> },
    { page: 'team', label: 'Сотрудники', icon: <Users size={18} /> },
    { page: 'about', label: 'О проекте', icon: <Info size={18} /> },
  ],
  admin: [
    { page: 'dashboard', label: 'Главная', icon: <BarChart3 size={18} /> },
    { page: 'admin', label: 'Администрирование', icon: <Settings size={18} /> },
    { page: 'salary', label: 'Формула расчета', icon: <FileText size={18} /> },
    { page: 'about', label: 'О проекте', icon: <Info size={18} /> },
  ],
}

export function Layout({ user, page, onChangePage, onLogout, children }: Props) {
  const menu = menuByRole[user.role]

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-700">
              PSYONCLINIC
            </p>
            <p className="text-xs text-slate-500">Портал оплаты труда</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-500 sm:block">{user.name}</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">
              {user.roleLabel}
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              <LogOut size={16} />
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r border-slate-200 bg-white p-4 md:block">
          <nav className="space-y-1">
            {menu.map((item) => (
              <MenuItem
                key={item.page}
                active={page === item.page}
                icon={item.icon}
                label={item.label}
                onClick={() => onChangePage(item.page)}
              />
            ))}
          </nav>
        </aside>

        {children}
      </div>
    </main>
  )
}

function MenuItem({
  label,
  icon,
  active = false,
  onClick,
}: {
  label: string
  icon: React.ReactNode
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
        active
          ? 'bg-emerald-50 text-emerald-800'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
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
    { page: 'salary', label: 'Оплата', icon: <CircleDollarSign size={18} /> },
    { page: 'kpi', label: 'KPI', icon: <TrendingUp size={18} /> },
    { page: 'about', label: 'Проект', icon: <Info size={18} /> },
  ],
  manager: [
    { page: 'dashboard', label: 'Главная', icon: <BarChart3 size={18} /> },
    { page: 'salary', label: 'Оплата', icon: <CircleDollarSign size={18} /> },
    { page: 'kpi', label: 'KPI', icon: <TrendingUp size={18} /> },
    { page: 'team', label: 'Команда', icon: <Users size={18} /> },
    { page: 'about', label: 'Проект', icon: <Info size={18} /> },
  ],
  'c-level': [
    { page: 'dashboard', label: 'Главная', icon: <BarChart3 size={18} /> },
    { page: 'analytics', label: 'Аналитика', icon: <LineChart size={18} /> },
    { page: 'team', label: 'Люди', icon: <Users size={18} /> },
    { page: 'about', label: 'Проект', icon: <Info size={18} /> },
  ],
  admin: [
    { page: 'dashboard', label: 'Главная', icon: <BarChart3 size={18} /> },
    { page: 'admin', label: 'Админ', icon: <Settings size={18} /> },
    { page: 'salary', label: 'Формула', icon: <FileText size={18} /> },
    { page: 'about', label: 'Проект', icon: <Info size={18} /> },
  ],
}

export function Layout({ user, page, onChangePage, onLogout, children }: Props) {
  const menu = menuByRole[user.role]

  return (
    <main className="min-h-screen bg-slate-50 pb-20 text-slate-900 md:pb-0">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 md:text-sm md:tracking-[0.24em]">
              PSYONCLINIC
            </p>
            <p className="text-xs text-slate-500">Портал оплаты труда</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:block">{user.name}</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 md:text-sm">
              {user.roleLabel}
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 md:text-sm"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Выйти</span>
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

        <div className="w-full min-w-0">{children}</div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
        <div className="flex items-center justify-around gap-1">
          {menu.map((item) => (
            <MobileMenuItem
              key={item.page}
              active={page === item.page}
              icon={item.icon}
              label={item.label}
              onClick={() => onChangePage(item.page)}
            />
          ))}
        </div>
      </nav>
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

function MobileMenuItem({
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
      className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${
        active
          ? 'bg-emerald-50 text-emerald-800'
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      {icon}
      <span className="max-w-full truncate">{label}</span>
    </button>
  )
}
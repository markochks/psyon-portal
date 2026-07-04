export type UserRole = 'specialist' | 'manager' | 'c-level' | 'admin'
export type AppPage = 'dashboard' | 'salary' | 'kpi' | 'team' | 'analytics' | 'admin' | 'about'

export type User = {
  name: string
  role: UserRole
  roleLabel: string
  branch: string
  position: string
}
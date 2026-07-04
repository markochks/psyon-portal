import type { User, UserRole } from '../types'

export const demoUsers: Record<UserRole, User> = {
  specialist: {
    name: 'Анна Викторовна',
    role: 'specialist',
    roleLabel: 'Специалист',
    branch: 'Екатеринбург',
    position: 'Психотерапевт',
  },
  manager: {
    name: 'Михаил Андреевич',
    role: 'manager',
    roleLabel: 'Руководитель',
    branch: 'Санкт-Петербург',
    position: 'Руководитель группы специалистов',
  },
  'c-level': {
    name: 'Елена Сергеевна',
    role: 'c-level',
    roleLabel: 'C-Level',
    branch: 'Все филиалы',
    position: 'Операционный директор',
  },
  admin: {
    name: 'Администратор системы',
    role: 'admin',
    roleLabel: 'Администратор',
    branch: 'Все филиалы',
    position: 'Системный администратор',
  },
}
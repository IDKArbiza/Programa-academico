import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { Link, useLocation } from 'react-router-dom';
import {
  GraduationCap, BookOpen, Shield, LogOut, Menu,
  Layers, Home, Users, UserPlus, FolderOpen, ClipboardCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: Record<UserRole, NavItem[]> = {
  director: [
    { label: 'Inicio', path: '/director', icon: <Home className="h-4 w-4" /> },
    { label: 'Planillas Mensuales', path: '/director/planillas', icon: <Layers className="h-4 w-4" /> },
    { label: 'Revisar Planillas', path: '/director/revisar', icon: <ClipboardCheck className="h-4 w-4" /> },
    { label: 'Gestión de Cursos', path: '/director/cursos', icon: <FolderOpen className="h-4 w-4" /> },
    { label: 'Gestión de Cuentas', path: '/director/cuentas', icon: <UserPlus className="h-4 w-4" /> },
  ],
  coordinador: [
    { label: 'Inicio', path: '/coordinador', icon: <Home className="h-4 w-4" /> },
    { label: 'Planillas Mensuales', path: '/coordinador/planillas', icon: <Layers className="h-4 w-4" /> },
    { label: 'Revisar Planillas', path: '/coordinador/revisar', icon: <ClipboardCheck className="h-4 w-4" /> },
    { label: 'Gestión de Cursos', path: '/coordinador/cursos', icon: <FolderOpen className="h-4 w-4" /> },
  ],
  docente: [
    { label: 'Inicio', path: '/docente', icon: <Home className="h-4 w-4" /> },
    { label: 'Planillas Mensuales', path: '/docente/planillas', icon: <Layers className="h-4 w-4" /> },
  ],
  alumno: [
    { label: 'Inicio', path: '/alumno', icon: <Home className="h-4 w-4" /> },
    { label: 'Mis Planillas', path: '/alumno/planillas', icon: <Layers className="h-4 w-4" /> },
  ],
};

const roleLabels: Record<UserRole, string> = {
  director: 'Administrador',
  coordinador: 'Coordinador',
  docente: 'Profesor',
  alumno: 'Alumno',
};

const roleIcons: Record<UserRole, React.ReactNode> = {
  director: <Shield className="h-5 w-5" />,
  coordinador: <Users className="h-5 w-5" />,
  docente: <BookOpen className="h-5 w-5" />,
  alumno: <GraduationCap className="h-5 w-5" />,
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentRole, user, logout } = useAppStore();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentRole) return null;

  const items = navItems[currentRole];

  return (
    <div className="min-h-screen flex bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform duration-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm">Colegio CPCC</h2>
              <p className="text-xs opacity-70">Nivel Medio · Informática</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'hover:bg-sidebar-accent text-sidebar-foreground'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            {roleIcons[currentRole]}
            <div>
              <span className="text-sm font-medium block">{roleLabels[currentRole]}</span>
              {user && <span className="text-xs opacity-70">{user.name}</span>}
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3 no-print">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">
            Panel {roleLabels[currentRole]} — CPCC
          </h1>
        </header>
        <main className="flex-1 p-4 md:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

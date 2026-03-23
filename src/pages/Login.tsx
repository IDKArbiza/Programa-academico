import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { GraduationCap, BookOpen, Shield, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { role: 'director', label: 'Director', icon: <Shield className="h-8 w-8" />, desc: 'Administración académica y gestión general' },
  { role: 'docente', label: 'Docente', icon: <BookOpen className="h-8 w-8" />, desc: 'Gestión de notas, asistencia y evaluaciones' },
  { role: 'alumno', label: 'Alumno', icon: <GraduationCap className="h-8 w-8" />, desc: 'Consulta de notas, horarios y pagos' },
];

const Login = () => {
  const setRole = useAppStore((s) => s.setRole);
  const [selected, setSelected] = useState<UserRole | null>(null);

  const handleLogin = () => {
    if (!selected) return;
    const userId = selected === 'alumno' ? 's1' : selected === 'docente' ? 't1' : 'dir1';
    setRole(selected, userId);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Sistema Académico</h1>
          <p className="text-muted-foreground mt-2">Bachillerato Técnico en Informática</p>
        </div>

        <div className="space-y-3">
          {roles.map((r) => (
            <Card
              key={r.role}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selected === r.role ? 'ring-2 ring-primary shadow-md' : ''
              }`}
              onClick={() => setSelected(r.role)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`p-3 rounded-xl ${selected === r.role ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  {r.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{r.label}</CardTitle>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="w-full mt-6 h-12 text-base gap-2" onClick={handleLogin} disabled={!selected}>
          <LogIn className="h-5 w-5" />
          Ingresar como {selected ? roles.find(r => r.role === selected)?.label : '...'}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Sistema de evaluación del 1 al 5 · Año Académico 2026
        </p>
      </div>
    </div>
  );
};

export default Login;

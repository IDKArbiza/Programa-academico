import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { GraduationCap, BookOpen, Shield, LogIn, Loader2, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { role: 'director', label: 'Administrador', icon: <Shield className="h-8 w-8" />, desc: 'Gestión integral del colegio, matrícula y seguridad' },
  { role: 'coordinador', label: 'Coordinador', icon: <Layers className="h-8 w-8" />, desc: 'Supervisión de materias, tareas y calificaciones' },
  { role: 'docente', label: 'Profesor', icon: <BookOpen className="h-8 w-8" />, desc: 'Carga de planillas mensuales, notas y asistencia' },
  { role: 'alumno', label: 'Alumno', icon: <GraduationCap className="h-8 w-8" />, desc: 'Consulta de notas, boletas y estado de deudas' },
];

const Login = () => {
  const { login, setRole, isLoading } = useAppStore();
  const [selected, setSelected] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);

  const handleLogin = async () => {
    if (!selected || !email || !password) return;

    const success = await login(email, password);
    if (!success) {
      // Fallback: acceso directo por rol para demo
      setRole(selected);
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    setRole(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Colegio Privado CPCC</h1>
          <p className="text-muted-foreground mt-1">Sistema de Gestión de Planillas Académicas</p>
          <p className="text-xs text-muted-foreground mt-1">Nivel Medio · 1° a 3° Año · Bachillerato Técnico en Informática</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {roles.map((r) => (
            <Card
              key={r.role}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selected === r.role ? 'ring-2 ring-primary shadow-md' : ''
              }`}
              onClick={() => setSelected(r.role)}
            >
              <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
                <div className={`p-3 rounded-xl ${selected === r.role ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                  {r.icon}
                </div>
                <CardTitle className="text-sm">{r.label}</CardTitle>
                <p className="text-[10px] text-muted-foreground leading-tight">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {selected && (
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Iniciar Sesión — {roles.find(r => r.role === selected)?.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="correo@cpcc.edu.py" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
              </div>
            </CardContent>
          </Card>
        )}

        <Button className="w-full h-12 text-base gap-2" onClick={handleLogin} disabled={!selected || isLoading}>
          {isLoading ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Iniciando sesión...</>
          ) : (
            <><LogIn className="h-5 w-5" /> Ingresar como {selected ? roles.find(r => r.role === selected)?.label : '...'}</>
          )}
        </Button>

        <div className="mt-4">
          <Button variant="outline" className="w-full text-sm" onClick={() => setShowCredentials(!showCredentials)}>
            {showCredentials ? 'Ocultar' : 'Acceso Rápido (Demo)'}
          </Button>

          {showCredentials && (
            <Card className="mt-3">
              <CardContent className="pt-4 grid grid-cols-2 gap-2">
                {roles.map(r => (
                  <Button key={r.role} variant="ghost" className="h-auto p-2 flex flex-col items-start" onClick={() => handleQuickLogin(r.role)}>
                    <span className="font-medium text-xs">{r.label}</span>
                    <span className="text-[10px] text-muted-foreground">Acceso directo</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Escala 1-5 · 2 Etapas anuales · Planillas mensuales · Paraguay 🇵🇾
        </p>
      </div>
    </div>
  );
};

export default Login;

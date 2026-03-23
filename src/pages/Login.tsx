import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { GraduationCap, BookOpen, Shield, LogIn, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const roles: { role: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  { role: 'director', label: 'Director', icon: <Shield className="h-8 w-8" />, desc: 'Administración académica y gestión del Colegio CPCC' },
  { role: 'docente', label: 'Docente', icon: <BookOpen className="h-8 w-8" />, desc: 'Gestión de notas, asistencia y evaluaciones por etapas' },
  { role: 'alumno', label: 'Alumno', icon: <GraduationCap className="h-8 w-8" />, desc: 'Consulta de notas, boletas y pagos (1°-3° año)' },
];

const Login = () => {
  const { login, isLoading } = useAppStore();
  const [selected, setSelected] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);

  const handleLogin = async () => {
    if (!selected || !email || !password) return;
    
    const success = await login(email, password);
    if (!success) {
      alert('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    }
  };

  const handleQuickLogin = (role: UserRole, userEmail: string, userPassword: string) => {
    setSelected(role);
    setEmail(userEmail);
    setPassword(userPassword);
    setShowCredentials(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Sistema Académico</h1>
          <p className="text-muted-foreground mt-2">Colegio Privado CPCC - Sistema Educativo</p>
        </div>

        <div className="space-y-3 mb-6">
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

        {selected && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Iniciar Sesión - {roles.find(r => r.role === selected)?.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Button 
          className="w-full h-12 text-base gap-2" 
          onClick={handleLogin} 
          disabled={!selected || !email || !password || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Iniciando sesión...
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              Ingresar como {selected ? roles.find(r => r.role === selected)?.label : '...'}
            </>
          )}
        </Button>

        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full text-sm"
            onClick={() => setShowCredentials(!showCredentials)}
          >
            {showCredentials ? 'Ocultar' : 'Mostrar'} Credenciales de Prueba
          </Button>
          
          {showCredentials && (
            <Card className="mt-3">
              <CardContent className="pt-4">
                <p className="text-sm font-medium mb-2">Credenciales de Prueba:</p>
                <div className="space-y-2 text-xs">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto p-2"
                    onClick={() => handleQuickLogin('director', 'director@colegio.edu', 'director123')}
                  >
                    <div>
                      <div className="font-medium">Director</div>
                      <div className="text-muted-foreground">director@colegio.edu / director123</div>
                    </div>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto p-2"
                    onClick={() => handleQuickLogin('docente', 'docente@colegio.edu', 'docente123')}
                  >
                    <div>
                      <div className="font-medium">Docente</div>
                      <div className="text-muted-foreground">docente@colegio.edu / docente123</div>
                    </div>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto p-2"
                    onClick={() => handleQuickLogin('alumno', 'alumno@colegio.edu', 'alumno123')}
                  >
                    <div>
                      <div className="font-medium">Alumno</div>
                      <div className="text-muted-foreground">alumno@colegio.edu / alumno123</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Sistema de evaluación 1-5 · 2 etapas anuales · Niveles 1°-3° año · Año lectivo 2026
        </p>
      </div>
    </div>
  );
};

export default Login;

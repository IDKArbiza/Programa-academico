import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { LogIn, Loader2, IdCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userService } from '@/lib/firebase-services';


const Login = () => {
  const { login, setRole, isLoading } = useAppStore();
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!cedula || !password) {
      alert('Por favor, ingrese su correo electrónico y contraseña');
      return;
    }

    // Validar formato de correo
    if (!cedula.includes('@') || !cedula.endsWith('@cpcc.com')) {
      alert('Por favor, ingrese un correo válido con formato: cedula@cpcc.com');
      return;
    }

    // Extraer cédula del correo para verificar contraseña
    const cedulaNumber = cedula.replace('@cpcc.com', '');
    const expectedPassword = `${cedulaNumber}cpcc`;
    
    if (password !== expectedPassword) {
      alert('Contraseña incorrecta. Por favor, verifique sus datos.');
      return;
    }

    try {
      // Buscar usuario por email y obtener su rol
      const users = await userService.getByEmail(cedula);
      
      if (users.length === 0) {
        alert('Usuario no encontrado. Por favor, verifique sus credenciales.');
        return;
      }

      const user = users[0];
      // Autenticación exitosa, asignar rol del usuario
      setRole(user.role, user.id);
    } catch (error) {
      console.error('Error en login:', error);
      alert('Error al iniciar sesión. Por favor, intente nuevamente.');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4">
            <IdCard className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Colegio Privado CPCC</h1>
          <p className="text-muted-foreground mt-1">Sistema de Gestión de Planillas Académicas</p>
          <p className="text-xs text-muted-foreground mt-1">Acceso por Correo Electrónico Institucional</p>
        </div>

        <Card className="mb-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="1234567@cpcc.com" 
                value={cedula} 
                onChange={(e) => setCedula(e.target.value)} 
                className="mt-1"
                autoComplete="off"
              />
              <p className="text-xs text-muted-foreground mt-1">Formato: número_cédula@cpcc.com</p>
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="cedulacpcc" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">Formato: cedulacpcc</p>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full h-12 text-base gap-2" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <><Loader2 className="h-5 w-5 animate-spin" /> Iniciando sesión...</>
          ) : (
            <><LogIn className="h-5 w-5" /> Iniciar Sesión</>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Sistema de Autenticación por Correo Institucional · CPCC · Paraguay 🇵🇾
        </p>
      </div>
    </div>
  );
};

export default Login;

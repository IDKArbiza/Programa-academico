import React, { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { userService } from '@/lib/firebase-services';
import Login from './Login';
import SetupDatabase from './SetupDatabase';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const currentRole = useAppStore((s) => s.currentRole);
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        // Verificar si hay usuarios en la base de datos
        const users = await userService.getAll();
        setHasData(users.length > 0);
      } catch (error) {
        console.error('Error checking database:', error);
        setHasData(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkDatabase();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verificando base de datos...</p>
        </div>
      </div>
    );
  }

  // Si no hay datos, mostrar la página de setup
  if (!hasData) {
    return <SetupDatabase />;
  }

  // Si hay datos y hay rol, redirigir al dashboard
  if (currentRole) {
    return <Navigate to={`/${currentRole}`} replace />;
  }

  // Si hay datos pero no hay rol, mostrar login
  return <Login />;
};

export default Index;

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { userService } from '@/lib/firebase-services';

interface CheckDatabaseProps {
  children: React.ReactNode;
}

const CheckDatabase: React.FC<CheckDatabaseProps> = ({ children }) => {
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

  return <>{children}</>;
};

export default CheckDatabase;

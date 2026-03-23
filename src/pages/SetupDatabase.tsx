import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { seedInitialData } from '@/lib/seed-data';

const SetupDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handlePopulateDatabase = async () => {
    setIsLoading(true);
    setMessage('');
    setIsSuccess(false);
    setIsError(false);

    try {
      const success = await seedInitialData();
      
      if (success) {
        setIsSuccess(true);
        setMessage('✅ Base de datos poblada exitosamente');
        console.log('📊 Datos creados:');
        console.log('   - 3 usuarios (director, docente, alumno)');
        console.log('   - 3 estudiantes (1°, 2°, 3° año)');
        console.log('   - 2 docentes con categorías magisteriales');
        console.log('   - 3 asignaturas con códigos MEC');
        console.log('   - 1 año lectivo con 2 etapas');
        console.log('🎓 Sistema CPCC listo para usar!');
      } else {
        setIsError(true);
        setMessage('❌ Error al poblar la base de datos');
      }
    } catch (error) {
      setIsError(true);
      setMessage(`💥 Error crítico: ${error}`);
      console.error('Error al poblar base de datos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4">
              <Database className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Configuración Base de Datos
            </CardTitle>
            <p className="text-muted-foreground">
              Colegio Privado CPCC - Sistema Educativo
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                La base de datos está vacía. Puebla los datos iniciales del sistema:
              </p>
              <div className="text-xs text-left space-y-1 bg-muted p-3 rounded">
                <p>• 3 usuarios (director, docente, alumno)</p>
                <p>• 3 estudiantes (1°, 2°, 3° año)</p>
                <p>• 2 docentes con categorías magisteriales</p>
                <p>• 3 asignaturas con códigos MEC</p>
                <p>• 1 año lectivo con 2 etapas</p>
              </div>
            </div>

            <Button 
              onClick={handlePopulateDatabase}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Poblando base de datos...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Poblar Base de Datos
                </>
              )}
            </Button>

            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                isSuccess ? 'bg-green-50 text-green-700 border border-green-200' :
                isError ? 'bg-red-50 text-red-700 border border-red-200' :
                'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                <div className="flex items-center gap-2">
                  {isSuccess && <CheckCircle className="h-4 w-4" />}
                  {isError && <AlertCircle className="h-4 w-4" />}
                  {message}
                </div>
              </div>
            )}

            {isSuccess && (
              <div className="text-center">
                <p className="text-sm text-green-600 font-medium">
                  🎓 Sistema CPCC listo para usar!
                </p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => window.location.href = '/'}
                >
                  Ir al Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SetupDatabase;

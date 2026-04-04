import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, FolderOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CoordinadorDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Panel del Coordinador</h2>
          <p className="text-sm text-muted-foreground">Colegio Politécnico CPCC — Nivel Medio</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Planillas Mensuales</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Crear, editar, eliminar y enviar planillas de puntaje mensual.
            </p>
            <Link to="/coordinador/planillas">
              <Button className="w-full">Ir a Planillas</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Gestión de Cursos</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Crear cursos y asignar cuentas (alumnos, profesores) a los cursos.
            </p>
            <Link to="/coordinador/cursos">
              <Button className="w-full">Gestionar Cursos</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoordinadorDashboard;

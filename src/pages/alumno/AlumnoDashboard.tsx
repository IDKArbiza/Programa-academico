import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const AlumnoDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <GraduationCap className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Panel del Alumno</h2>
          <p className="text-sm text-muted-foreground">Colegio Politécnico CPCC — Nivel Medio</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Layers className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Mis Planillas Mensuales</h3>
            <p className="text-sm text-muted-foreground">
              Consultá tus puntajes mensuales por materia. Solo vos podés ver tus datos.
            </p>
          </div>
          <Link to="/alumno/planillas">
            <Button>Ver Planillas</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlumnoDashboard;

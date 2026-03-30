import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

const CoordinadorInformes = () => {
  const reports = [
    { title: 'Reporte de Notas por Etapa', desc: 'Notas consolidadas de todos los alumnos por etapa' },
    { title: 'Horario de Clases', desc: 'Horario semanal por grado y sección' },
    { title: 'Planillas Mensuales', desc: 'Estado de planillas cargadas por docente' },
    { title: 'Reporte de Asistencia', desc: 'Resumen de asistencia por materia y alumno' },
    { title: 'Rendimiento Académico', desc: 'Promedios y estadísticas por grado' },
    { title: 'Lista de Alumnos', desc: 'Nómina de alumnos activos por grado' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Generar Informes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map(r => (
          <Card key={r.title}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{r.title}</p>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-1" />Generar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoordinadorInformes;

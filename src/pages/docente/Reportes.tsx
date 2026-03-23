import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, FileText, Calendar, BarChart3 } from 'lucide-react';

const reportes = [
  { title: 'Reporte de Notas por Etapa', desc: 'Notas de todos los alumnos por período', icon: <BarChart3 className="h-6 w-6" /> },
  { title: 'Libretas de Notas', desc: 'Libreta individual por alumno', icon: <FileText className="h-6 w-6" /> },
  { title: 'Horario de Clases', desc: 'Horario semanal de clases', icon: <Calendar className="h-6 w-6" /> },
  { title: 'Reporte de Asistencia', desc: 'Resumen de asistencia por materia', icon: <BarChart3 className="h-6 w-6" /> },
];

const Reportes = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Reportes</h2>
    <p className="text-muted-foreground">Genera e imprime reportes en PDF</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {reportes.map((r, i) => (
        <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">{r.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{r.desc}</p>
              <Button size="sm" variant="outline" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-1" />Imprimir
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Reportes;

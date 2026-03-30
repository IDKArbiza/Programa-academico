import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ClipboardList, ListTodo, Layers, FileText } from 'lucide-react';
import { mockSubjects, mockTeachers, mockStudents, mockMonthlySheets } from '@/lib/mock-data';

const CoordinadorDashboard = () => {
  const pendingSheets = mockMonthlySheets.filter(s => s.status === 'borrador').length;
  const approvedSheets = mockMonthlySheets.filter(s => s.status === 'aprobado').length;

  const stats = [
    { label: 'Materias', value: mockSubjects.length, icon: <BookOpen className="h-5 w-5" />, color: 'bg-primary' },
    { label: 'Docentes', value: mockTeachers.length, icon: <ClipboardList className="h-5 w-5" />, color: 'bg-accent' },
    { label: 'Planillas Pendientes', value: pendingSheets, icon: <Layers className="h-5 w-5" />, color: 'bg-warning' },
    { label: 'Planillas Aprobadas', value: approvedSheets, icon: <FileText className="h-5 w-5" />, color: 'bg-success' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Panel del Coordinador</h2>
        <p className="text-muted-foreground">Colegio CPCC · Nivel Medio · Año 2026</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${s.color} text-primary-foreground`}>{s.icon}</div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Materias por Grado</h3>
            {['1° Año', '2° Año', '3° Año'].map(grade => {
              const subs = mockSubjects.filter(s => s.grade === grade);
              return (
                <div key={grade} className="mb-3">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{grade}</p>
                  {subs.map(s => {
                    const teacher = mockTeachers.find(t => t.id === s.teacherId);
                    return (
                      <div key={s.id} className="flex justify-between p-2 rounded bg-secondary/30 mb-1">
                        <span className="text-sm font-medium">{s.name}</span>
                        <span className="text-xs text-muted-foreground">{teacher?.firstName} {teacher?.lastName}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Alumnos por Grado</h3>
            {['1° Año', '2° Año', '3° Año'].map(grade => {
              const students = mockStudents.filter(s => s.grade === grade && s.status === 'activo');
              return (
                <div key={grade} className="flex justify-between p-3 rounded bg-secondary/30 mb-2">
                  <span className="font-medium">{grade}</span>
                  <span className="text-lg font-bold">{students.length}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoordinadorDashboard;

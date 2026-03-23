import { Card, CardContent } from '@/components/ui/card';
import { Users, ClipboardList, CheckSquare, FileText } from 'lucide-react';
import { mockStudents, mockSubjects } from '@/lib/mock-data';

const DocenteDashboard = () => {
  const mySubjects = mockSubjects.filter(s => s.teacherId === 't1');
  const myStudents = mockStudents.filter(s => mySubjects.some(sub => sub.grade === s.grade));

  const stats = [
    { label: 'Mis Materias', value: mySubjects.length, icon: <ClipboardList className="h-5 w-5" />, color: 'bg-primary' },
    { label: 'Alumnos', value: myStudents.length, icon: <Users className="h-5 w-5" />, color: 'bg-accent' },
    { label: 'Asistencias Hoy', value: '85%', icon: <CheckSquare className="h-5 w-5" />, color: 'bg-success' },
    { label: 'Libretas Pendientes', value: 2, icon: <FileText className="h-5 w-5" />, color: 'bg-warning' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Panel del Docente</h2>
        <p className="text-muted-foreground">Prof. Roberto Vargas Medina · Informática</p>
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

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Mis Materias Asignadas</h3>
          <div className="space-y-2">
            {mySubjects.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-muted-foreground">{s.grade} · {s.hoursPerWeek} hrs/semana</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocenteDashboard;

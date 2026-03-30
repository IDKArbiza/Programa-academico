import { Card, CardContent } from '@/components/ui/card';
import { mockStudents, mockGrades, mockSubjects, mockPayments } from '@/lib/mock-data';
import { BarChart3, BookOpen, CreditCard, Calendar } from 'lucide-react';

const AlumnoDashboard = () => {
  const student = mockStudents.find(s => s.id === 's1')!;
  const subjects = mockSubjects.filter(s => s.grade === student.grade);
  const myGrades = mockGrades.filter(g => g.studentId === 's1' && g.etapa === 1);
  const avgGrade = myGrades.length ? (myGrades.reduce((a, b) => a + b.finalGrade, 0) / myGrades.length).toFixed(1) : '-';
  const pendingPayments = mockPayments.filter(p => p.studentId === 's1' && p.status !== 'pagado');

  const stats = [
    { label: 'Promedio General', value: avgGrade, icon: <BarChart3 className="h-5 w-5" />, color: 'bg-primary' },
    { label: 'Materias', value: subjects.length, icon: <BookOpen className="h-5 w-5" />, color: 'bg-accent' },
    { label: 'Deudas Pendientes', value: pendingPayments.length, icon: <CreditCard className="h-5 w-5" />, color: pendingPayments.length > 0 ? 'bg-warning' : 'bg-success' },
    { label: 'Etapa Actual', value: '1°', icon: <Calendar className="h-5 w-5" />, color: 'bg-secondary text-secondary-foreground' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Bienvenido, {student.firstName}</h2>
        <p className="text-muted-foreground">{student.grade} "{student.section}" · Colegio CPCC · Nivel Medio</p>
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
          <h3 className="font-semibold mb-3">Mis Notas — Etapa 1</h3>
          <div className="space-y-2">
            {myGrades.map(g => {
              const sub = mockSubjects.find(s => s.id === g.subjectId);
              return (
                <div key={g.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <span className="font-medium">{sub?.name}</span>
                  <span className={`text-lg font-bold ${g.finalGrade >= 4 ? 'text-success' : g.finalGrade === 3 ? 'text-warning' : 'text-destructive'}`}>
                    {g.finalGrade}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlumnoDashboard;

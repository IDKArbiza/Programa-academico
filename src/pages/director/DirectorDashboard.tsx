import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, CreditCard, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { mockStudents, mockTeachers, mockPayments, mockSubjects } from '@/lib/mock-data';

const DirectorDashboard = () => {
  const activeStudents = mockStudents.filter(s => s.status === 'activo').length;
  const pendingPayments = mockPayments.filter(p => p.status !== 'pagado').length;
  const totalIncome = mockPayments.filter(p => p.status === 'pagado').reduce((a, b) => a + b.amount, 0);

  const stats = [
    { label: 'Alumnos Activos', value: activeStudents, icon: <Users className="h-5 w-5" />, color: 'bg-primary' },
    { label: 'Docentes', value: mockTeachers.length, icon: <BookOpen className="h-5 w-5" />, color: 'bg-accent' },
    { label: 'Materias', value: mockSubjects.length, icon: <Calendar className="h-5 w-5" />, color: 'bg-warning' },
    { label: 'Ingresos', value: `S/ ${totalIncome}`, icon: <TrendingUp className="h-5 w-5" />, color: 'bg-success' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Panel del Director</h2>
        <p className="text-muted-foreground">Año Académico 2026 · Bachillerato Técnico en Informática</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-xl ${s.color} text-primary-foreground`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pendingPayments > 0 && (
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">{pendingPayments} pagos pendientes</span> requieren atención.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Alumnos Recientes</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {mockStudents.slice(0, 4).map(s => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{s.firstName} {s.lastName}</p>
                    <p className="text-xs text-muted-foreground">{s.grade} "{s.section}"</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${s.status === 'activo' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Docentes</CardTitle></CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              {mockTeachers.map(t => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{t.firstName} {t.lastName}</p>
                    <p className="text-xs text-muted-foreground">{t.specialty}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{t.subjects.length} materias</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DirectorDashboard;

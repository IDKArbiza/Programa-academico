import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { useAccountsStore } from '@/lib/accounts-store';
import { useCoursesStore } from '@/lib/courses-store';
import { usePlanillasStore } from '@/lib/planillas-store';

const CoordinadorDashboard = () => {
  const { accounts, fetchAccounts } = useAccountsStore();
  const { courses, fetchCourses } = useCoursesStore();
  const { planillas, fetchPlanillas } = usePlanillasStore();

  useEffect(() => {
    fetchAccounts(true);
    fetchCourses(true);
    fetchPlanillas(true);
  }, [fetchAccounts, fetchCourses, fetchPlanillas]);

  const totalAlumnos = accounts.filter(a => a.role === 'alumno' && a.status === 'activo').length;
  const totalCursos = courses.length;
  const planillasPendientes = planillas.filter(p => p.status === 'enviado').length;
  const solicitudesEdicion = planillas.filter(p => p.editRequestStatus === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Alumnos Activos</h3>
            <p className="text-3xl font-bold text-primary">{totalAlumnos}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Cursos Creados</h3>
            <p className="text-3xl font-bold text-primary">{totalCursos}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-amber-700 mb-1">Pedidos de Edición</h3>
            <p className="text-3xl font-bold text-amber-600">{solicitudesEdicion}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoordinadorDashboard;

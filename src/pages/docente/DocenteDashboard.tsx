import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { useCoursesStore } from '@/lib/courses-store';
import { usePlanillasStore } from '@/lib/planillas-store';

const DocenteDashboard = () => {
  const { user } = useAppStore();
  const { courses, fetchCourses } = useCoursesStore();
  const { planillas, fetchPlanillas } = usePlanillasStore();

  useEffect(() => {
    fetchCourses(true);
    fetchPlanillas(true);
  }, []);

  const totalCursosAsignados = courses.reduce((count, course) => {
    return count + course.subjects.filter(sub => sub.teacherId === user?.id).length;
  }, 0);

  const planillasCreadas = planillas.filter(p => p.teacherId === user?.id).length;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Materias Asignadas</h3>
            <p className="text-3xl font-bold text-primary">{totalCursosAsignados}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Planillas Creadas</h3>
            <p className="text-3xl font-bold text-primary">{planillasCreadas}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocenteDashboard;

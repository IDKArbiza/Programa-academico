import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ALL_MONTHS } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Layers, Eye, Lock } from 'lucide-react';
import { usePlanillasStore } from '@/lib/planillas-store';
import { useAppStore } from '@/lib/store';
import { useCoursesStore } from '@/lib/courses-store';

const MisPlanillas = () => {
  const { user } = useAppStore();
  const { planillas, fetchPlanillas, loading } = usePlanillasStore();
  const { courses, fetchCourses } = useCoursesStore();

  useEffect(() => {
    fetchPlanillas();
    fetchCourses();
  }, []);

  const STUDENT_ID = user?.id || '';
  const studentName = user?.name || '';
  const studentGrade = user?.grade || '';

  // Find the course this student belongs to
  const studentCourse = courses.find(c => c.students.includes(STUDENT_ID));
  const grade = studentCourse?.grade || studentGrade;

  const [selectedMonth, setSelectedMonth] = useState('3');
  const month = parseInt(selectedMonth);
  const monthName = ALL_MONTHS.find(m => m.month === month)?.name || '';

  // Only show APPROVED planillas for this student's grade
  const approvedPlanillas = planillas.filter(
    p => p.status === 'aprobado' && p.grade === grade && p.month === month && p.year === 2026
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Layers className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Mis Planillas Mensuales</h2>
          <p className="text-sm text-muted-foreground">
            <Lock className="h-3 w-3 inline mr-1" />
            Solo podés ver tus puntajes — aprobados por el Coordinador
          </p>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap items-end">
        <div className="space-y-1">
          <Label>Mes</Label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ALL_MONTHS.map(m => (
                <SelectItem key={m.month} value={String(m.month)}>{m.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground pb-2">
          <Eye className="h-4 w-4 inline mr-1" />
          Solo se muestran planillas aprobadas
        </div>
      </div>

      <div className="text-center bg-primary/10 border border-primary/20 rounded-lg p-3 mb-2">
        <h3 className="font-bold text-lg">Puntajes de {monthName} 2026</h3>
        <p className="text-sm text-muted-foreground">
          {studentName} — {grade} Bachillerato Técnico en Informática
        </p>
      </div>

      {loading && <p className="text-center text-muted-foreground py-8">Cargando planillas...</p>}

      {!loading && approvedPlanillas.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No hay planillas aprobadas para este mes.
        </p>
      )}

      {!loading && approvedPlanillas.map(planilla => {
        const myScores = planilla.scores.find(s => s.studentId === STUDENT_ID);
        const totalMax = planilla.tasks.reduce((s, t) => s + t.maxPoints, 0);
        const myTotal = myScores
          ? planilla.tasks.reduce((s, t) => s + (myScores.scores[t.id] || 0), 0)
          : 0;

        if (!myScores) return null;

        return (
          <Card key={planilla.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold">{planilla.subjectName}</h4>
                  <p className="text-xs text-muted-foreground">
                    Prof. {planilla.teacherName} · TP máx: {totalMax} pts
                  </p>
                </div>
                <Badge className="bg-green-500/20 text-green-700 border-green-300">Publicado</Badge>
              </div>

              {/* Show individual task scores */}
              <div className="flex flex-wrap gap-2 mb-3">
                {planilla.tasks.map(task => (
                  <div key={task.id} className="text-center border rounded-lg p-2 min-w-[60px]">
                    <div className="text-[10px] text-muted-foreground truncate max-w-[80px]">{task.name}</div>
                    <div className="font-bold text-sm">{myScores.scores[task.id] || 0}</div>
                    <div className="text-[9px] text-muted-foreground">/{task.maxPoints}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className={`text-3xl font-bold ${
                  myTotal / totalMax >= 0.8 ? 'text-green-600' :
                  myTotal / totalMax >= 0.5 ? 'text-amber-600' :
                  'text-red-600'
                }`}>
                  {myTotal}
                </div>
                <div className="text-sm text-muted-foreground">/ {totalMax} puntos</div>
                <div className="flex-1">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        myTotal / totalMax >= 0.8 ? 'bg-green-500' :
                        myTotal / totalMax >= 0.5 ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((myTotal / totalMax) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {totalMax > 0 ? ((myTotal / totalMax) * 100).toFixed(0) : 0}% del puntaje total
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MisPlanillas;

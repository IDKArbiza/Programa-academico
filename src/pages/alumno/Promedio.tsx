import { useEffect, useMemo } from 'react';
import { usePlanillasStore } from '@/lib/planillas-store';
import { useAppStore } from '@/lib/store';
import { useCoursesStore } from '@/lib/courses-store';
import { Card, CardContent } from '@/components/ui/card';
import { ALL_MONTHS } from '@/lib/constants';
import { BookOpen } from 'lucide-react';

const Promedio = () => {
  const { user } = useAppStore();
  const { planillas, fetchPlanillas, loading } = usePlanillasStore();
  const { courses, fetchCourses } = useCoursesStore();

  useEffect(() => {
    fetchPlanillas(true);
    fetchCourses(true);
  }, []);

  const STUDENT_ID = user?.id || '';
  
  const studentCourse = courses.find(c => c.students.includes(STUDENT_ID));
  const grade = studentCourse?.grade || user?.grade || '';

  // Get all approved planillas for this student
  const approvedPlanillas = planillas.filter(
    p => p.status === 'aprobado' && 
         p.scores.some(s => s.studentId === STUDENT_ID) &&
         (studentCourse ? p.courseId === studentCourse.id || p.grade === grade : p.grade === grade)
  );

  const subjectStats = useMemo(() => {
    const stats: Record<string, {
      subjectName: string;
      teacherName: string;
      months: Record<number, { studentTotal: number, maxTotal: number }>;
      totalStudentPoints: number;
      totalMaxPoints: number;
    }> = {};

    approvedPlanillas.forEach(planilla => {
      const { subjectId, subjectName, teacherName, month, tasks, scores } = planilla;
      
      const myScoreObj = scores.find(s => s.studentId === STUDENT_ID);
      if (!myScoreObj) return;

      const maxTotal = tasks.reduce((s, t) => s + t.maxPoints, 0);
      const studentTotal = tasks.reduce((s, t) => s + (myScoreObj.scores[t.id] || 0), 0);

      if (!stats[subjectId]) {
        stats[subjectId] = {
          subjectName,
          teacherName,
          months: {},
          totalStudentPoints: 0,
          totalMaxPoints: 0
        };
      }

      stats[subjectId].months[month] = { studentTotal, maxTotal };
      stats[subjectId].totalStudentPoints += studentTotal;
      stats[subjectId].totalMaxPoints += maxTotal;
    });

    return Object.values(stats).sort((a, b) => a.subjectName.localeCompare(b.subjectName));
  }, [approvedPlanillas, STUDENT_ID]);

  // Months to display in columns
  const activeMonths = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // Assuming Feb to Nov
  
  const calculateGrade = (pct: number) => {
    if (pct < 70) return 1;
    if (pct < 79) return 2;
    if (pct < 88) return 3;
    if (pct < 95) return 4;
    return 5;
  };

  const getStatusText = (grade: number) => {
    if (grade === 1) return 'Aplazado';
    return 'Pasa de curso';
  };

  const overallTotalStudent = subjectStats.reduce((s, subj) => s + subj.totalStudentPoints, 0);
  const overallTotalMax = subjectStats.reduce((s, subj) => s + subj.totalMaxPoints, 0);
  
  const subjectGrades = subjectStats.map(subj => {
    const pct = subj.totalMaxPoints > 0 ? (subj.totalStudentPoints / subj.totalMaxPoints) * 100 : 0;
    return calculateGrade(pct);
  });
  
  const averageGrade = subjectGrades.length > 0 
    ? subjectGrades.reduce((s, g) => s + g, 0) / subjectGrades.length 
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Promedio Final</h2>
          <p className="text-sm text-muted-foreground">Resumen anual de tus calificaciones</p>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <h3 className="font-bold text-lg">{user?.name}</h3>
        <p className="text-sm text-muted-foreground">
          {grade ? `${grade} Bachillerato Técnico en Informática` : 'Sin curso asignado'}
        </p>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-8">Cargando datos...</p>
      ) : subjectStats.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No hay planillas aprobadas para calcular el promedio.</p>
      ) : (
        <Card className="overflow-hidden">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 border-r border-border font-semibold min-w-[200px]">Nombre de Materia</th>
                  {activeMonths.map(month => (
                    <th key={month} className="text-center py-3 px-2 border-r border-border font-medium">
                      {ALL_MONTHS.find(m => m.month === month)?.name.substring(0, 3)}
                    </th>
                  ))}
                  <th className="text-center py-3 px-4 border-r border-border font-bold bg-primary/5">Suma Anual</th>
                  <th className="text-center py-3 px-4 font-bold bg-primary/10">Calificación Final</th>
                </tr>
              </thead>
              <tbody>
                {subjectStats.map((subj, idx) => {
                  const pct = subj.totalMaxPoints > 0 ? (subj.totalStudentPoints / subj.totalMaxPoints) * 100 : 0;
                  const grade = calculateGrade(pct);
                  
                  return (
                    <tr key={idx} className="border-b border-border hover:bg-muted/20">
                      <td className="py-3 px-4 border-r border-border">
                        <div className="font-medium">{subj.subjectName}</div>
                        <div className="text-xs text-muted-foreground">Prof. {subj.teacherName}</div>
                      </td>
                      {activeMonths.map(month => {
                        const monthData = subj.months[month];
                        return (
                          <td key={month} className="text-center py-3 px-2 border-r border-border">
                            {monthData ? (
                              <div>
                                <span className="font-semibold">{monthData.studentTotal}</span>
                                <span className="text-[10px] text-muted-foreground">/{monthData.maxTotal}</span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground/30">-</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="text-center py-3 px-4 border-r border-border bg-primary/5">
                        <div className="font-bold text-base">{subj.totalStudentPoints}</div>
                        <div className="text-xs text-muted-foreground">/ {subj.totalMaxPoints} pts</div>
                      </td>
                      <td className={`text-center py-3 px-4 font-bold text-lg bg-primary/10 ${grade === 1 ? 'text-red-600' : 'text-green-600'}`}>
                        {grade}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-muted">
                <tr>
                  <td colSpan={activeMonths.length + 1} className="py-4 px-4 text-right font-bold border-r border-border">
                    PROMEDIO GENERAL DEL ALUMNO
                  </td>
                  <td className="text-center py-4 px-4 border-r border-border">
                    <div className="font-bold text-base">{overallTotalStudent}</div>
                    <div className="text-xs text-muted-foreground">/ {overallTotalMax} pts</div>
                  </td>
                  <td className="text-center py-4 px-4 flex flex-col items-center gap-1">
                    <div className={`font-bold text-2xl ${Math.round(averageGrade) === 1 ? 'text-red-600' : 'text-green-600'}`}>
                      {averageGrade.toFixed(2)}
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${Math.round(averageGrade) === 1 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {getStatusText(Math.round(averageGrade))}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Promedio;

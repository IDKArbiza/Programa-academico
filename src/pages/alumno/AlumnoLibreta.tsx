import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockStudents, mockGrades, mockSubjects, gradeColor } from '@/lib/mock-data';
import { Printer } from 'lucide-react';

const AlumnoLibreta = () => {
  const student = mockStudents.find(s => s.id === 's1')!;
  const subjects = mockSubjects.filter(s => s.grade === student.grade);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Libreta de Notas</h2>
        <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4 mr-2" />Imprimir</Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="text-center mb-6 pb-4 border-b-2 border-foreground/10">
            <h3 className="text-xl font-bold">LIBRETA DE NOTAS</h3>
            <p className="text-sm text-muted-foreground">Bachillerato Técnico en Informática · Año 2026</p>
            <p className="font-semibold mt-2">{student.firstName} {student.lastName}</p>
            <p className="text-sm text-muted-foreground">{student.grade} "{student.section}" · DNI: {student.dni}</p>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-foreground/20">
                <th className="text-left py-2 px-2">Materia</th>
                {[1,2,3,4].map(p => <th key={p} className="text-center py-2 px-2">Bim {p}</th>)}
                <th className="text-center py-2 px-2">Promedio</th>
                <th className="text-center py-2 px-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(sub => {
                const grades = [1,2,3,4].map(p => mockGrades.find(g => g.studentId === 's1' && g.subjectId === sub.id && g.period === p)?.finalGrade || 0);
                const valid = grades.filter(g => g > 0);
                const avg = valid.length ? valid.reduce((a,b) => a+b,0) / valid.length : 0;
                return (
                  <tr key={sub.id} className="border-b border-border">
                    <td className="py-2 px-2 font-medium">{sub.name}</td>
                    {grades.map((g, i) => (
                      <td key={i} className={`text-center py-2 px-2 font-semibold ${g > 0 ? gradeColor(g) : 'text-muted-foreground'}`}>
                        {g > 0 ? g : '-'}
                      </td>
                    ))}
                    <td className={`text-center py-2 px-2 font-bold ${avg > 0 ? gradeColor(Math.round(avg)) : ''}`}>
                      {avg > 0 ? avg.toFixed(1) : '-'}
                    </td>
                    <td className="text-center py-2 px-2 text-xs font-semibold">
                      {avg >= 3 ? <span className="text-success">Aprobado</span> : avg > 0 ? <span className="text-destructive">Desaprobado</span> : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlumnoLibreta;

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mockStudents, mockGrades, mockSubjects, gradeLabel, gradeColor } from '@/lib/mock-data';
import { Printer } from 'lucide-react';
import { Label } from '@/components/ui/label';

const Libretas = () => {
  const [selectedStudent, setSelectedStudent] = useState('s1');
  const student = mockStudents.find(s => s.id === selectedStudent);
  const subjects = mockSubjects.filter(s => s.grade === student?.grade);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">Libretas de Notas</h2>
        <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4 mr-2" />Imprimir Libreta</Button>
      </div>

      <div className="space-y-1">
        <Label>Seleccionar Alumno</Label>
        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger className="w-72"><SelectValue /></SelectTrigger>
          <SelectContent>
            {mockStudents.map(s => <SelectItem key={s.id} value={s.id}>{s.firstName} {s.lastName} - {s.grade}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {student && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-6 border-b border-border pb-4">
              <h3 className="text-xl font-bold">LIBRETA DE NOTAS</h3>
              <p className="text-sm text-muted-foreground">Bachillerato Técnico en Informática · Año 2026</p>
              <p className="font-semibold mt-2">{student.firstName} {student.lastName}</p>
              <p className="text-sm text-muted-foreground">{student.grade} "{student.section}" · CI: {student.ci}</p>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-foreground/20">
                  <th className="text-left py-2 px-2">Materia</th>
                  {[1,2].map(p => <th key={p} className="text-center py-2 px-2">Etapa {p}</th>)}
                  <th className="text-center py-2 px-2">Promedio</th>
                  <th className="text-center py-2 px-2">Estado</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map(sub => {
                  const grades = [1,2].map(p => {
                    const g = mockGrades.find(gr => gr.studentId === selectedStudent && gr.subjectId === sub.id && gr.etapa === p);
                    return g?.finalGrade || 0;
                  });
                  const valid = grades.filter(g => g > 0);
                  const avg = valid.length ? valid.reduce((a,b) => a+b, 0) / valid.length : 0;

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
                      <td className="text-center py-2 px-2">
                        {avg >= 3 ? (
                          <span className="text-success text-xs font-semibold">Aprobado</span>
                        ) : avg > 0 ? (
                          <span className="text-destructive text-xs font-semibold">Desaprobado</span>
                        ) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Libretas;

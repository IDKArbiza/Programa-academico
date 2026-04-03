import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStudents, mockGrades, mockSubjects, gradeColor } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useState } from 'react';

const DocenteLibretas = () => {
  const [selectedStudent, setSelectedStudent] = useState('s1');
  const mySubjects = mockSubjects.filter(s => s.teacherId === 't1');
  const student = mockStudents.find(s => s.id === selectedStudent);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Gestión de Libretas</h2>
        <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4 mr-2" />Imprimir</Button>
      </div>

      <div className="space-y-1">
        <Label>Alumno</Label>
        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger className="w-72"><SelectValue /></SelectTrigger>
          <SelectContent>
            {mockStudents.filter(s => s.grade === '1° Año').map(s => (
              <SelectItem key={s.id} value={s.id}>{s.firstName} {s.lastName}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {student && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-4 pb-4 border-b border-border">
              <h3 className="font-bold text-lg">LIBRETA DE NOTAS</h3>
              <p className="text-sm text-muted-foreground">{student.firstName} {student.lastName} · {student.grade}</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-foreground/20">
                  <th className="text-left py-2">Materia</th>
                  {[1,2].map(p => <th key={p} className="text-center py-2">Etapa {p}</th>)}
                  <th className="text-center py-2">Final</th>
                </tr>
              </thead>
              <tbody>
                {mySubjects.map(sub => {
                  const grades = [1,2].map(p => mockGrades.find(g => g.studentId === selectedStudent && g.subjectId === sub.id && g.etapa === p)?.finalGrade || 0);
                  const valid = grades.filter(g => g > 0);
                  const avg = valid.length ? valid.reduce((a,b) => a+b, 0) / valid.length : 0;
                  return (
                    <tr key={sub.id} className="border-b border-border">
                      <td className="py-2 font-medium">{sub.name}</td>
                      {grades.map((g, i) => (
                        <td key={i} className={`text-center py-2 font-semibold ${g > 0 ? gradeColor(g) : 'text-muted-foreground'}`}>
                          {g > 0 ? g : '-'}
                        </td>
                      ))}
                      <td className={`text-center py-2 font-bold ${avg > 0 ? gradeColor(Math.round(avg)) : ''}`}>
                        {avg > 0 ? avg.toFixed(1) : '-'}
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

export default DocenteLibretas;

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { mockStudents, mockGrades, mockSubjects, gradeLabel, gradeColor } from '@/lib/mock-data';
import { Printer } from 'lucide-react';

const ReporteNotas = () => {
  const [selectedGrade, setSelectedGrade] = useState('4to');
  const [selectedPeriod, setSelectedPeriod] = useState('1');

  const subjects = mockSubjects.filter(s => s.grade === selectedGrade);
  const students = mockStudents.filter(s => s.grade === selectedGrade);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold">Reporte de Notas</h2>
        <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4 mr-2" />Imprimir</Button>
      </div>

      <div className="flex gap-3">
        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            {['1ro','2do','3ro','4to','5to'].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            {[1,2,3,4].map(p => <SelectItem key={p} value={String(p)}>Bimestre {p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-card">Alumno</TableHead>
                {subjects.map(s => <TableHead key={s.id} className="text-center">{s.name}</TableHead>)}
                <TableHead className="text-center">Promedio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(st => {
                const studentGrades = subjects.map(sub => {
                  const g = mockGrades.find(gr => gr.studentId === st.id && gr.subjectId === sub.id && gr.period === parseInt(selectedPeriod));
                  return g?.finalGrade || 0;
                });
                const validGrades = studentGrades.filter(g => g > 0);
                const avg = validGrades.length ? (validGrades.reduce((a,b) => a+b, 0) / validGrades.length) : 0;

                return (
                  <TableRow key={st.id}>
                    <TableCell className="font-medium sticky left-0 bg-card">{st.firstName} {st.lastName}</TableCell>
                    {studentGrades.map((g, i) => (
                      <TableCell key={i} className={`text-center font-semibold ${g > 0 ? gradeColor(g) : 'text-muted-foreground'}`}>
                        {g > 0 ? g : '-'}
                      </TableCell>
                    ))}
                    <TableCell className={`text-center font-bold ${avg > 0 ? gradeColor(Math.round(avg)) : ''}`}>
                      {avg > 0 ? avg.toFixed(1) : '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReporteNotas;

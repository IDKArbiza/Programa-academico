import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockGrades, mockSubjects, mockStudents, gradeColor, gradeLabel } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';

const CoordinadorCalificaciones = () => {
  const [selectedGrade, setSelectedGrade] = useState('1° Año');
  const [selectedEtapa, setSelectedEtapa] = useState('1');

  const students = mockStudents.filter(s => s.grade === selectedGrade && s.status === 'activo');
  const subjects = mockSubjects.filter(s => s.grade === selectedGrade);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Calificaciones</h2>

      <div className="flex gap-4 flex-wrap">
        <div className="space-y-1">
          <Label>Grado</Label>
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1° Año">1° Año</SelectItem>
              <SelectItem value="2° Año">2° Año</SelectItem>
              <SelectItem value="3° Año">3° Año</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Etapa</Label>
          <Select value={selectedEtapa} onValueChange={setSelectedEtapa}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Etapa 1</SelectItem>
              <SelectItem value="2">Etapa 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-card z-10">Alumno</TableHead>
                {subjects.map(s => <TableHead key={s.id} className="text-center">{s.name}</TableHead>)}
                <TableHead className="text-center font-bold">Promedio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map(student => {
                const studentGrades = subjects.map(sub => {
                  const g = mockGrades.find(gr => gr.studentId === student.id && gr.subjectId === sub.id && gr.etapa === parseInt(selectedEtapa));
                  return g?.finalGrade || 0;
                });
                const validGrades = studentGrades.filter(g => g > 0);
                const avg = validGrades.length ? (validGrades.reduce((a, b) => a + b, 0) / validGrades.length) : 0;

                return (
                  <TableRow key={student.id}>
                    <TableCell className="sticky left-0 bg-card z-10 font-medium">{student.firstName} {student.lastName}</TableCell>
                    {studentGrades.map((nota, i) => (
                      <TableCell key={i} className={`text-center text-lg font-bold ${nota > 0 ? gradeColor(nota) : 'text-muted-foreground'}`}>
                        {nota > 0 ? nota : '-'}
                      </TableCell>
                    ))}
                    <TableCell className={`text-center text-lg font-bold ${avg > 0 ? gradeColor(Math.round(avg)) : 'text-muted-foreground'}`}>
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

export default CoordinadorCalificaciones;

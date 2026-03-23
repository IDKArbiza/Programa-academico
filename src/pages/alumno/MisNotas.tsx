import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockGrades, mockSubjects, mockStudents, gradeColor, gradeLabel } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';

const MisNotas = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const student = mockStudents.find(s => s.id === 's1')!;
  const subjects = mockSubjects.filter(s => s.grade === student.grade);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mis Notas</h2>

      <div className="space-y-1">
        <Label>Período</Label>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            {[1,2,3,4].map(p => <SelectItem key={p} value={String(p)}>Bimestre {p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia</TableHead>
                <TableHead className="text-center">Nota</TableHead>
                <TableHead className="text-center">Calificación</TableHead>
                <TableHead className="text-center">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map(sub => {
                const g = mockGrades.find(gr => gr.studentId === 's1' && gr.subjectId === sub.id && gr.period === parseInt(selectedPeriod));
                const nota = g?.finalGrade || 0;
                return (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.name}</TableCell>
                    <TableCell className={`text-center text-lg font-bold ${nota > 0 ? gradeColor(nota) : 'text-muted-foreground'}`}>
                      {nota > 0 ? nota : '-'}
                    </TableCell>
                    <TableCell className="text-center text-sm">{nota > 0 ? gradeLabel(nota) : '-'}</TableCell>
                    <TableCell className="text-center">
                      {nota >= 3 ? (
                        <span className="text-xs font-semibold text-success bg-success/10 px-2 py-1 rounded-full">Aprobado</span>
                      ) : nota > 0 ? (
                        <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded-full">Desaprobado</span>
                      ) : '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail for criteria */}
      {mockGrades.filter(g => g.studentId === 's1' && g.period === parseInt(selectedPeriod) && g.criteriaGrades.length > 0).map(g => {
        const sub = mockSubjects.find(s => s.id === g.subjectId);
        return (
          <Card key={g.id}>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Detalle: {sub?.name}</h4>
              <div className="space-y-1">
                {g.criteriaGrades.map(c => (
                  <div key={c.criteriaId} className="flex justify-between text-sm p-2 rounded bg-secondary/30">
                    <span>{c.criteriaName} ({c.weight}%)</span>
                    <span className={`font-semibold ${gradeColor(c.grade)}`}>{c.grade}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MisNotas;

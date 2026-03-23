import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockStudents, mockGrades, mockSubjects, gradeColor, gradeLabel } from '@/lib/mock-data';
import { Printer } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const BoletaNotas = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const student = mockStudents.find(s => s.id === 's1')!;
  const subjects = mockSubjects.filter(s => s.grade === student.grade);
  const period = parseInt(selectedPeriod);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Boleta de Notas</h2>
        <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4 mr-2" />Imprimir</Button>
      </div>

      <div className="space-y-1">
        <Label>Período</Label>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            {[1,2,3,4].map(p => <SelectItem key={p} value={String(p)}>Bimestre {p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card className="max-w-xl">
        <CardContent className="p-6">
          <div className="text-center mb-6 pb-4 border-b-2 border-foreground/10">
            <h3 className="text-lg font-bold">BOLETA DE NOTAS</h3>
            <p className="text-xs text-muted-foreground">Bachillerato Técnico en Informática</p>
            <p className="text-xs text-muted-foreground">Bimestre {period} · Año 2026</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm mb-6">
            <p><span className="text-muted-foreground">Alumno:</span> <strong>{student.firstName} {student.lastName}</strong></p>
            <p><span className="text-muted-foreground">DNI:</span> {student.dni}</p>
            <p><span className="text-muted-foreground">Grado:</span> {student.grade} "{student.section}"</p>
            <p><span className="text-muted-foreground">Apoderado:</span> {student.parentName}</p>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-foreground/20">
                <th className="text-left py-2">Materia</th>
                <th className="text-center py-2">Nota</th>
                <th className="text-center py-2">Calificación</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(sub => {
                const g = mockGrades.find(gr => gr.studentId === 's1' && gr.subjectId === sub.id && gr.period === period);
                const nota = g?.finalGrade || 0;
                return (
                  <tr key={sub.id} className="border-b border-border">
                    <td className="py-2 font-medium">{sub.name}</td>
                    <td className={`text-center py-2 text-lg font-bold ${nota > 0 ? gradeColor(nota) : 'text-muted-foreground'}`}>
                      {nota > 0 ? nota : '-'}
                    </td>
                    <td className="text-center py-2 text-xs">{nota > 0 ? gradeLabel(nota) : '-'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-6 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">Firma del Director: _________________________</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoletaNotas;

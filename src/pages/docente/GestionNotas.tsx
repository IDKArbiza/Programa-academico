import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockStudents, mockGrades, mockSubjects, gradeColor } from '@/lib/mock-data';
import { Save } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Grade } from '@/lib/types';
import { toast } from 'sonner';

const GestionNotas = () => {
  const [selectedSubject, setSelectedSubject] = useState('sub1');
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const [grades, setGrades] = useState<Grade[]>(mockGrades);

  const mySubjects = mockSubjects.filter(s => s.teacherId === 't1');
  const subject = mockSubjects.find(s => s.id === selectedSubject);
  const students = mockStudents.filter(s => s.grade === subject?.grade);

  const updateGrade = (studentId: string, value: number) => {
    const existing = grades.findIndex(g => g.studentId === studentId && g.subjectId === selectedSubject && g.etapa === parseInt(selectedPeriod));
    if (existing >= 0) {
      const updated = [...grades];
      updated[existing] = { ...updated[existing], finalGrade: value };
      setGrades(updated);
    } else {
      setGrades([...grades, {
        id: `g${Date.now()}`,
        studentId,
        subjectId: selectedSubject,
        etapa: parseInt(selectedPeriod) as 1 | 2,
        year: 2026,
        finalGrade: value,
        criteriaGrades: [],
        isRecovery: false,
      }]);
    }
  };

  const handleSave = () => {
    toast.success('Notas guardadas correctamente');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Notas</h2>
      <p className="text-muted-foreground">Escala de evaluación: 1 (Deficiente) a 5 (Excelente)</p>

      <div className="flex gap-3 items-end flex-wrap">
        <div className="space-y-1">
          <Label>Materia</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
            <SelectContent>
              {mySubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name} - {s.grade}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Período</Label>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[1,2].map(p => <SelectItem key={p} value={String(p)}>Etapa {p}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Guardar Notas</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Alumno</TableHead>
                <TableHead className="text-center">Nota (1-5)</TableHead>
                <TableHead className="text-center">Calificación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((st, idx) => {
                const g = grades.find(gr => gr.studentId === st.id && gr.subjectId === selectedSubject && gr.etapa === parseInt(selectedPeriod));
                const nota = g?.finalGrade || 0;

                return (
                  <TableRow key={st.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium">{st.firstName} {st.lastName}</TableCell>
                    <TableCell className="text-center">
                      <Select value={nota > 0 ? String(nota) : ''} onValueChange={v => updateGrade(st.id, parseInt(v))}>
                        <SelectTrigger className="w-20 mx-auto"><SelectValue placeholder="-" /></SelectTrigger>
                        <SelectContent>
                          {[1,2,3,4,5].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className={`text-center font-semibold ${nota > 0 ? gradeColor(nota) : 'text-muted-foreground'}`}>
                      {nota > 0 ? ['','Deficiente','Insuficiente','Aceptable','Bueno','Excelente'][nota] : '-'}
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

export default GestionNotas;

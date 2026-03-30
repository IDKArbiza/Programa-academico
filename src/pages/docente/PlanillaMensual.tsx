import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSubjects, mockStudents, mockMonthlySheets, ALL_MONTHS, gradeColor } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Save, Send, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlanillaMensual = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState('sub1');
  const [selectedMonth, setSelectedMonth] = useState('3');

  const mySubjects = mockSubjects.filter(s => s.teacherId === 't1');
  const subject = mockSubjects.find(s => s.id === selectedSubject);
  const students = subject ? mockStudents.filter(s => s.grade === subject.grade && s.status === 'activo') : [];
  const month = parseInt(selectedMonth);

  const sheet = mockMonthlySheets.find(s => s.subjectId === selectedSubject && s.month === month);

  const [grades, setGrades] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    if (sheet) {
      sheet.entries.forEach(e => {
        initial[e.studentId] = e.finalGrade;
      });
    }
    return initial;
  });

  const handleGradeChange = (studentId: string, value: string) => {
    const num = parseInt(value);
    if (num >= 1 && num <= 5) {
      setGrades(prev => ({ ...prev, [studentId]: num }));
    } else if (value === '') {
      setGrades(prev => ({ ...prev, [studentId]: 0 }));
    }
  };

  const handleSave = () => {
    toast({ title: 'Planilla guardada', description: `Borrador guardado para ${ALL_MONTHS.find(m => m.month === month)?.name}` });
  };

  const handleSubmit = () => {
    toast({ title: 'Planilla enviada', description: 'La planilla fue enviada para aprobación del coordinador' });
  };

  const monthName = ALL_MONTHS.find(m => m.month === month)?.name || '';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Layers className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Planilla de Puntaje Mensual</h2>
          <p className="text-sm text-muted-foreground">Carga de calificaciones mensuales por materia — Escala 1 a 5</p>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="space-y-1">
          <Label>Materia</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
            <SelectContent>
              {mySubjects.map(s => (
                <SelectItem key={s.id} value={s.id}>{s.name} — {s.grade}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
      </div>

      {sheet && (
        <Badge variant={sheet.status === 'aprobado' ? 'default' : sheet.status === 'enviado' ? 'secondary' : 'outline'}>
          Estado: {sheet.status.charAt(0).toUpperCase() + sheet.status.slice(1)}
        </Badge>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {subject?.name} — {subject?.grade} — {monthName} 2026
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Alumno</TableHead>
                <TableHead>CI</TableHead>
                <TableHead className="text-center w-32">Nota (1-5)</TableHead>
                <TableHead className="text-center">Calificación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, idx) => {
                const nota = grades[student.id] || 0;
                return (
                  <TableRow key={student.id}>
                    <TableCell className="text-muted-foreground">{idx + 1}</TableCell>
                    <TableCell className="font-medium">{student.lastName}, {student.firstName}</TableCell>
                    <TableCell className="text-sm">{student.ci}</TableCell>
                    <TableCell className="text-center">
                      <Input
                        type="number"
                        min={1}
                        max={5}
                        value={nota || ''}
                        onChange={(e) => handleGradeChange(student.id, e.target.value)}
                        className="w-20 mx-auto text-center text-lg font-bold"
                        placeholder="-"
                      />
                    </TableCell>
                    <TableCell className={`text-center font-semibold ${nota > 0 ? gradeColor(nota) : 'text-muted-foreground'}`}>
                      {nota >= 4 ? 'Bueno/Excelente' : nota === 3 ? 'Aceptable' : nota > 0 ? 'Insuficiente' : '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />Guardar Borrador
        </Button>
        <Button onClick={handleSubmit}>
          <Send className="h-4 w-4 mr-2" />Enviar Planilla
        </Button>
      </div>
    </div>
  );
};

export default PlanillaMensual;

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSubjects, mockStudents, ALL_MONTHS } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Save, Send, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const GRADES = ['1° Año', '2° Año', '3° Año'];

const PlanillaMensual = () => {
  const { toast } = useToast();
  const [selectedGrade, setSelectedGrade] = useState('3° Año');
  const [selectedMonth, setSelectedMonth] = useState('2');

  const month = parseInt(selectedMonth);
  const monthName = ALL_MONTHS.find(m => m.month === month)?.name || '';

  // Materias del curso seleccionado
  const subjects = mockSubjects.filter(s => s.grade === selectedGrade);
  // Alumnos del curso seleccionado
  const students = mockStudents
    .filter(s => s.grade === selectedGrade && s.status === 'activo')
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  // TP (Total Puntaje) = hoursPerWeek * 2 (2 puntos por hora cátedra/tarea)
  const getTP = (hoursPerWeek: number) => hoursPerWeek * 2;

  // State: grades[studentId][subjectId] = puntaje
  const [grades, setGrades] = useState<Record<string, Record<string, number>>>({});

  const handleGradeChange = (studentId: string, subjectId: string, value: string, maxTP: number) => {
    const num = parseInt(value);
    if (value === '') {
      setGrades(prev => ({
        ...prev,
        [studentId]: { ...prev[studentId], [subjectId]: 0 }
      }));
    } else if (num >= 0 && num <= maxTP) {
      setGrades(prev => ({
        ...prev,
        [studentId]: { ...prev[studentId], [subjectId]: num }
      }));
    }
  };

  const getGrade = (studentId: string, subjectId: string) => {
    return grades[studentId]?.[subjectId] || 0;
  };

  const handleSave = () => {
    toast({ title: 'Planilla guardada', description: `Borrador guardado para ${monthName} 2026` });
  };

  const handleSubmit = () => {
    toast({ title: 'Planilla enviada', description: 'La planilla fue enviada para aprobación del coordinador' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Layers className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Planilla de Informe Mensual</h2>
          <p className="text-sm text-muted-foreground">Colegio Politécnico Cooperativa Multiactiva Capiatá Ltda.</p>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="space-y-1">
          <Label>Curso</Label>
          <Select value={selectedGrade} onValueChange={setSelectedGrade}>
            <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
            <SelectContent>
              {GRADES.map(g => (
                <SelectItem key={g} value={g}>{g} Bachillerato Técnico en Informática</SelectItem>
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

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {/* Header info */}
          <div className="text-center py-4 border-b border-border px-4">
            <h3 className="font-bold text-lg">Planilla de Informe Mensual</h3>
            <p className="font-semibold text-primary">{monthName} de 2026</p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>Curso:</strong> {selectedGrade} Bachillerato Técnico en Informática
            </p>
          </div>

          <table className="w-full text-xs min-w-[900px]">
            <thead>
              {/* Subject names row */}
              <tr className="border-b border-border">
                <th rowSpan={2} className="text-center py-2 px-2 border-r border-border w-10 bg-muted/50">Orden</th>
                <th rowSpan={2} className="text-left py-2 px-3 border-r border-border min-w-[200px] bg-muted/50">Apellidos y Nombres</th>
                {subjects.map(sub => (
                  <th key={sub.id} className="text-center py-2 px-1 border-r border-border bg-muted/50 max-w-[80px]">
                    <span className="writing-mode-vertical block text-[10px] leading-tight" title={sub.name}>
                      {sub.name}
                    </span>
                  </th>
                ))}
              </tr>
              {/* TP row */}
              <tr className="border-b-2 border-foreground/30">
                {subjects.map(sub => (
                  <th key={sub.id} className="text-center py-1 px-1 border-r border-border bg-muted/30">
                    <Badge variant="outline" className="text-[10px] px-1 py-0">
                      TP: {getTP(sub.hoursPerWeek)}
                    </Badge>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student.id} className="border-b border-border hover:bg-muted/20">
                  <td className="text-center py-1 px-2 border-r border-border text-muted-foreground font-medium">
                    {idx + 1}
                  </td>
                  <td className="py-1 px-3 border-r border-border font-medium whitespace-nowrap">
                    {student.lastName}, {student.firstName}
                  </td>
                  {subjects.map(sub => {
                    const tp = getTP(sub.hoursPerWeek);
                    const val = getGrade(student.id, sub.id);
                    return (
                      <td key={sub.id} className="text-center py-1 px-1 border-r border-border">
                        <Input
                          type="number"
                          min={0}
                          max={tp}
                          value={val || ''}
                          onChange={(e) => handleGradeChange(student.id, sub.id, e.target.value, tp)}
                          className="w-12 h-7 mx-auto text-center text-xs font-bold p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          placeholder="-"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
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

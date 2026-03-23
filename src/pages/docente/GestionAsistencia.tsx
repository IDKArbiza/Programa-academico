import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { mockStudents, mockAttendance, mockSubjects, DAYS } from '@/lib/mock-data';
import { Attendance } from '@/lib/types';
import { Save } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  presente: 'bg-success/10 text-success border-success/20',
  ausente: 'bg-destructive/10 text-destructive border-destructive/20',
  tardanza: 'bg-warning/10 text-warning border-warning/20',
  justificado: 'bg-primary/10 text-primary border-primary/20',
};

const GestionAsistencia = () => {
  const [selectedSubject, setSelectedSubject] = useState('sub1');
  const [selectedDate, setSelectedDate] = useState('2026-03-23');
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);

  const mySubjects = mockSubjects.filter(s => s.teacherId === 't1');
  const subject = mockSubjects.find(s => s.id === selectedSubject);
  const students = mockStudents.filter(s => s.grade === subject?.grade);

  const setStatus = (studentId: string, status: Attendance['status']) => {
    const existing = attendance.findIndex(a => a.studentId === studentId && a.subjectId === selectedSubject && a.date === selectedDate);
    if (existing >= 0) {
      const updated = [...attendance];
      updated[existing] = { ...updated[existing], status };
      setAttendance(updated);
    } else {
      setAttendance([...attendance, { id: `a${Date.now()}`, studentId, subjectId: selectedSubject, date: selectedDate, status }]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Asistencia</h2>

      <div className="flex gap-3 items-end flex-wrap">
        <div className="space-y-1">
          <Label>Materia</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
            <SelectContent>
              {mySubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Fecha</Label>
          <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-44" />
        </div>
        <Button onClick={() => toast.success('Asistencia guardada')}><Save className="h-4 w-4 mr-2" />Guardar</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Alumno</TableHead>
                <TableHead className="text-center">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((st, idx) => {
                const record = attendance.find(a => a.studentId === st.id && a.subjectId === selectedSubject && a.date === selectedDate);
                const status = record?.status || '';

                return (
                  <TableRow key={st.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium">{st.firstName} {st.lastName}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 justify-center flex-wrap">
                        {(['presente', 'ausente', 'tardanza', 'justificado'] as const).map(s => (
                          <button
                            key={s}
                            onClick={() => setStatus(st.id, s)}
                            className={`px-2 py-1 rounded text-xs font-medium border transition-all ${
                              status === s ? statusColors[s] + ' ring-1 ring-current' : 'bg-muted text-muted-foreground border-transparent hover:bg-secondary'
                            }`}
                          >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </button>
                        ))}
                      </div>
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

export default GestionAsistencia;

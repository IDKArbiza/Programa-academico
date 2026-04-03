import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockMonthlySheets, mockSubjects, mockStudents, ALL_MONTHS, gradeColor, gradeLabel } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Printer, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DirectorPlanillas = () => {
  const { toast } = useToast();
  const [selectedMonth, setSelectedMonth] = useState('all');

  const filtered = selectedMonth === 'all'
    ? mockMonthlySheets
    : mockMonthlySheets.filter(s => s.month === parseInt(selectedMonth));

  const handleApprove = (sheetId: string) => {
    toast({ title: 'Planilla aprobada', description: 'La planilla fue aprobada exitosamente' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Planillas Mensuales</h2>
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-2" />Imprimir
        </Button>
      </div>

      <div className="space-y-1">
        <Label>Mes</Label>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {ALL_MONTHS.map(m => (
              <SelectItem key={m.month} value={String(m.month)}>{m.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.map(sheet => {
        const sub = mockSubjects.find(s => s.id === sheet.subjectId);
        const monthName = ALL_MONTHS.find(m => m.month === sheet.month)?.name;

        return (
          <Card key={sheet.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold">{sub?.name} — {sheet.grade}</h3>
                  <p className="text-sm text-muted-foreground">{monthName} 2026 · Etapa {sheet.etapa}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge variant={sheet.status === 'aprobado' ? 'default' : 'secondary'}>{sheet.status}</Badge>
                  {sheet.status === 'enviado' && (
                    <Button size="sm" onClick={() => handleApprove(sheet.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />Aprobar
                    </Button>
                  )}
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Alumno</TableHead>
                    <TableHead className="text-center">Nota</TableHead>
                    <TableHead className="text-center">Calificación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sheet.entries.map((entry, idx) => {
                    const student = mockStudents.find(s => s.id === entry.studentId);
                    return (
                      <TableRow key={entry.studentId}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell className="font-medium">{student?.lastName}, {student?.firstName}</TableCell>
                        <TableCell className={`text-center text-lg font-bold ${entry.finalGrade > 0 ? gradeColor(entry.finalGrade) : 'text-muted-foreground'}`}>
                          {entry.finalGrade || '-'}
                        </TableCell>
                        <TableCell className="text-center text-sm">{entry.finalGrade > 0 ? gradeLabel(entry.finalGrade) : '-'}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DirectorPlanillas;

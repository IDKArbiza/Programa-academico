import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockMonthlySheets, mockSubjects, mockTeachers, ALL_MONTHS } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';

const CoordinadorPlanillas = () => {
  const [selectedMonth, setSelectedMonth] = useState('all');

  const filtered = selectedMonth === 'all'
    ? mockMonthlySheets
    : mockMonthlySheets.filter(s => s.month === parseInt(selectedMonth));

  const statusColor = (status: string) => {
    switch (status) {
      case 'aprobado': return 'default';
      case 'enviado': return 'secondary';
      case 'borrador': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Planillas Mensuales</h2>

      <div className="space-y-1">
        <Label>Filtrar por Mes</Label>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los meses</SelectItem>
            {ALL_MONTHS.map(m => (
              <SelectItem key={m.month} value={String(m.month)}>{m.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Materia</TableHead>
                <TableHead>Docente</TableHead>
                <TableHead>Grado</TableHead>
                <TableHead>Mes</TableHead>
                <TableHead>Etapa</TableHead>
                <TableHead className="text-center">Alumnos</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(sheet => {
                const sub = mockSubjects.find(s => s.id === sheet.subjectId);
                const teacher = mockTeachers.find(t => t.id === sheet.teacherId);
                const monthName = ALL_MONTHS.find(m => m.month === sheet.month)?.name;
                return (
                  <TableRow key={sheet.id}>
                    <TableCell className="font-medium">{sub?.name}</TableCell>
                    <TableCell>{teacher?.firstName} {teacher?.lastName}</TableCell>
                    <TableCell>{sheet.grade}</TableCell>
                    <TableCell>{monthName}</TableCell>
                    <TableCell>Etapa {sheet.etapa}</TableCell>
                    <TableCell className="text-center">{sheet.entries.length}</TableCell>
                    <TableCell>
                      <Badge variant={statusColor(sheet.status) as any}>{sheet.status}</Badge>
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

export default CoordinadorPlanillas;

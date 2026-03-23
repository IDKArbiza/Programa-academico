import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockCriteria, mockSubjects } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';

const DocenteCriterios = () => {
  const [selectedSubject, setSelectedSubject] = useState('sub1');
  const mySubjects = mockSubjects.filter(s => s.teacherId === 't1');
  const filtered = mockCriteria.filter(c => c.subjectId === selectedSubject);
  const total = filtered.reduce((a, b) => a + b.weight, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Criterios de Evaluación</h2>

      <div className="space-y-1">
        <Label>Materia</Label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
          <SelectContent>
            {mySubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex justify-between">
            <span>Criterios configurados</span>
            <span className={total === 100 ? 'text-success' : 'text-destructive'}>Total: {total}%</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Criterio</TableHead>
                <TableHead>Peso</TableHead>
                <TableHead>Período</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.weight}%</TableCell>
                  <TableCell>Etapa {c.etapa}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-8">Sin criterios</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocenteCriterios;

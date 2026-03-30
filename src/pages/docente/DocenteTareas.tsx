import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockTasks, mockSubjects } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

const DocenteTareas = () => {
  const mySubjects = mockSubjects.filter(s => s.teacherId === 't1');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const myTasks = mockTasks.filter(t => t.teacherId === 't1');
  const filtered = selectedSubject === 'all' ? myTasks : myTasks.filter(t => t.subjectId === selectedSubject);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Mis Tareas</h2>
        <Button><Plus className="h-4 w-4 mr-2" />Nueva Tarea</Button>
      </div>

      <div className="space-y-1">
        <Label>Materia</Label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {mySubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarea</TableHead>
                <TableHead>Materia</TableHead>
                <TableHead>Grado</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(task => {
                const sub = mockSubjects.find(s => s.id === task.subjectId);
                return (
                  <TableRow key={task.id}>
                    <TableCell>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.description}</p>
                    </TableCell>
                    <TableCell>{sub?.name}</TableCell>
                    <TableCell>{task.grade} "{task.section}"</TableCell>
                    <TableCell><Badge variant="secondary">{task.type}</Badge></TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell><Badge variant={task.status === 'activa' ? 'default' : 'secondary'}>{task.status}</Badge></TableCell>
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

export default DocenteTareas;

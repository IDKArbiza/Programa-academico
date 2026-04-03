import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockTasks, mockSubjects, mockTeachers } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

const GestionTareas = () => {
  const [selectedGrade, setSelectedGrade] = useState('all');

  const filtered = selectedGrade === 'all' ? mockTasks : mockTasks.filter(t => t.grade === selectedGrade);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Gestión de Tareas</h2>
        <Button><Plus className="h-4 w-4 mr-2" />Nueva Tarea</Button>
      </div>

      <div className="space-y-1">
        <Label>Filtrar por Grado</Label>
        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="1° Año">1° Año</SelectItem>
            <SelectItem value="2° Año">2° Año</SelectItem>
            <SelectItem value="3° Año">3° Año</SelectItem>
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
                <TableHead>Docente</TableHead>
                <TableHead>Grado</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(task => {
                const sub = mockSubjects.find(s => s.id === task.subjectId);
                const teacher = mockTeachers.find(t => t.id === task.teacherId);
                return (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>{sub?.name}</TableCell>
                    <TableCell>{teacher?.firstName} {teacher?.lastName}</TableCell>
                    <TableCell>{task.grade}</TableCell>
                    <TableCell><Badge variant="secondary">{task.type}</Badge></TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={task.status === 'activa' ? 'default' : 'secondary'}>
                        {task.status}
                      </Badge>
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

export default GestionTareas;

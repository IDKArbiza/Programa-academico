import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSubjects, mockTeachers } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';

const GestionMaterias = () => {
  const [selectedGrade, setSelectedGrade] = useState('all');

  const filtered = selectedGrade === 'all' ? mockSubjects : mockSubjects.filter(s => s.grade === selectedGrade);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <h2 className="text-2xl font-bold">Gestión de Materias</h2>
        <Button><Plus className="h-4 w-4 mr-2" />Nueva Materia</Button>
      </div>

      <div className="space-y-1">
        <Label>Filtrar por Grado</Label>
        <Select value={selectedGrade} onValueChange={setSelectedGrade}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los grados</SelectItem>
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
                <TableHead>Código</TableHead>
                <TableHead>Materia</TableHead>
                <TableHead>Grado</TableHead>
                <TableHead>Docente</TableHead>
                <TableHead className="text-center">Hrs/Sem</TableHead>
                <TableHead>Área</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(sub => {
                const teacher = mockTeachers.find(t => t.id === sub.teacherId);
                return (
                  <TableRow key={sub.id}>
                    <TableCell className="font-mono text-xs">{sub.code}</TableCell>
                    <TableCell className="font-medium">{sub.name}</TableCell>
                    <TableCell>{sub.grade}</TableCell>
                    <TableCell>{teacher?.firstName} {teacher?.lastName}</TableCell>
                    <TableCell className="text-center">{sub.hoursPerWeek}</TableCell>
                    <TableCell><Badge variant="secondary">{sub.area}</Badge></TableCell>
                    <TableCell className="text-center">
                      <div className="flex gap-1 justify-center">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
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

export default GestionMaterias;

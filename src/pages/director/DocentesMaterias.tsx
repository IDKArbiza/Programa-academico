import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockTeachers, mockSubjects } from '@/lib/mock-data';
import { UserPlus } from 'lucide-react';

const DocentesMaterias = () => {
  const [teachers] = useState(mockTeachers);
  const [subjects] = useState(mockSubjects);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Docentes y Materias</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Docentes</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm"><UserPlus className="h-4 w-4 mr-1" />Agregar</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Nuevo Docente</DialogTitle></DialogHeader>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1"><Label>Nombres</Label><Input /></div>
                  <div className="space-y-1"><Label>Apellidos</Label><Input /></div>
                  <div className="space-y-1"><Label>DNI</Label><Input /></div>
                  <div className="space-y-1"><Label>Especialidad</Label><Input /></div>
                  <div className="space-y-1"><Label>Teléfono</Label><Input /></div>
                  <div className="space-y-1"><Label>Email</Label><Input /></div>
                </div>
                <Button className="w-full mt-3">Registrar</Button>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Docente</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Materias</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map(t => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.firstName} {t.lastName}</TableCell>
                    <TableCell>{t.specialty}</TableCell>
                    <TableCell>{t.subjects.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Materias</CardTitle>
            <Button size="sm"><UserPlus className="h-4 w-4 mr-1" />Agregar</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Materia</TableHead>
                  <TableHead>Grado</TableHead>
                  <TableHead>Docente</TableHead>
                  <TableHead>Hrs/Sem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map(s => {
                  const teacher = teachers.find(t => t.id === s.teacherId);
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>{s.grade}</TableCell>
                      <TableCell>{teacher ? `${teacher.firstName} ${teacher.lastName}` : '-'}</TableCell>
                      <TableCell>{s.hoursPerWeek}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocentesMaterias;

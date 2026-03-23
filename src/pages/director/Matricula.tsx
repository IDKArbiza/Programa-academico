import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockStudents } from '@/lib/mock-data';
import { Student } from '@/lib/types';
import { UserPlus, Search, Printer } from 'lucide-react';

const Matricula = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<Partial<Student>>({ grade: '4to', section: 'A', status: 'activo' });

  const filtered = students.filter(s =>
    `${s.firstName} ${s.lastName} ${s.dni}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    const newStudent: Student = {
      id: `s${Date.now()}`,
      firstName: form.firstName || '',
      lastName: form.lastName || '',
      dni: form.dni || '',
      grade: form.grade || '4to',
      section: form.section || 'A',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'activo',
      parentName: form.parentName || '',
      parentPhone: form.parentPhone || '',
      address: form.address || '',
    };
    setStudents([...students, newStudent]);
    setDialogOpen(false);
    setForm({ grade: '4to', section: 'A', status: 'activo' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Matrícula de Alumnos</h2>
          <p className="text-muted-foreground">Registro y gestión de alumnos matriculados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />Ficha
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button><UserPlus className="h-4 w-4 mr-2" />Nuevo Alumno</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Registrar Nuevo Alumno</DialogTitle></DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nombres</Label>
                  <Input value={form.firstName || ''} onChange={e => setForm({...form, firstName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Apellidos</Label>
                  <Input value={form.lastName || ''} onChange={e => setForm({...form, lastName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>DNI</Label>
                  <Input value={form.dni || ''} onChange={e => setForm({...form, dni: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Grado</Label>
                  <Select value={form.grade} onValueChange={v => setForm({...form, grade: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['1ro','2do','3ro','4to','5to'].map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Sección</Label>
                  <Select value={form.section} onValueChange={v => setForm({...form, section: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['A','B','C'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Apoderado</Label>
                  <Input value={form.parentName || ''} onChange={e => setForm({...form, parentName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Teléfono</Label>
                  <Input value={form.parentPhone || ''} onChange={e => setForm({...form, parentPhone: e.target.value})} />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Dirección</Label>
                  <Input value={form.address || ''} onChange={e => setForm({...form, address: e.target.value})} />
                </div>
              </div>
              <Button className="w-full mt-4" onClick={handleAdd}>Registrar Alumno</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-10" placeholder="Buscar por nombre o DNI..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alumno</TableHead>
                <TableHead>DNI</TableHead>
                <TableHead>Grado</TableHead>
                <TableHead>Apoderado</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.firstName} {s.lastName}</TableCell>
                  <TableCell>{s.dni}</TableCell>
                  <TableCell>{s.grade} "{s.section}"</TableCell>
                  <TableCell>{s.parentName}</TableCell>
                  <TableCell>
                    <Badge variant={s.status === 'activo' ? 'default' : 'destructive'}>
                      {s.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Matricula;

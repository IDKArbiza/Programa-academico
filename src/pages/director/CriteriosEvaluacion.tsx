import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { mockCriteria, mockSubjects } from '@/lib/mock-data';
import { EvaluationCriteria } from '@/lib/types';
import { Plus } from 'lucide-react';

const CriteriosEvaluacion = () => {
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>(mockCriteria);
  const [selectedSubject, setSelectedSubject] = useState('sub1');
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = criteria.filter(c => c.subjectId === selectedSubject);
  const totalWeight = filtered.reduce((a, b) => a + b.weight, 0);
  const subject = mockSubjects.find(s => s.id === selectedSubject);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Criterios de Evaluación</h2>

      <div className="flex gap-3 items-end">
        <div className="space-y-1">
          <Label>Materia</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
            <SelectContent>
              {mockSubjects.map(s => <SelectItem key={s.id} value={s.id}>{s.name} - {s.grade}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-1" />Agregar Criterio</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nuevo Criterio de Evaluación</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1"><Label>Nombre del Criterio</Label><Input placeholder="Ej: Examen Parcial" /></div>
              <div className="space-y-1"><Label>Peso (%)</Label><Input type="number" placeholder="30" /></div>
              <div className="space-y-1">
                <Label>Período</Label>
                <Select defaultValue="1">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4].map(p => <SelectItem key={p} value={String(p)}>Bimestre {p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full mt-3" onClick={() => setDialogOpen(false)}>Guardar</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center justify-between">
            <span>{subject?.name} - {subject?.grade}</span>
            <span className={`text-sm ${totalWeight === 100 ? 'text-success' : 'text-destructive'}`}>
              Total: {totalWeight}%
            </span>
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
                  <TableCell>Bimestre {c.period}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-8">Sin criterios configurados</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CriteriosEvaluacion;

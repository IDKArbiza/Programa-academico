import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockStudents, mockPayments } from '@/lib/mock-data';
import { Printer, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Pagos = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [filterStatus, setFilterStatus] = useState('todos');

  const filtered = filterStatus === 'todos' ? payments : payments.filter(p => p.status === filterStatus);

  const totalPagado = payments.filter(p => p.status === 'pagado').reduce((a, b) => a + b.amount, 0);
  const totalPendiente = payments.filter(p => p.status !== 'pagado').reduce((a, b) => a + b.amount, 0);

  const markPaid = (id: string) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: 'pagado' as const, paidDate: new Date().toISOString().split('T')[0] } : p));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Pagos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success text-success-foreground"><DollarSign className="h-5 w-5" /></div>
            <div>
              <p className="text-xl font-bold">S/ {totalPagado}</p>
              <p className="text-sm text-muted-foreground">Total Recaudado</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning text-warning-foreground"><DollarSign className="h-5 w-5" /></div>
            <div>
              <p className="text-xl font-bold">S/ {totalPendiente}</p>
              <p className="text-sm text-muted-foreground">Pendiente</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground"><DollarSign className="h-5 w-5" /></div>
            <div>
              <p className="text-xl font-bold">{payments.length}</p>
              <p className="text-sm text-muted-foreground">Total Registros</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3 items-center">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar..." /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="pagado">Pagados</SelectItem>
            <SelectItem value="pendiente">Pendientes</SelectItem>
            <SelectItem value="vencido">Vencidos</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => window.print()}><Printer className="h-4 w-4 mr-2" />Imprimir Reporte</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alumno</TableHead>
                <TableHead>Concepto</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => {
                const student = mockStudents.find(s => s.id === p.studentId);
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{student?.firstName} {student?.lastName}</TableCell>
                    <TableCell>{p.concept}</TableCell>
                    <TableCell>S/ {p.amount}</TableCell>
                    <TableCell>{p.dueDate}</TableCell>
                    <TableCell>
                      <Badge variant={p.status === 'pagado' ? 'default' : p.status === 'vencido' ? 'destructive' : 'secondary'}>
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {p.status !== 'pagado' && (
                        <Button size="sm" variant="outline" onClick={() => markPaid(p.id)}>Pagar</Button>
                      )}
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

export default Pagos;

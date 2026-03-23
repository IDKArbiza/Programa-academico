import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockPayments } from '@/lib/mock-data';
import { AlertTriangle } from 'lucide-react';

const EstadoDeudas = () => {
  const payments = mockPayments.filter(p => p.studentId === 's1');
  const pending = payments.filter(p => p.status !== 'pagado');
  const totalDeuda = pending.reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Estado de Deudas</h2>

      {totalDeuda > 0 && (
        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <p className="font-semibold">Tienes S/ {totalDeuda} en pagos pendientes</p>
              <p className="text-sm text-muted-foreground">{pending.length} pago(s) sin cancelar</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Concepto</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Pagado</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.concept}</TableCell>
                  <TableCell>S/ {p.amount}</TableCell>
                  <TableCell>{p.dueDate}</TableCell>
                  <TableCell>{p.paidDate || '-'}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === 'pagado' ? 'default' : p.status === 'vencido' ? 'destructive' : 'secondary'}>
                      {p.status}
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

export default EstadoDeudas;

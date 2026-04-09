import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Eye, Clock, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePlanillasStore, Planilla } from '@/lib/planillas-store';
import { ALL_MONTHS } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { useAccountsStore } from '@/lib/accounts-store';

const RevisarPlanillas = () => {
  const { toast } = useToast();
  const { user } = useAppStore();
  const { planillas, loading, fetchPlanillas, updatePlanilla } = usePlanillasStore();
  const { accounts, fetchAccounts } = useAccountsStore();

  const [viewPlanilla, setViewPlanilla] = useState<Planilla | null>(null);
  const [rejectPlanilla, setRejectPlanilla] = useState<Planilla | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    fetchPlanillas();
    fetchAccounts();
  }, []);

  const pendientes = planillas.filter(p => p.status === 'enviado');
  const aprobadas = planillas.filter(p => p.status === 'aprobado');
  const rechazadas = planillas.filter(p => p.status === 'rechazado');

  const handleApprove = async (p: Planilla) => {
    try {
      await updatePlanilla(p.id, {
        status: 'aprobado',
        approvedDate: new Date().toISOString(),
        approvedBy: user?.name || 'Coordinador',
      });
      toast({ title: 'Planilla aprobada', description: `${p.subjectName} - ahora es visible para los alumnos` });
    } catch {
      toast({ title: 'Error', variant: 'destructive' });
    }
  };

  const handleReject = async () => {
    if (!rejectPlanilla || !rejectionReason.trim()) return;
    try {
      await updatePlanilla(rejectPlanilla.id, {
        status: 'rechazado',
        rejectionReason: rejectionReason.trim(),
      });
      toast({ title: 'Planilla rechazada', description: 'El profesor será notificado del motivo' });
      setRejectPlanilla(null);
      setRejectionReason('');
    } catch {
      toast({ title: 'Error', variant: 'destructive' });
    }
  };

  const getStudentName = (id: string) => {
    const a = accounts.find(acc => acc.id === id);
    return a ? `${a.lastName}, ${a.firstName}` : id;
  };

  const renderPlanillaCard = (p: Planilla, showActions: boolean) => {
    const mName = ALL_MONTHS.find(m => m.month === p.month)?.name || '';
    return (
      <Card key={p.id}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{p.subjectName}</p>
              <p className="text-xs text-muted-foreground">
                {p.grade} · {mName} {p.year} · Prof. {p.teacherName}
              </p>
              <p className="text-xs text-muted-foreground">
                {p.tasks.length} tareas · {p.scores.length} alumnos
                {p.submittedDate && ` · Enviada: ${new Date(p.submittedDate).toLocaleDateString('es-PY')}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewPlanilla(p)}>
                <Eye className="h-4 w-4 mr-1" /> Ver
              </Button>
              {showActions && (
                <>
                  <Button size="sm" onClick={() => handleApprove(p)} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-1" /> Aprobar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => { setRejectPlanilla(p); setRejectionReason(''); }}>
                    <XCircle className="h-4 w-4 mr-1" /> Rechazar
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Layers className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Revisar Planillas</h2>
          <p className="text-sm text-muted-foreground">Aprobar o rechazar planillas enviadas por los profesores</p>
        </div>
      </div>

      {loading && <p className="text-center text-muted-foreground py-8">Cargando...</p>}

      <Tabs defaultValue="pendientes">
        <TabsList>
          <TabsTrigger value="pendientes">
            <Clock className="h-4 w-4 mr-1" /> Pendientes ({pendientes.length})
          </TabsTrigger>
          <TabsTrigger value="aprobadas">
            <CheckCircle className="h-4 w-4 mr-1" /> Aprobadas ({aprobadas.length})
          </TabsTrigger>
          <TabsTrigger value="rechazadas">
            <XCircle className="h-4 w-4 mr-1" /> Rechazadas ({rechazadas.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pendientes" className="space-y-3">
          {pendientes.length === 0 && <p className="text-center text-muted-foreground py-8">No hay planillas pendientes de revisión.</p>}
          {pendientes.map(p => renderPlanillaCard(p, true))}
        </TabsContent>

        <TabsContent value="aprobadas" className="space-y-3">
          {aprobadas.length === 0 && <p className="text-center text-muted-foreground py-8">No hay planillas aprobadas.</p>}
          {aprobadas.map(p => renderPlanillaCard(p, false))}
        </TabsContent>

        <TabsContent value="rechazadas" className="space-y-3">
          {rechazadas.length === 0 && <p className="text-center text-muted-foreground py-8">No hay planillas rechazadas.</p>}
          {rechazadas.map(p => (
            <div key={p.id}>
              {renderPlanillaCard(p, false)}
              {p.rejectionReason && (
                <p className="text-xs text-destructive ml-4 mt-1">Motivo: {p.rejectionReason}</p>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {/* View Planilla Dialog */}
      <Dialog open={!!viewPlanilla} onOpenChange={(o) => !o && setViewPlanilla(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewPlanilla?.subjectName} — {ALL_MONTHS.find(m => m.month === viewPlanilla?.month)?.name} {viewPlanilla?.year}</DialogTitle>
            <p className="text-sm text-muted-foreground">Detalle de puntajes por alumno</p>
          </DialogHeader>
          {viewPlanilla && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-2 px-2 border-r text-center">N°</th>
                    <th className="py-2 px-3 border-r text-left min-w-[180px]">Alumno</th>
                    {viewPlanilla.tasks.map(t => (
                      <th key={t.id} className="py-2 px-1 border-r text-center min-w-[50px]">
                        <div className="text-[10px]">{t.name}</div>
                        <div className="text-[9px] text-muted-foreground">({t.maxPoints}pts)</div>
                      </th>
                    ))}
                    <th className="py-2 px-2 text-center bg-primary/10">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {viewPlanilla.scores.map((entry, idx) => {
                    const total = viewPlanilla.tasks.reduce((s, t) => s + (entry.scores[t.id] || 0), 0);
                    return (
                      <tr key={entry.studentId} className="border-b">
                        <td className="py-1 px-2 border-r text-center">{idx + 1}</td>
                        <td className="py-1 px-3 border-r">{getStudentName(entry.studentId)}</td>
                        {viewPlanilla.tasks.map(t => (
                          <td key={t.id} className="py-1 px-1 border-r text-center font-medium">
                            {entry.scores[t.id] || 0}
                          </td>
                        ))}
                        <td className="py-1 px-2 text-center font-bold">{total}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={!!rejectPlanilla} onOpenChange={(o) => !o && setRejectPlanilla(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar Planilla</DialogTitle>
            <p className="text-sm text-muted-foreground">Indicá el motivo del rechazo</p>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm">Planilla: <strong>{rejectPlanilla?.subjectName}</strong> — {rejectPlanilla?.teacherName}</p>
            <div className="space-y-1">
              <Label>Motivo del rechazo</Label>
              <Input value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} placeholder="Ej: Faltan puntajes de algunos alumnos" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectPlanilla(null)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>Rechazar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RevisarPlanillas;

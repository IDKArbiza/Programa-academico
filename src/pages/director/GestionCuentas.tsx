import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Users, BookOpen, GraduationCap, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccountsStore, Account } from '@/lib/accounts-store';

const GestionCuentas = () => {
  const { toast } = useToast();
  const { accounts, loading, fetchAccounts, createAccount, updateAccount, deleteAccount: removeAccount } = useAccountsStore();

  useEffect(() => { fetchAccounts(); }, []);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAccount, setNewAccount] = useState({
    firstName: '', lastName: '', ci: '', role: '' as string, grade: '',
  });

  const handleCreateAccount = async () => {
    if (!newAccount.firstName || !newAccount.lastName || !newAccount.ci || !newAccount.role) return;
    const email = `${newAccount.ci}@cpcc.com`;
    
    // Check if CI already exists
    const existing = accounts.find(a => a.ci === newAccount.ci);
    if (existing) {
      toast({ title: 'Error', description: 'Ya existe una cuenta con esa cédula', variant: 'destructive' });
      return;
    }

    try {
      await createAccount({
        firstName: newAccount.firstName,
        lastName: newAccount.lastName,
        ci: newAccount.ci,
        email,
        role: newAccount.role as Account['role'],
        grade: newAccount.role === 'alumno' ? newAccount.grade : undefined,
        status: 'activo',
      });
      setNewAccount({ firstName: '', lastName: '', ci: '', role: '', grade: '' });
      setShowCreateDialog(false);
      toast({
        title: 'Cuenta creada',
        description: `${newAccount.firstName} ${newAccount.lastName} — Email: ${email} — Contraseña: ${newAccount.ci}cpcc`,
      });
    } catch {
      toast({ title: 'Error', description: 'No se pudo crear la cuenta', variant: 'destructive' });
    }
  };

  const handleDeleteAccount = async (id: string) => {
    try {
      await removeAccount(id);
      toast({ title: 'Cuenta eliminada' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo eliminar la cuenta', variant: 'destructive' });
    }
  };

  const handleToggleStatus = async (account: Account) => {
    try {
      await updateAccount(account.id, {
        status: account.status === 'activo' ? 'inactivo' : 'activo',
      });
      toast({ title: `Cuenta ${account.status === 'activo' ? 'desactivada' : 'activada'}` });
    } catch {
      toast({ title: 'Error', variant: 'destructive' });
    }
  };

  const roleLabel = (role: string) => {
    switch (role) {
      case 'coordinador': return 'Coordinador';
      case 'docente': return 'Profesor';
      case 'alumno': return 'Alumno';
      default: return role;
    }
  };

  const roleIcon = (role: string) => {
    switch (role) {
      case 'coordinador': return <Users className="h-4 w-4" />;
      case 'docente': return <BookOpen className="h-4 w-4" />;
      case 'alumno': return <GraduationCap className="h-4 w-4" />;
      default: return null;
    }
  };

  const filterByRole = (role: string) => accounts.filter(a => a.role === role);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserPlus className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Gestión de Cuentas</h2>
            <p className="text-sm text-muted-foreground">Crear cuentas de Coordinadores, Profesores y Alumnos</p>
          </div>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <UserPlus className="h-4 w-4 mr-2" /> Crear Cuenta
        </Button>
      </div>

      {loading && <p className="text-center text-muted-foreground py-8">Cargando cuentas...</p>}

      <Tabs defaultValue="alumno">
        <TabsList>
          <TabsTrigger value="alumno">
            <GraduationCap className="h-4 w-4 mr-1" /> Alumnos ({filterByRole('alumno').length})
          </TabsTrigger>
          <TabsTrigger value="docente">
            <BookOpen className="h-4 w-4 mr-1" /> Profesores ({filterByRole('docente').length})
          </TabsTrigger>
          <TabsTrigger value="coordinador">
            <Users className="h-4 w-4 mr-1" /> Coordinadores ({filterByRole('coordinador').length})
          </TabsTrigger>
        </TabsList>

        {['alumno', 'docente', 'coordinador'].map(role => (
          <TabsContent key={role} value={role} className="space-y-3">
            {filterByRole(role).map(account => (
              <Card key={account.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {roleIcon(account.role)}
                    </div>
                    <div>
                      <p className="font-medium">{account.lastName}, {account.firstName}</p>
                      <p className="text-xs text-muted-foreground">
                        CI: {account.ci} · Email: {account.email}
                        {account.grade && ` · ${account.grade}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={account.status === 'activo' ? 'default' : 'secondary'}>
                      {account.status}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(account)}>
                      {account.status === 'activo' ? 'Desactivar' : 'Activar'}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAccount(account.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filterByRole(role).length === 0 && (
              <p className="text-center text-muted-foreground py-8">No hay cuentas de este tipo.</p>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Create Account Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nueva Cuenta</DialogTitle>
            <p className="text-sm text-muted-foreground">Completá los datos para crear una cuenta institucional</p>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Nombre</Label>
                <Input value={newAccount.firstName} onChange={(e) => setNewAccount(p => ({ ...p, firstName: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Apellido</Label>
                <Input value={newAccount.lastName} onChange={(e) => setNewAccount(p => ({ ...p, lastName: e.target.value }))} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cédula de Identidad</Label>
              <Input value={newAccount.ci} onChange={(e) => setNewAccount(p => ({ ...p, ci: e.target.value }))} placeholder="Ej: 5845123" />
              <p className="text-xs text-muted-foreground">El email será: {newAccount.ci || 'cedula'}@cpcc.com · Contraseña: {newAccount.ci || 'cedula'}cpcc</p>
            </div>
            <div className="space-y-2">
              <Label>Rol</Label>
              <Select value={newAccount.role} onValueChange={(v) => setNewAccount(p => ({ ...p, role: v }))}>
                <SelectTrigger><SelectValue placeholder="Seleccionar rol" /></SelectTrigger>
                <SelectContent className="z-[200]">
                  <SelectItem value="alumno">Alumno</SelectItem>
                  <SelectItem value="docente">Profesor</SelectItem>
                  <SelectItem value="coordinador">Coordinador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {newAccount.role === 'alumno' && (
              <div className="space-y-2">
                <Label>Curso</Label>
                <Select value={newAccount.grade} onValueChange={(v) => setNewAccount(p => ({ ...p, grade: v }))}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar curso" /></SelectTrigger>
                  <SelectContent className="z-[200]">
                    <SelectItem value="1° Año">1° Año</SelectItem>
                    <SelectItem value="2° Año">2° Año</SelectItem>
                    <SelectItem value="3° Año">3° Año</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancelar</Button>
            <Button onClick={handleCreateAccount} disabled={!newAccount.firstName || !newAccount.lastName || !newAccount.ci || !newAccount.role}>
              Crear Cuenta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestionCuentas;

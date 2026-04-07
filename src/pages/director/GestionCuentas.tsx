import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Users, BookOpen, GraduationCap, Trash2, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/lib/types';

interface Account {
  id: string;
  firstName: string;
  lastName: string;
  ci: string;
  email: string;
  role: 'coordinador' | 'docente' | 'alumno';
  grade?: string;
  status: 'activo' | 'inactivo';
}

const GestionCuentas = () => {
  const { toast } = useToast();

  const [accounts, setAccounts] = useState<Account[]>([
    { id: 'a1', firstName: 'Carlos', lastName: 'Mendoza González', ci: '5845123', email: '5845123@cpcc.com', role: 'alumno', grade: '1° Año', status: 'activo' },
    { id: 'a2', firstName: 'María', lastName: 'Flores Benítez', ci: '5845124', email: '5845124@cpcc.com', role: 'alumno', grade: '1° Año', status: 'activo' },
    { id: 'a3', firstName: 'Juan', lastName: 'García Villalba', ci: '5845125', email: '5845125@cpcc.com', role: 'alumno', grade: '2° Año', status: 'activo' },
    { id: 'a4', firstName: 'Roberto', lastName: 'Vargas Medina', ci: '2567891', email: '2567891@cpcc.com', role: 'docente', status: 'activo' },
    { id: 'a5', firstName: 'Carmen', lastName: 'López Insfrán', ci: '2567892', email: '2567892@cpcc.com', role: 'docente', status: 'activo' },
    { id: 'a6', firstName: 'Miguel', lastName: 'Torres Cabrera', ci: '2567893', email: '2567893@cpcc.com', role: 'coordinador', status: 'activo' },
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAccount, setNewAccount] = useState({
    firstName: '', lastName: '', ci: '', role: '' as string, grade: '',
  });

  const createAccount = () => {
    if (!newAccount.firstName || !newAccount.lastName || !newAccount.ci || !newAccount.role) return;
    const email = `${newAccount.ci}@cpcc.com`;
    const account: Account = {
      id: `a-${Date.now()}`,
      firstName: newAccount.firstName,
      lastName: newAccount.lastName,
      ci: newAccount.ci,
      email,
      role: newAccount.role as Account['role'],
      grade: newAccount.role === 'alumno' ? newAccount.grade : undefined,
      status: 'activo',
    };
    setAccounts(prev => [...prev, account]);
    setNewAccount({ firstName: '', lastName: '', ci: '', role: '', grade: '' });
    setShowCreateDialog(false);
    toast({
      title: 'Cuenta creada',
      description: `${account.firstName} ${account.lastName} — Email: ${email} — Contraseña: ${newAccount.ci}cpcc`,
    });
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(a => a.id !== id));
    toast({ title: 'Cuenta eliminada' });
  };

  const toggleStatus = (id: string) => {
    setAccounts(prev => prev.map(a =>
      a.id === id ? { ...a, status: a.status === 'activo' ? 'inactivo' : 'activo' } : a
    ));
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
                    <Button variant="ghost" size="sm" onClick={() => toggleStatus(account.id)}>
                      {account.status === 'activo' ? 'Desactivar' : 'Activar'}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteAccount(account.id)}>
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
                <SelectContent>
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
                  <SelectContent>
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
            <Button onClick={createAccount} disabled={!newAccount.firstName || !newAccount.lastName || !newAccount.ci || !newAccount.role}>
              Crear Cuenta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestionCuentas;

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Users, BookOpen, GraduationCap, Trash2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccountsStore, Account } from '@/lib/accounts-store';
import { toPascalCase } from '@/lib/utils';

const GestionCuentas = () => {
  const { toast } = useToast();
  const { accounts, loading, fetchAccounts, createAccount, updateAccount, deleteAccount: removeAccount } = useAccountsStore();

  useEffect(() => { fetchAccounts(true); }, []);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('alumno');
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('Todos');
  const [newAccount, setNewAccount] = useState({
    firstName: '', lastName: '', ci: '', role: '' as string, grade: '',
  });

  const handleCreateAccount = async () => {
    if (!newAccount.firstName || !newAccount.lastName || !newAccount.ci || !newAccount.role) return;
    if (newAccount.role === 'alumno' && !newAccount.grade) {
      toast({ title: 'Error', description: 'Debés seleccionar el curso del alumno.', variant: 'destructive' });
      return;
    }
    const email = `${newAccount.ci}@cpcc.com`;
    
    // Check if CI already exists (normalizing dots)
    const normalizedNewCI = newAccount.ci.replace(/\./g, '');
    const existing = accounts.find(a => a.ci.replace(/\./g, '') === normalizedNewCI);
    
    if (existing) {
      toast({ title: 'Error', description: 'Ya existe una cuenta con esa cédula', variant: 'destructive' });
      return;
    }

    const formattedFirstName = newAccount.firstName.trim();
    const formattedLastName = newAccount.lastName.trim();

    try {
      await createAccount({
        firstName: formattedFirstName,
        lastName: formattedLastName,
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
        description: `${formattedFirstName} ${formattedLastName} — Email: ${email} — Contraseña: ${newAccount.ci}cpcc`,
      });
    } catch {
      toast({ title: 'Error', description: 'No se pudo crear la cuenta', variant: 'destructive' });
    }
  };



  const handleToggleStatus = async (account: Account) => {
    const action = account.status === 'activo' ? 'desactivar' : 'activar';
    if (!confirm(`¿Estás seguro que deseas ${action} la cuenta de ${account.firstName} ${account.lastName}?`)) return;
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
      case 'administrador': return 'Administrador';
      case 'coordinador': return 'Coordinador';
      case 'docente': return 'Profesor';
      case 'alumno': return 'Alumno';
      default: return role;
    }
  };

  const roleIcon = (role: string) => {
    switch (role) {
      case 'administrador': return <Shield className="h-4 w-4" />;
      case 'coordinador': return <Users className="h-4 w-4" />;
      case 'docente': return <BookOpen className="h-4 w-4" />;
      case 'alumno': return <GraduationCap className="h-4 w-4" />;
      default: return null;
    }
  };

  const normalizeString = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filterByView = (view: string) => {
    return accounts
      .filter(a => {
        if (view === 'egresado') return a.status === 'egresado';
        if (view === 'alumno') return a.role === 'alumno' && a.status !== 'egresado';
        return a.role === view;
      })
      .filter(a => {
        if ((view === 'alumno' || view === 'egresado') && gradeFilter !== 'Todos' && a.grade !== gradeFilter) return false;
        if (!searchTerm) return true;
        const term = normalizeString(searchTerm);
        return normalizeString(a.firstName).includes(term) ||
               normalizeString(a.lastName).includes(term) ||
               a.ci.includes(term);
      })
      .sort((a, b) => a.lastName.localeCompare(b.lastName));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserPlus className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Gestión de Cuentas</h2>
            <p className="text-sm text-muted-foreground">Administración de usuarios: Administradores, Coordinadores, Profesores y Alumnos</p>
          </div>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <UserPlus className="h-4 w-4 mr-2" /> Crear Cuenta
        </Button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <Input
          placeholder="Buscar cuenta por nombre, apellido o cédula..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
        {(activeTab === 'alumno' || activeTab === 'egresado') && (
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-48"><SelectValue placeholder="Filtrar curso" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos los Cursos</SelectItem>
              <SelectItem value="1° Año">1° Año</SelectItem>
              <SelectItem value="2° Año">2° Año</SelectItem>
              <SelectItem value="3° Año">3° Año</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>

      {loading && <p className="text-center text-muted-foreground py-8">Cargando cuentas...</p>}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 flex-wrap h-auto">
          <TabsTrigger value="alumno" className="py-2">
            <GraduationCap className="h-4 w-4 mr-1" /> Alumnos ({filterByView('alumno').length})
          </TabsTrigger>
          <TabsTrigger value="docente" className="py-2">
            <BookOpen className="h-4 w-4 mr-1" /> Profesores ({filterByView('docente').length})
          </TabsTrigger>
          <TabsTrigger value="coordinador" className="py-2">
            <Users className="h-4 w-4 mr-1" /> Coordinadores ({filterByView('coordinador').length})
          </TabsTrigger>
          <TabsTrigger value="administrador" className="py-2">
            <Shield className="h-4 w-4 mr-1" /> Administradores ({filterByView('administrador').length})
          </TabsTrigger>
          <TabsTrigger value="egresado" className="py-2">
            <GraduationCap className="h-4 w-4 mr-1 text-yellow-600" /> Egresados ({filterByView('egresado').length})
          </TabsTrigger>
        </TabsList>

        {['alumno', 'docente', 'coordinador', 'administrador', 'egresado'].map(view => (
          <TabsContent key={view} value={view} className="space-y-3">
            {filterByView(view).map(account => (
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
                    <Badge variant={account.status === 'activo' ? 'default' : account.status === 'egresado' ? 'outline' : 'secondary'} className={account.status === 'egresado' ? 'border-yellow-500 text-yellow-700' : ''}>
                      {account.status}
                    </Badge>
                    {account.status !== 'egresado' && (
                      <Button variant="ghost" size="sm" onClick={() => handleToggleStatus(account)}>
                        {account.status === 'activo' ? 'Desactivar' : 'Activar'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {filterByView(view).length === 0 && (
              <p className="text-center text-muted-foreground py-8">No hay cuentas aquí.</p>
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
                <Input value={newAccount.firstName} onChange={(e) => setNewAccount(p => ({ ...p, firstName: e.target.value.toUpperCase() }))} />
              </div>
              <div className="space-y-2">
                <Label>Apellido</Label>
                <Input value={newAccount.lastName} onChange={(e) => setNewAccount(p => ({ ...p, lastName: e.target.value.toUpperCase() }))} />
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
                  <SelectItem value="administrador">Administrador</SelectItem>
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
            <Button onClick={handleCreateAccount} disabled={!newAccount.firstName || !newAccount.lastName || !newAccount.ci || !newAccount.role || (newAccount.role === 'alumno' && !newAccount.grade)}>
              Crear Cuenta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestionCuentas;

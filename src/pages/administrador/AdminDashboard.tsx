import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Layers, FolderOpen, UserPlus, Shield, ClipboardCheck, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Panel del Administrador</h2>
          <p className="text-sm text-muted-foreground">Colegio Politécnico CPCC — Nivel Medio</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Planillas Mensuales</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Crear, editar, eliminar y enviar planillas de puntaje mensual.
            </p>
            <Link to="/administrador/planillas">
              <Button className="w-full">Ir a Planillas</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <ClipboardCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Revisar Planillas</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Aprobar o rechazar planillas enviadas por los profesores.
            </p>
            <Link to="/administrador/revisar">
              <Button className="w-full">Revisar Planillas</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Gestión de Cursos</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Crear cursos y asignar cuentas a los cursos.
            </p>
            <Link to="/administrador/cursos">
              <Button className="w-full">Gestionar Cursos</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Gestión de Cuentas</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Crear cuentas de Coordinadores, Profesores y Alumnos.
            </p>
            <Link to="/administrador/cuentas">
              <Button className="w-full">Gestionar Cuentas</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useState } from 'react';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { RefreshCw, Trash2, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccountsStore } from '@/lib/accounts-store';
import { useCoursesStore } from '@/lib/courses-store';
import { usePlanillasStore } from '@/lib/planillas-store';

const DatabaseSeeder = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { fetchAccounts } = useAccountsStore();
  const { fetchCourses } = useCoursesStore();
  const { fetchPlanillas } = usePlanillasStore();

  const clearDatabase = async () => {
    setLoading(true);
    try {
      const collections = ['users', 'courses', 'planillas'];
      for (const colName of collections) {
        const snapshot = await getDocs(collection(db, colName));
        const batch = writeBatch(db);
        snapshot.docs.forEach((d) => {
          batch.delete(d.ref);
        });
        await batch.commit();
      }
      toast({ title: 'Base de datos limpia', description: 'Todos los documentos fueron eliminados.' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error al limpiar', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const seedDatabase = async () => {
    setLoading(true);
    try {
      const batch = writeBatch(db);

      // 1. Accounts
      const users = [
        { id: 'admin1', firstName: 'ADMIN', lastName: 'SISTEMA', ci: '11111', email: '11111@cpcc.com', role: 'administrador', status: 'activo' },
        { id: 'coord1', firstName: 'JUAN', lastName: 'COORDINADOR', ci: '22222', email: '22222@cpcc.com', role: 'coordinador', status: 'activo' },
        { id: 'prof1', firstName: 'MARIA', lastName: 'DOCENTE', ci: '33333', email: '33333@cpcc.com', role: 'docente', status: 'activo' },
        { id: 'prof2', firstName: 'PEDRO', lastName: 'PROFESOR', ci: '44444', email: '44444@cpcc.com', role: 'docente', status: 'activo' },
        { id: 'alum1', firstName: 'ANA', lastName: 'ALUMNA', ci: '55555', email: '55555@cpcc.com', role: 'alumno', grade: '3° Año', status: 'activo' },
        { id: 'alum2', firstName: 'LUIS', lastName: 'ESTUDIANTE', ci: '66666', email: '66666@cpcc.com', role: 'alumno', grade: '3° Año', status: 'activo' },
        { id: 'alum3', firstName: 'SOFIA', lastName: 'GARCIA', ci: '77777', email: '77777@cpcc.com', role: 'alumno', grade: '1° Año', status: 'activo' },
        { id: 'alum4', firstName: 'CARLOS', lastName: 'LOPEZ', ci: '88888', email: '88888@cpcc.com', role: 'alumno', grade: '1° Año', status: 'activo' },
      ];

      users.forEach(u => {
        const ref = doc(db, 'users', u.id);
        batch.set(ref, { ...u, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      });

      // 2. Courses
      const courses = [
        {
          id: 'course1',
          name: '3er Año - Sección A',
          grade: '3° Año',
          year: 2026,
          coordinatorId: 'coord1',
          students: ['alum1', 'alum2'],
          teachers: ['prof1'],
          subjects: ['Matemática'],
          teacherAssignments: [
            { id: 'assign1', teacherId: 'prof1', subjectName: 'Matemática' }
          ]
        },
        {
          id: 'course2',
          name: '1er Año - Sección B',
          grade: '1° Año',
          year: 2026,
          coordinatorId: 'coord1',
          students: ['alum3', 'alum4'],
          teachers: ['prof2'],
          subjects: ['Lengua Castellana'],
          teacherAssignments: [
            { id: 'assign2', teacherId: 'prof2', subjectName: 'Lengua Castellana' }
          ]
        }
      ];

      courses.forEach(c => {
        const ref = doc(db, 'courses', c.id);
        batch.set(ref, { ...c, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      });

      // 3. Planillas
      const planillaId = 'plan1';
      const planilla = {
        id: planillaId,
        subjectId: 'assign1',
        subjectName: 'Matemática',
        courseId: 'course1',
        courseName: '3er Año - Sección A',
        teacherId: 'prof1',
        teacherName: 'DOCENTE, MARIA',
        grade: '3° Año',
        month: 4,
        year: 2026,
        etapa: 1,
        status: 'aprobado',
        approvedDate: new Date().toISOString(),
        tasks: [
          { id: 't1', name: 'Trabajo Práctico', maxPoints: 5 },
          { id: 't2', name: 'Examen', maxPoints: 30 }
        ],
        scores: [
          { studentId: 'alum1', scores: { 't1': 5, 't2': 28 } },
          { studentId: 'alum2', scores: { 't1': 4, 't2': 25 } }
        ],
        claims: [
          {
            id: 'claim1',
            studentId: 'alum1',
            studentMessage: 'Profe, creo que me merecía un 30 en el examen.',
            studentDate: new Date().toISOString(),
            resolved: false
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      batch.set(doc(db, 'planillas', planillaId), planilla);

      await batch.commit();
      
      // Refresh local state
      await fetchAccounts(true);
      await fetchCourses(true);
      await fetchPlanillas(true);

      toast({ title: 'Datos implantados', description: 'Cuentas: admin(11111), coord(22222), prof(33333), alum(55555). Pass: CI + cpcc' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error al implantar datos', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <Button 
        variant="destructive" 
        size="sm" 
        onClick={clearDatabase} 
        disabled={loading}
        className="shadow-lg"
      >
        <Trash2 className="h-4 w-4 mr-2" /> Borrar DB
      </Button>
      <Button 
        variant="default" 
        size="sm" 
        onClick={seedDatabase} 
        disabled={loading}
        className="shadow-lg bg-green-600 hover:bg-green-700"
      >
        <Database className="h-4 w-4 mr-2" /> Inyectar Seed
      </Button>
      {loading && <RefreshCw className="h-4 w-4 animate-spin self-center text-primary" />}
    </div>
  );
};

export default DatabaseSeeder;

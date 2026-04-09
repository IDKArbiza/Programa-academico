import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { FolderOpen, Plus, Users, BookOpen, Trash2, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAccountsStore } from '@/lib/accounts-store';
import { useCoursesStore } from '@/lib/courses-store';

const GestionCursos = () => {
  const { toast } = useToast();
  const { accounts, fetchAccounts } = useAccountsStore();
  const { courses, loading, fetchCourses, createCourse, updateCourse, deleteCourse: removeCourse } = useCoursesStore();

  useEffect(() => {
    fetchAccounts();
    fetchCourses();
  }, []);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseGrade, setNewCourseGrade] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [assignType, setAssignType] = useState<'student' | 'teacher'>('student');
  const [selectedAccountId, setSelectedAccountId] = useState('');

  const students = accounts.filter(a => a.role === 'alumno' && a.status === 'activo');
  const teachers = accounts.filter(a => (a.role === 'docente' || a.role === 'coordinador' || a.role === 'director') && a.status === 'activo');

  const handleCreateCourse = async () => {
    if (!newCourseName.trim() || !newCourseGrade) return;
    try {
      await createCourse({
        name: newCourseName.trim(),
        grade: newCourseGrade,
        year: 2026,
        students: [],
        teachers: [],
        subjects: [],
      });
      setNewCourseName('');
      setNewCourseGrade('');
      setShowCreateDialog(false);
      toast({ title: 'Curso creado', description: `${newCourseName.trim()} fue creado exitosamente.` });
    } catch {
      toast({ title: 'Error', description: 'No se pudo crear el curso', variant: 'destructive' });
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await removeCourse(courseId);
      toast({ title: 'Curso eliminado' });
    } catch {
      toast({ title: 'Error', variant: 'destructive' });
    }
  };

  const openAssignDialog = (course: typeof courses[0], type: 'student' | 'teacher') => {
    setSelectedCourse(course);
    setAssignType(type);
    setSelectedAccountId('');
    setShowAssignDialog(true);
  };

  const assignAccount = async () => {
    if (!selectedCourse || !selectedAccountId) return;
    const key = assignType === 'student' ? 'students' : 'teachers';
    if (selectedCourse[key].includes(selectedAccountId)) return;
    
    try {
      await updateCourse(selectedCourse.id, {
        [key]: [...selectedCourse[key], selectedAccountId],
      });
      setShowAssignDialog(false);
      toast({ title: `${assignType === 'student' ? 'Alumno' : 'Profesor'} asignado al curso` });
    } catch {
      toast({ title: 'Error', variant: 'destructive' });
    }
  };

  const removeFromCourse = async (courseId: string, accountId: string, type: 'student' | 'teacher') => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    const key = type === 'student' ? 'students' : 'teachers';
    try {
      await updateCourse(courseId, {
        [key]: course[key].filter(id => id !== accountId),
      });
    } catch {
      toast({ title: 'Error', variant: 'destructive' });
    }
  };

  const getAccountName = (id: string) => {
    const a = accounts.find(acc => acc.id === id);
    return a ? `${a.lastName}, ${a.firstName}` : id;
  };

  const availableStudents = selectedCourse
    ? students.filter(s => !selectedCourse.students.includes(s.id))
    : [];

  const availableTeachers = selectedCourse
    ? teachers.filter(t => !selectedCourse.teachers.includes(t.id))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderOpen className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">Gestión de Cursos</h2>
            <p className="text-sm text-muted-foreground">Crear cursos y asignar cuentas</p>
          </div>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" /> Crear Curso
        </Button>
      </div>

      {loading && <p className="text-center text-muted-foreground py-8">Cargando cursos...</p>}

      <div className="grid gap-4">
        {courses.map(course => (
          <Card key={course.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="secondary">{course.grade}</Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteCourse(course.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Alumnos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Users className="h-4 w-4" /> Alumnos ({course.students.length})
                  </span>
                  <Button variant="outline" size="sm" onClick={() => openAssignDialog(course, 'student')}>
                    <UserPlus className="h-3 w-3 mr-1" /> Añadir
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.students.map(sid => (
                    <Badge key={sid} variant="outline" className="gap-1">
                      {getAccountName(sid)}
                      <button onClick={() => removeFromCourse(course.id, sid, 'student')} className="hover:text-destructive ml-1">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {course.students.length === 0 && (
                    <span className="text-xs text-muted-foreground italic">Sin alumnos asignados</span>
                  )}
                </div>
              </div>

              {/* Profesores */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <BookOpen className="h-4 w-4" /> Profesores ({course.teachers.length})
                  </span>
                  <Button variant="outline" size="sm" onClick={() => openAssignDialog(course, 'teacher')}>
                    <UserPlus className="h-3 w-3 mr-1" /> Añadir
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.teachers.map(tid => (
                    <Badge key={tid} variant="outline" className="gap-1">
                      {getAccountName(tid)}
                      <button onClick={() => removeFromCourse(course.id, tid, 'teacher')} className="hover:text-destructive ml-1">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {course.teachers.length === 0 && (
                    <span className="text-xs text-muted-foreground italic">Sin profesores asignados</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {!loading && courses.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No hay cursos creados aún.</p>
        )}
      </div>

      {/* Create Course Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Nuevo Curso</DialogTitle>
            <p className="text-sm text-muted-foreground">Definí el nombre y el año del curso</p>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre del Curso</Label>
              <Input
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Ej: 1° Año - Bachillerato Técnico en Informática"
              />
            </div>
            <div className="space-y-2">
              <Label>Curso (Año)</Label>
              <Select value={newCourseGrade} onValueChange={setNewCourseGrade}>
                <SelectTrigger><SelectValue placeholder="Seleccionar curso" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1° Año">1° Año</SelectItem>
                  <SelectItem value="2° Año">2° Año</SelectItem>
                  <SelectItem value="3° Año">3° Año</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancelar</Button>
            <Button onClick={handleCreateCourse} disabled={!newCourseName.trim() || !newCourseGrade}>Crear</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Account Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Añadir {assignType === 'student' ? 'Alumno' : 'Profesor'} al Curso
            </DialogTitle>
            <p className="text-sm text-muted-foreground">Seleccioná la cuenta a asignar</p>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{assignType === 'student' ? 'Alumno' : 'Profesor'}</Label>
              <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                <SelectContent>
                  {assignType === 'student'
                    ? availableStudents.map(s => (
                        <SelectItem key={s.id} value={s.id}>{s.lastName}, {s.firstName}</SelectItem>
                      ))
                    : availableTeachers.map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.lastName}, {t.firstName}</SelectItem>
                      ))
                  }
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignDialog(false)}>Cancelar</Button>
            <Button onClick={assignAccount} disabled={!selectedAccountId}>Añadir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GestionCursos;

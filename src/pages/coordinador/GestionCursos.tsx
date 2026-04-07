import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { FolderOpen, Plus, Users, BookOpen, Trash2, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockStudents, mockTeachers, mockSubjects } from '@/lib/mock-data';

interface Course {
  id: string;
  name: string;
  grade: string;
  year: number;
  students: string[];
  teachers: string[];
  subjects: string[];
}

const GestionCursos = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 'c1',
      name: '1° Año - Bachillerato Técnico en Informática',
      grade: '1° Año',
      year: 2026,
      students: ['s1', 's2'],
      teachers: ['t1', 't2'],
      subjects: ['sub14', 'sub15', 'sub16'],
    },
    {
      id: 'c2',
      name: '2° Año - Bachillerato Técnico en Informática',
      grade: '2° Año',
      year: 2026,
      students: ['s3', 's4'],
      teachers: ['t1', 't3', 't4'],
      subjects: ['sub17', 'sub18', 'sub19'],
    },
    {
      id: 'c3',
      name: '3° Año - Bachillerato Técnico en Informática',
      grade: '3° Año',
      year: 2026,
      students: ['s5', 's6'],
      teachers: ['t1', 't2', 't3', 't4'],
      subjects: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10', 'sub11', 'sub12', 'sub13'],
    },
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseGrade, setNewCourseGrade] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [assignType, setAssignType] = useState<'student' | 'teacher'>('student');
  const [selectedAccountId, setSelectedAccountId] = useState('');

  const createCourse = () => {
    if (!newCourseName.trim() || !newCourseGrade) return;
    const newCourse: Course = {
      id: `c-${Date.now()}`,
      name: newCourseName.trim(),
      grade: newCourseGrade,
      year: 2026,
      students: [],
      teachers: [],
      subjects: [],
    };
    setCourses(prev => [...prev, newCourse]);
    setNewCourseName('');
    setNewCourseGrade('');
    setShowCreateDialog(false);
    toast({ title: 'Curso creado', description: `${newCourse.name} fue creado exitosamente.` });
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    toast({ title: 'Curso eliminado' });
  };

  const openAssignDialog = (course: Course, type: 'student' | 'teacher') => {
    setSelectedCourse(course);
    setAssignType(type);
    setSelectedAccountId('');
    setShowAssignDialog(true);
  };

  const assignAccount = () => {
    if (!selectedCourse || !selectedAccountId) return;
    setCourses(prev => prev.map(c => {
      if (c.id !== selectedCourse.id) return c;
      const key = assignType === 'student' ? 'students' : 'teachers';
      if (c[key].includes(selectedAccountId)) return c;
      return { ...c, [key]: [...c[key], selectedAccountId] };
    }));
    setShowAssignDialog(false);
    toast({ title: `${assignType === 'student' ? 'Alumno' : 'Profesor'} asignado al curso` });
  };

  const removeFromCourse = (courseId: string, accountId: string, type: 'student' | 'teacher') => {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const key = type === 'student' ? 'students' : 'teachers';
      return { ...c, [key]: c[key].filter(id => id !== accountId) };
    }));
  };

  const getStudentName = (id: string) => {
    const s = mockStudents.find(st => st.id === id);
    return s ? `${s.lastName}, ${s.firstName}` : id;
  };

  const getTeacherName = (id: string) => {
    const t = mockTeachers.find(te => te.id === id);
    return t ? `${t.lastName}, ${t.firstName}` : id;
  };

  const availableStudents = selectedCourse
    ? mockStudents.filter(s => !selectedCourse.students.includes(s.id))
    : [];

  const availableTeachers = selectedCourse
    ? mockTeachers.filter(t => !selectedCourse.teachers.includes(t.id))
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

      <div className="grid gap-4">
        {courses.map(course => (
          <Card key={course.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="secondary">{course.grade}</Badge>
                  <Button variant="ghost" size="icon" onClick={() => deleteCourse(course.id)}>
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
                      {getStudentName(sid)}
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
                      {getTeacherName(tid)}
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
            <Button onClick={createCourse} disabled={!newCourseName.trim() || !newCourseGrade}>Crear</Button>
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

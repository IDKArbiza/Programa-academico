import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ALL_MONTHS } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Save, Send, Layers, Plus, Trash2, Edit2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { usePlanillasStore, TaskRow, Planilla } from '@/lib/planillas-store';
import { useAppStore } from '@/lib/store';
import { useAccountsStore } from '@/lib/accounts-store';
import { useCoursesStore } from '@/lib/courses-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PlanillaMensual = () => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { currentRole, user } = useAppStore();
  const { planillas, loading, fetchPlanillas, savePlanilla, updatePlanilla, deletePlanilla } = usePlanillasStore();
  const { accounts, fetchAccounts } = useAccountsStore();
  const { courses, fetchCourses } = useCoursesStore();

  const TEACHER_ID = user?.id || '';
  const teacherName = user?.name || 'Profesor';

  useEffect(() => {
    fetchPlanillas(true);
    fetchAccounts(true);
    fetchCourses(true);
  }, []);

  const teacherSubjects = courses.flatMap(course => {
    const teacherAssignments = course.teacherAssignments || [];

    if (teacherAssignments.length > 0) {
      return teacherAssignments
        .filter(assignment => assignment.teacherId === TEACHER_ID)
        .map(assignment => ({
          subjectId: assignment.id,
          courseId: course.id,
          name: assignment.subjectName,
          courseName: course.name,
          grade: course.grade,
          hoursPerWeek: 4,
        }));
    }

    if (!course.teachers.includes(TEACHER_ID)) {
      return [];
    }

    return [{
      subjectId: course.id,
      courseId: course.id,
      name: course.name,
      courseName: course.name,
      grade: course.grade,
      hoursPerWeek: 4,
    }];
  });

  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('3');
  const [activeTab, setActiveTab] = useState('crear');

  useEffect(() => {
    if (teacherSubjects.length > 0 && !selectedSubjectId) {
      setSelectedSubjectId(teacherSubjects[0].subjectId);
    }
  }, [teacherSubjects.length]);

  const subject = teacherSubjects.find(s => s.subjectId === selectedSubjectId);
  const month = parseInt(selectedMonth);
  const monthName = ALL_MONTHS.find(m => m.month === month)?.name || '';
  const selectedCourse = courses.find(course => course.id === subject?.courseId);
  const courseCoordinatorId = selectedCourse?.coordinatorId;
  const students = selectedCourse
    ? accounts
        .filter(account => selectedCourse.students.includes(account.id) && account.role === 'alumno' && account.status === 'activo')
        .sort((a, b) => a.lastName.localeCompare(b.lastName))
    : [];

  const generateDefaultTasks = (hours: number): TaskRow[] =>
    Array.from({ length: hours }, (_, index) => ({
      id: `task-${index + 1}`,
      name: `Tarea ${index + 1}`,
      maxPoints: 2,
    }));

  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    if (subject) {
      setTasks(generateDefaultTasks(subject.hoursPerWeek || 4));
      setScores({});
    }
  }, [selectedSubjectId]);

  const totalMaxPoints = tasks.reduce((sum, task) => sum + task.maxPoints, 0);

  const getScore = (studentId: string, taskId: string): number => scores[studentId]?.[taskId] || 0;

  const setScore = (studentId: string, taskId: string, value: string, max: number) => {
    const num = parseInt(value);
    const newVal = value === '' ? 0 : (num >= 0 && num <= max ? num : undefined);
    if (newVal === undefined) return;

    setScores(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], [taskId]: newVal },
    }));
  };

  const getStudentTotal = (studentId: string): number =>
    tasks.reduce((sum, task) => sum + getScore(studentId, task.id), 0);

  const addTask = () => {
    setTasks(prev => [...prev, { id: `task-${Date.now()}`, name: `Tarea ${prev.length + 1}`, maxPoints: 2 }]);
  };

  const removeTask = (taskId: string) => {
    if (tasks.length <= 1) return;
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const [editingTask, setEditingTask] = useState<TaskRow | null>(null);
  const [editName, setEditName] = useState('');

  const startEditTask = (task: TaskRow) => {
    setEditingTask(task);
    setEditName(task.name);
  };

  const saveEditTask = () => {
    if (!editingTask || !editName.trim()) return;
    setTasks(prev => prev.map(task => task.id === editingTask.id ? { ...task, name: editName.trim() } : task));
    setEditingTask(null);
  };

  const existingPlanilla = planillas.find(
    planilla => planilla.subjectId === selectedSubjectId && planilla.month === month && planilla.year === 2026 && planilla.teacherId === TEACHER_ID
  );

  const buildPlanillaScores = () => students.map(student => ({
    studentId: student.id,
    scores: scores[student.id] || {},
  }));

  const handleSave = async () => {
    if (!subject || submitting) return;

    setSubmitting(true);
    const planillaScores = buildPlanillaScores();

    try {
      if (existingPlanilla) {
        await updatePlanilla(existingPlanilla.id, {
          tasks,
          scores: planillaScores,
          courseId: subject.courseId,
          courseName: subject.courseName,
          coordinatorId: courseCoordinatorId,
          status: 'borrador',
          rejectionReason: undefined,
        });
      } else {
        await savePlanilla({
          subjectId: subject.subjectId,
          subjectName: subject.name,
          courseId: subject.courseId,
          courseName: subject.courseName,
          teacherId: TEACHER_ID,
          teacherName,
          coordinatorId: courseCoordinatorId,
          grade: subject.grade,
          month,
          year: 2026,
          etapa: month <= 7 ? 1 : 2,
          tasks,
          scores: planillaScores,
          status: 'borrador',
        });
      }

      toast({ title: 'Planilla guardada', description: `Borrador de ${subject.name} - ${monthName} guardado` });
    } catch {
      toast({ title: 'Error', description: 'No se pudo guardar la planilla', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!subject || submitting) return;
    if (!courseCoordinatorId) {
      toast({
        title: 'Falta coordinador',
        description: 'Este curso necesita un coordinador asignado antes de enviar la planilla.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    const planillaScores = buildPlanillaScores();

    try {
      if (existingPlanilla) {
        await updatePlanilla(existingPlanilla.id, {
          tasks,
          scores: planillaScores,
          courseId: subject.courseId,
          courseName: subject.courseName,
          coordinatorId: courseCoordinatorId,
          status: 'enviado',
          submittedDate: new Date().toISOString(),
          rejectionReason: undefined,
        });
      } else {
        await savePlanilla({
          subjectId: subject.subjectId,
          subjectName: subject.name,
          courseId: subject.courseId,
          courseName: subject.courseName,
          teacherId: TEACHER_ID,
          teacherName,
          coordinatorId: courseCoordinatorId,
          grade: subject.grade,
          month,
          year: 2026,
          etapa: month <= 7 ? 1 : 2,
          tasks,
          scores: planillaScores,
          status: 'enviado',
          submittedDate: new Date().toISOString(),
        });
      }

      toast({ title: 'Planilla enviada', description: 'Planilla enviada al Coordinador para aprobación' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo enviar la planilla', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (existingPlanilla) {
      setTasks(existingPlanilla.tasks);
      const scoresMap: Record<string, Record<string, number>> = {};
      existingPlanilla.scores.forEach(score => {
        scoresMap[score.studentId] = score.scores;
      });
      setScores(scoresMap);
    }
  }, [existingPlanilla?.id]);

  const handleDeletePlanilla = async (id: string) => {
    try {
      await deletePlanilla(id);
      toast({ title: 'Planilla eliminada' });
    } catch {
      toast({ title: 'Error', description: 'No se pudo eliminar', variant: 'destructive' });
    }
  };

  const myPlanillas = planillas.filter(planilla => planilla.teacherId === TEACHER_ID);

  const statusBadge = (status: Planilla['status']) => {
    switch (status) {
      case 'borrador':
        return <Badge variant="secondary">Borrador</Badge>;
      case 'enviado':
        return <Badge className="bg-amber-500/20 text-amber-700 border-amber-300">Enviado</Badge>;
      case 'aprobado':
        return <Badge className="bg-green-500/20 text-green-700 border-green-300">Aprobado</Badge>;
      case 'rechazado':
        return <Badge variant="destructive">Rechazado</Badge>;
    }
  };

  if (teacherSubjects.length === 0 && (currentRole === 'docente' || currentRole === 'coordinador' || currentRole === 'director')) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No tenés materias asignadas todavía.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Layers className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Planilla de Informe Mensual</h2>
          <p className="text-sm text-muted-foreground">Colegio Politécnico CPCC - Nivel Medio</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="crear"><Plus className="h-4 w-4 mr-1" /> Crear/Editar</TabsTrigger>
          <TabsTrigger value="mis"><FileText className="h-4 w-4 mr-1" /> Mis Planillas ({myPlanillas.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="crear" className="space-y-6">
          <div className="flex gap-4 flex-wrap">
            <div className="space-y-1">
              <Label>Materia / Curso</Label>
              <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
                <SelectTrigger className="w-72"><SelectValue placeholder="Seleccionar materia" /></SelectTrigger>
                <SelectContent>
                  {teacherSubjects.map(teacherSubject => (
                    <SelectItem key={teacherSubject.subjectId} value={teacherSubject.subjectId}>
                      {teacherSubject.name} - {teacherSubject.courseName} ({teacherSubject.grade})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Mes</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ALL_MONTHS.map(item => (
                    <SelectItem key={item.month} value={String(item.month)}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {existingPlanilla && (
            <div className="bg-accent/50 border border-border rounded-lg p-3 text-sm flex items-center justify-between">
              <span>Esta planilla ya existe - Estado: {statusBadge(existingPlanilla.status)}</span>
              {existingPlanilla.status === 'rechazado' && existingPlanilla.rejectionReason && (
                <span className="text-destructive text-xs">Motivo: {existingPlanilla.rejectionReason}</span>
              )}
            </div>
          )}

          {subject && (
            <>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm">
                <strong>{subject.name}</strong> - {subject.grade}
                <Badge variant="secondary" className="ml-2">TP Máximo: {totalMaxPoints} pts</Badge>
                <span className="text-muted-foreground ml-2">(cada tarea = 2 pts)</span>
                <span className="text-muted-foreground ml-2">- {students.length} alumnos</span>
                {!courseCoordinatorId && (
                  <span className="text-destructive ml-2">- Este curso no tiene coordinador asignado</span>
                )}
              </div>

              {existingPlanilla?.status !== 'enviado' && existingPlanilla?.status !== 'aprobado' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium">Tareas del mes:</span>
                  {tasks.map(task => (
                    <Badge key={task.id} variant="outline" className="gap-1 pr-1">
                      {task.name} ({task.maxPoints}pts)
                      <button onClick={() => startEditTask(task)} className="ml-1 hover:text-primary">
                        <Edit2 className="h-3 w-3" />
                      </button>
                      {tasks.length > 1 && (
                        <button onClick={() => removeTask(task.id)} className="hover:text-destructive">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" onClick={addTask}>
                    <Plus className="h-3 w-3 mr-1" /> Agregar Tarea
                  </Button>
                </div>
              )}

              {students.length === 0 ? (
                <div className="text-center text-muted-foreground py-8 border border-dashed rounded-lg">
                  <p>No hay alumnos asignados a este curso.</p>
                  <p className="text-xs mt-1">El Coordinador debe asignar alumnos desde Gestión de Cursos.</p>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-0 overflow-x-auto">
                    <div className="text-center py-3 border-b border-border px-4">
                      <h3 className="font-bold text-lg">Planilla de Informe Mensual - {subject.name}</h3>
                      <p className="font-semibold text-primary">{monthName} de 2026</p>
                      <p className="text-sm text-muted-foreground">
                        <strong>Curso:</strong> {subject.courseName}
                      </p>
                    </div>

                    <table className="w-full text-xs min-w-[600px]">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-center py-2 px-2 border-r border-border w-10 bg-muted/50">N°</th>
                          <th className="text-left py-2 px-3 border-r border-border min-w-[200px] bg-muted/50">Apellidos y Nombres</th>
                          {tasks.map(task => (
                            <th key={task.id} className="text-center py-2 px-1 border-r border-border bg-muted/50 min-w-[60px]">
                              <div className="text-[10px] leading-tight font-medium">{task.name}</div>
                              <div className="text-[9px] text-muted-foreground">({task.maxPoints}pts)</div>
                            </th>
                          ))}
                          <th className="text-center py-2 px-2 bg-primary/10 min-w-[60px]">
                            <div className="text-[10px] font-bold">TOTAL</div>
                            <div className="text-[9px] text-muted-foreground">/{totalMaxPoints}</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student, index) => {
                          const total = getStudentTotal(student.id);
                          const pct = totalMaxPoints > 0 ? (total / totalMaxPoints) * 100 : 0;

                          return (
                            <tr key={student.id} className="border-b border-border hover:bg-muted/20">
                              <td className="text-center py-1 px-2 border-r border-border text-muted-foreground font-medium">{index + 1}</td>
                              <td className="py-1 px-3 border-r border-border font-medium whitespace-nowrap">
                                {student.lastName}, {student.firstName}
                              </td>
                              {tasks.map(task => (
                                <td key={task.id} className="text-center py-1 px-1 border-r border-border">
                                  <Input
                                    type="number"
                                    min={0}
                                    max={task.maxPoints}
                                    value={getScore(student.id, task.id) || ''}
                                    onChange={(e) => setScore(student.id, task.id, e.target.value, task.maxPoints)}
                                    className="w-12 h-7 mx-auto text-center text-xs font-bold p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    placeholder="-"
                                    disabled={existingPlanilla?.status === 'aprobado' || existingPlanilla?.status === 'enviado'}
                                  />
                                </td>
                              ))}
                              <td className={`text-center py-1 px-2 font-bold text-sm ${
                                pct >= 80 ? 'text-green-600' : pct >= 50 ? 'text-amber-600' : total > 0 ? 'text-red-600' : 'text-muted-foreground'
                              }`}>
                                {total > 0 ? total : '-'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              )}

              {existingPlanilla?.status !== 'aprobado' && existingPlanilla?.status !== 'enviado' && students.length > 0 && (
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleSave} disabled={loading || submitting}>
                    <Save className="h-4 w-4 mr-2" />Guardar Borrador
                  </Button>
                  <Button onClick={handleSubmit} disabled={loading || submitting || !courseCoordinatorId}>
                    <Send className="h-4 w-4 mr-2" />{submitting ? 'Enviando...' : 'Enviar al Coordinador'}
                  </Button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="mis" className="space-y-4">
          {loading && <p className="text-center text-muted-foreground py-8">Cargando planillas...</p>}
          {!loading && myPlanillas.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No tenés planillas guardadas aún.</p>
          )}
          {myPlanillas.map(planilla => {
            const monthLabel = ALL_MONTHS.find(item => item.month === planilla.month)?.name || '';

            return (
              <Card key={planilla.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{planilla.subjectName}</p>
                    <p className="text-xs text-muted-foreground">
                      {planilla.courseName} - {monthLabel} {planilla.year} - {planilla.tasks.length} tareas - {planilla.scores.length} alumnos
                    </p>
                    {planilla.rejectionReason && (
                      <p className="text-xs text-destructive mt-1">Motivo rechazo: {planilla.rejectionReason}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {statusBadge(planilla.status)}
                    {(planilla.status === 'borrador' || planilla.status === 'rechazado') && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedSubjectId(planilla.subjectId);
                            setSelectedMonth(String(planilla.month));
                            setActiveTab('crear');
                          }}
                        >
                          <Edit2 className="h-3 w-3 mr-1" /> Editar
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePlanilla(planilla.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>

      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Editar Tarea</DialogTitle>
            <p className="text-sm text-muted-foreground">Modificá el nombre de la tarea</p>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label>Nombre de la tarea</Label>
              <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingTask(null)}>Cancelar</Button>
            <Button onClick={saveEditTask}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlanillaMensual;

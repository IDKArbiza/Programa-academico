import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockSubjects, mockStudents, ALL_MONTHS } from '@/lib/mock-data';
import { Label } from '@/components/ui/label';
import { Save, Send, Layers, Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const TEACHER_ID = 't1'; // Simulated logged-in teacher

interface TaskRow {
  id: string;
  name: string;
  maxPoints: number; // always 2
}

interface StudentScore {
  studentId: string;
  scores: Record<string, number>; // taskId -> score (0 to maxPoints)
}

const PlanillaMensual = () => {
  const { toast } = useToast();

  // Teacher's subjects
  const teacherSubjects = mockSubjects.filter(s => s.teacherId === TEACHER_ID);
  const [selectedSubjectId, setSelectedSubjectId] = useState(teacherSubjects[0]?.id || '');
  const [selectedMonth, setSelectedMonth] = useState('3');

  const subject = mockSubjects.find(s => s.id === selectedSubjectId);
  const month = parseInt(selectedMonth);
  const monthName = ALL_MONTHS.find(m => m.month === month)?.name || '';

  // Students for this subject's grade
  const students = subject
    ? mockStudents
        .filter(s => s.grade === subject.grade && s.status === 'activo')
        .sort((a, b) => a.lastName.localeCompare(b.lastName))
    : [];

  // Tasks (rows) - dynamic, teacher can add/edit/remove
  // Default: one task per hour of class (hoursPerWeek), each worth 2 points
  const generateDefaultTasks = (hours: number): TaskRow[] => {
    return Array.from({ length: hours }, (_, i) => ({
      id: `task-${i + 1}`,
      name: `Tarea ${i + 1}`,
      maxPoints: 2,
    }));
  };

  const [tasksPerSubject, setTasksPerSubject] = useState<Record<string, Record<string, TaskRow[]>>>({});
  const [scoresPerSubject, setScoresPerSubject] = useState<Record<string, Record<string, StudentScore[]>>>({});

  // Get or initialize tasks for current subject+month
  const getKey = () => `${selectedSubjectId}_${selectedMonth}`;

  const getTasks = (): TaskRow[] => {
    const key = getKey();
    if (tasksPerSubject[selectedSubjectId]?.[selectedMonth]) {
      return tasksPerSubject[selectedSubjectId][selectedMonth];
    }
    // Initialize with defaults
    const defaults = generateDefaultTasks(subject?.hoursPerWeek || 4);
    setTasksPerSubject(prev => ({
      ...prev,
      [selectedSubjectId]: { ...prev[selectedSubjectId], [selectedMonth]: defaults }
    }));
    return defaults;
  };

  const tasks = getTasks();
  const totalMaxPoints = tasks.reduce((sum, t) => sum + t.maxPoints, 0);

  // Scores
  const getScore = (studentId: string, taskId: string): number => {
    const entries = scoresPerSubject[selectedSubjectId]?.[selectedMonth];
    const entry = entries?.find(e => e.studentId === studentId);
    return entry?.scores[taskId] || 0;
  };

  const setScore = (studentId: string, taskId: string, value: string, max: number) => {
    const num = parseInt(value);
    const newVal = value === '' ? 0 : (num >= 0 && num <= max ? num : undefined);
    if (newVal === undefined) return;

    setScoresPerSubject(prev => {
      const subjectScores = prev[selectedSubjectId]?.[selectedMonth] || [];
      const existing = subjectScores.find(e => e.studentId === studentId);
      if (existing) {
        return {
          ...prev,
          [selectedSubjectId]: {
            ...prev[selectedSubjectId],
            [selectedMonth]: subjectScores.map(e =>
              e.studentId === studentId
                ? { ...e, scores: { ...e.scores, [taskId]: newVal } }
                : e
            )
          }
        };
      }
      return {
        ...prev,
        [selectedSubjectId]: {
          ...prev[selectedSubjectId],
          [selectedMonth]: [...subjectScores, { studentId, scores: { [taskId]: newVal } }]
        }
      };
    });
  };

  const getStudentTotal = (studentId: string): number => {
    return tasks.reduce((sum, t) => sum + getScore(studentId, t.id), 0);
  };

  // Add task
  const addTask = () => {
    const newTask: TaskRow = {
      id: `task-${Date.now()}`,
      name: `Tarea ${tasks.length + 1}`,
      maxPoints: 2,
    };
    setTasksPerSubject(prev => ({
      ...prev,
      [selectedSubjectId]: {
        ...prev[selectedSubjectId],
        [selectedMonth]: [...tasks, newTask]
      }
    }));
  };

  // Remove task
  const removeTask = (taskId: string) => {
    if (tasks.length <= 1) return;
    setTasksPerSubject(prev => ({
      ...prev,
      [selectedSubjectId]: {
        ...prev[selectedSubjectId],
        [selectedMonth]: tasks.filter(t => t.id !== taskId)
      }
    }));
  };

  // Edit task name dialog
  const [editingTask, setEditingTask] = useState<TaskRow | null>(null);
  const [editName, setEditName] = useState('');

  const startEditTask = (task: TaskRow) => {
    setEditingTask(task);
    setEditName(task.name);
  };

  const saveEditTask = () => {
    if (!editingTask || !editName.trim()) return;
    setTasksPerSubject(prev => ({
      ...prev,
      [selectedSubjectId]: {
        ...prev[selectedSubjectId],
        [selectedMonth]: tasks.map(t => t.id === editingTask.id ? { ...t, name: editName.trim() } : t)
      }
    }));
    setEditingTask(null);
  };

  const handleSave = () => {
    toast({ title: 'Planilla guardada', description: `Borrador de ${subject?.name} - ${monthName} 2026 guardado` });
  };

  const handleSubmit = () => {
    toast({ title: 'Planilla enviada', description: `Planilla de ${subject?.name} - ${monthName} enviada para aprobación` });
  };

  if (!subject) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No tenés materias asignadas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Layers className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">Planilla de Informe Mensual</h2>
          <p className="text-sm text-muted-foreground">Colegio Politécnico Cooperativa Multiactiva Capiatá Ltda.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="space-y-1">
          <Label>Materia</Label>
          <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId}>
            <SelectTrigger className="w-72"><SelectValue /></SelectTrigger>
            <SelectContent>
              {teacherSubjects.map(s => (
                <SelectItem key={s.id} value={s.id}>
                  {s.name} ({s.grade})
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
              {ALL_MONTHS.map(m => (
                <SelectItem key={m.month} value={String(m.month)}>{m.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm">
        <strong>{subject.name}</strong> — {subject.grade} · {subject.hoursPerWeek} hs/semana · 
        <Badge variant="secondary" className="ml-2">TP Máximo: {totalMaxPoints} pts</Badge>
        <span className="text-muted-foreground ml-2">(cada tarea = 2 pts)</span>
      </div>

      {/* Task management */}
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

      {/* Grade table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <div className="text-center py-3 border-b border-border px-4">
            <h3 className="font-bold text-lg">Planilla de Informe Mensual — {subject.name}</h3>
            <p className="font-semibold text-primary">{monthName} de 2026</p>
            <p className="text-sm text-muted-foreground">
              <strong>Curso:</strong> {subject.grade} Bachillerato Técnico en Informática
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
              {students.map((student, idx) => {
                const total = getStudentTotal(student.id);
                const pct = totalMaxPoints > 0 ? (total / totalMaxPoints) * 100 : 0;
                return (
                  <tr key={student.id} className="border-b border-border hover:bg-muted/20">
                    <td className="text-center py-1 px-2 border-r border-border text-muted-foreground font-medium">
                      {idx + 1}
                    </td>
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
                        />
                      </td>
                    ))}
                    <td className={`text-center py-1 px-2 font-bold text-sm ${
                      pct >= 80 ? 'text-success' : pct >= 50 ? 'text-warning' : total > 0 ? 'text-destructive' : 'text-muted-foreground'
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

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />Guardar Borrador
        </Button>
        <Button onClick={handleSubmit}>
          <Send className="h-4 w-4 mr-2" />Enviar Planilla
        </Button>
      </div>

      {/* Edit task dialog */}
      <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Editar Tarea</DialogTitle>
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

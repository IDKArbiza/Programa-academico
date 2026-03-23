import { Student, Teacher, Subject, Grade, EvaluationCriteria, Attendance, Payment, ScheduleEntry, AcademicYear } from './types';

export const mockAcademicYear: AcademicYear = {
  id: '1',
  year: 2026,
  periodType: 'bimestre',
  startDate: '2026-02-02',
  endDate: '2026-12-15',
  status: 'activo',
};

export const mockStudents: Student[] = [
  { id: 's1', firstName: 'Carlos', lastName: 'Mendoza Quispe', dni: '78451236', grade: '4to', section: 'A', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Roberto Mendoza', parentPhone: '987654321', address: 'Av. Principal 123' },
  { id: 's2', firstName: 'María', lastName: 'Flores Torres', dni: '78451237', grade: '4to', section: 'A', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Ana Torres', parentPhone: '987654322', address: 'Jr. Los Olivos 456' },
  { id: 's3', firstName: 'Juan', lastName: 'García López', dni: '78451238', grade: '4to', section: 'A', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Pedro García', parentPhone: '987654323', address: 'Calle Lima 789' },
  { id: 's4', firstName: 'Ana', lastName: 'Rodríguez Sánchez', dni: '78451239', grade: '4to', section: 'B', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Luis Rodríguez', parentPhone: '987654324', address: 'Av. Bolívar 321' },
  { id: 's5', firstName: 'Pedro', lastName: 'Huamán Ramos', dni: '78451240', grade: '5to', section: 'A', enrollmentDate: '2025-02-01', status: 'activo', parentName: 'José Huamán', parentPhone: '987654325', address: 'Jr. Cusco 654' },
  { id: 's6', firstName: 'Lucía', lastName: 'Quispe Mamani', dni: '78451241', grade: '5to', section: 'A', enrollmentDate: '2025-02-01', status: 'activo', parentName: 'Rosa Mamani', parentPhone: '987654326', address: 'Av. Arequipa 987' },
];

export const mockTeachers: Teacher[] = [
  { id: 't1', firstName: 'Roberto', lastName: 'Vargas Medina', dni: '45678901', specialty: 'Informática', phone: '912345678', email: 'rvargas@colegio.edu', subjects: ['sub1', 'sub2'] },
  { id: 't2', firstName: 'Carmen', lastName: 'López Díaz', dni: '45678902', specialty: 'Matemáticas', phone: '912345679', email: 'clopez@colegio.edu', subjects: ['sub3'] },
  { id: 't3', firstName: 'Miguel', lastName: 'Torres Pinto', dni: '45678903', specialty: 'Comunicación', phone: '912345680', email: 'mtorres@colegio.edu', subjects: ['sub4'] },
  { id: 't4', firstName: 'Sandra', lastName: 'Ramos Cruz', dni: '45678904', specialty: 'Ciencias', phone: '912345681', email: 'sramos@colegio.edu', subjects: ['sub5'] },
];

export const mockSubjects: Subject[] = [
  { id: 'sub1', name: 'Programación', grade: '4to', teacherId: 't1', hoursPerWeek: 6 },
  { id: 'sub2', name: 'Base de Datos', grade: '4to', teacherId: 't1', hoursPerWeek: 4 },
  { id: 'sub3', name: 'Matemática', grade: '4to', teacherId: 't2', hoursPerWeek: 5 },
  { id: 'sub4', name: 'Comunicación', grade: '4to', teacherId: 't3', hoursPerWeek: 4 },
  { id: 'sub5', name: 'Ciencia y Tecnología', grade: '4to', teacherId: 't4', hoursPerWeek: 4 },
  { id: 'sub6', name: 'Redes y Conectividad', grade: '5to', teacherId: 't1', hoursPerWeek: 6 },
];

export const mockCriteria: EvaluationCriteria[] = [
  { id: 'c1', name: 'Examen Parcial', weight: 30, subjectId: 'sub1', period: 1, periodType: 'bimestre' },
  { id: 'c2', name: 'Trabajos Prácticos', weight: 25, subjectId: 'sub1', period: 1, periodType: 'bimestre' },
  { id: 'c3', name: 'Participación', weight: 15, subjectId: 'sub1', period: 1, periodType: 'bimestre' },
  { id: 'c4', name: 'Examen Final', weight: 30, subjectId: 'sub1', period: 1, periodType: 'bimestre' },
  { id: 'c5', name: 'Examen Parcial', weight: 30, subjectId: 'sub3', period: 1, periodType: 'bimestre' },
  { id: 'c6', name: 'Ejercicios', weight: 30, subjectId: 'sub3', period: 1, periodType: 'bimestre' },
  { id: 'c7', name: 'Examen Final', weight: 40, subjectId: 'sub3', period: 1, periodType: 'bimestre' },
];

export const mockGrades: Grade[] = [
  { id: 'g1', studentId: 's1', subjectId: 'sub1', period: 1, periodType: 'bimestre', year: 2026, finalGrade: 4, criteriaGrades: [
    { criteriaId: 'c1', criteriaName: 'Examen Parcial', grade: 4, weight: 30 },
    { criteriaId: 'c2', criteriaName: 'Trabajos Prácticos', grade: 5, weight: 25 },
    { criteriaId: 'c3', criteriaName: 'Participación', grade: 4, weight: 15 },
    { criteriaId: 'c4', criteriaName: 'Examen Final', grade: 4, weight: 30 },
  ]},
  { id: 'g2', studentId: 's1', subjectId: 'sub3', period: 1, periodType: 'bimestre', year: 2026, finalGrade: 3, criteriaGrades: [
    { criteriaId: 'c5', criteriaName: 'Examen Parcial', grade: 3, weight: 30 },
    { criteriaId: 'c6', criteriaName: 'Ejercicios', grade: 4, weight: 30 },
    { criteriaId: 'c7', criteriaName: 'Examen Final', grade: 3, weight: 40 },
  ]},
  { id: 'g3', studentId: 's1', subjectId: 'sub4', period: 1, periodType: 'bimestre', year: 2026, finalGrade: 5, criteriaGrades: [] },
  { id: 'g4', studentId: 's1', subjectId: 'sub5', period: 1, periodType: 'bimestre', year: 2026, finalGrade: 4, criteriaGrades: [] },
  { id: 'g5', studentId: 's2', subjectId: 'sub1', period: 1, periodType: 'bimestre', year: 2026, finalGrade: 5, criteriaGrades: [] },
  { id: 'g6', studentId: 's2', subjectId: 'sub3', period: 1, periodType: 'bimestre', year: 2026, finalGrade: 4, criteriaGrades: [] },
  { id: 'g7', studentId: 's3', subjectId: 'sub1', period: 1, periodType: 'bimestre', year: 2026, finalGrade: 2, criteriaGrades: [] },
  { id: 'g8', studentId: 's3', subjectId: 'sub3', period: 1, periodType: 'bimestre', year: 2026, finalGrade: 3, criteriaGrades: [] },
  // Period 2
  { id: 'g9', studentId: 's1', subjectId: 'sub1', period: 2, periodType: 'bimestre', year: 2026, finalGrade: 5, criteriaGrades: [] },
  { id: 'g10', studentId: 's1', subjectId: 'sub3', period: 2, periodType: 'bimestre', year: 2026, finalGrade: 4, criteriaGrades: [] },
];

export const mockAttendance: Attendance[] = [
  { id: 'a1', studentId: 's1', subjectId: 'sub1', date: '2026-03-16', status: 'presente' },
  { id: 'a2', studentId: 's1', subjectId: 'sub1', date: '2026-03-17', status: 'presente' },
  { id: 'a3', studentId: 's1', subjectId: 'sub1', date: '2026-03-18', status: 'tardanza' },
  { id: 'a4', studentId: 's2', subjectId: 'sub1', date: '2026-03-16', status: 'presente' },
  { id: 'a5', studentId: 's2', subjectId: 'sub1', date: '2026-03-17', status: 'ausente' },
  { id: 'a6', studentId: 's3', subjectId: 'sub1', date: '2026-03-16', status: 'presente' },
  { id: 'a7', studentId: 's3', subjectId: 'sub1', date: '2026-03-17', status: 'presente' },
  { id: 'a8', studentId: 's3', subjectId: 'sub1', date: '2026-03-18', status: 'justificado' },
];

export const mockPayments: Payment[] = [
  { id: 'p1', studentId: 's1', concept: 'Pensión Marzo', amount: 350, dueDate: '2026-03-10', paidDate: '2026-03-08', status: 'pagado', month: 3, year: 2026 },
  { id: 'p2', studentId: 's1', concept: 'Pensión Abril', amount: 350, dueDate: '2026-04-10', status: 'pendiente', month: 4, year: 2026 },
  { id: 'p3', studentId: 's1', concept: 'Matrícula', amount: 500, dueDate: '2026-02-01', paidDate: '2026-01-28', status: 'pagado', month: 2, year: 2026 },
  { id: 'p4', studentId: 's2', concept: 'Pensión Marzo', amount: 350, dueDate: '2026-03-10', status: 'vencido', month: 3, year: 2026 },
  { id: 'p5', studentId: 's2', concept: 'Matrícula', amount: 500, dueDate: '2026-02-01', paidDate: '2026-02-01', status: 'pagado', month: 2, year: 2026 },
  { id: 'p6', studentId: 's3', concept: 'Pensión Marzo', amount: 350, dueDate: '2026-03-10', paidDate: '2026-03-10', status: 'pagado', month: 3, year: 2026 },
];

export const mockSchedule: ScheduleEntry[] = [
  { id: 'sch1', subjectId: 'sub1', subjectName: 'Programación', teacherName: 'Prof. Vargas', dayOfWeek: 0, startTime: '08:00', endTime: '09:30', grade: '4to', section: 'A' },
  { id: 'sch2', subjectId: 'sub3', subjectName: 'Matemática', teacherName: 'Prof. López', dayOfWeek: 0, startTime: '09:45', endTime: '11:15', grade: '4to', section: 'A' },
  { id: 'sch3', subjectId: 'sub4', subjectName: 'Comunicación', teacherName: 'Prof. Torres', dayOfWeek: 0, startTime: '11:30', endTime: '13:00', grade: '4to', section: 'A' },
  { id: 'sch4', subjectId: 'sub2', subjectName: 'Base de Datos', teacherName: 'Prof. Vargas', dayOfWeek: 1, startTime: '08:00', endTime: '09:30', grade: '4to', section: 'A' },
  { id: 'sch5', subjectId: 'sub5', subjectName: 'Ciencia y Tecnología', teacherName: 'Prof. Ramos', dayOfWeek: 1, startTime: '09:45', endTime: '11:15', grade: '4to', section: 'A' },
  { id: 'sch6', subjectId: 'sub1', subjectName: 'Programación', teacherName: 'Prof. Vargas', dayOfWeek: 1, startTime: '11:30', endTime: '13:00', grade: '4to', section: 'A' },
  { id: 'sch7', subjectId: 'sub3', subjectName: 'Matemática', teacherName: 'Prof. López', dayOfWeek: 2, startTime: '08:00', endTime: '09:30', grade: '4to', section: 'A' },
  { id: 'sch8', subjectId: 'sub1', subjectName: 'Programación', teacherName: 'Prof. Vargas', dayOfWeek: 2, startTime: '09:45', endTime: '11:15', grade: '4to', section: 'A' },
  { id: 'sch9', subjectId: 'sub4', subjectName: 'Comunicación', teacherName: 'Prof. Torres', dayOfWeek: 3, startTime: '08:00', endTime: '09:30', grade: '4to', section: 'A' },
  { id: 'sch10', subjectId: 'sub2', subjectName: 'Base de Datos', teacherName: 'Prof. Vargas', dayOfWeek: 3, startTime: '09:45', endTime: '11:15', grade: '4to', section: 'A' },
  { id: 'sch11', subjectId: 'sub5', subjectName: 'Ciencia y Tecnología', teacherName: 'Prof. Ramos', dayOfWeek: 4, startTime: '08:00', endTime: '09:30', grade: '4to', section: 'A' },
  { id: 'sch12', subjectId: 'sub3', subjectName: 'Matemática', teacherName: 'Prof. López', dayOfWeek: 4, startTime: '09:45', endTime: '11:15', grade: '4to', section: 'A' },
];

export const DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

export const gradeLabel = (g: number) => {
  switch (g) {
    case 1: return 'Deficiente';
    case 2: return 'Insuficiente';
    case 3: return 'Aceptable';
    case 4: return 'Bueno';
    case 5: return 'Excelente';
    default: return '-';
  }
};

export const gradeColor = (g: number) => {
  if (g >= 4) return 'text-success';
  if (g === 3) return 'text-warning';
  return 'text-destructive';
};

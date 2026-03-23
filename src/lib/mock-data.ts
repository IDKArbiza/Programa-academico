import { Student, Teacher, Subject, Grade, EvaluationCriteria, Attendance, Payment, ScheduleEntry, AcademicYear } from './types';

export const mockAcademicYear: AcademicYear = {
  id: '1',
  year: 2026,
  periodType: 'etapa',
  startDate: '2026-02-02',
  endDate: '2026-12-15',
  status: 'activo',
  etapas: {
    1: { start: '2026-02-02', end: '2026-07-15' },
    2: { start: '2026-07-16', end: '2026-12-15' }
  }
};

export const mockStudents: Student[] = [
  { id: 's1', firstName: 'Carlos', lastName: 'Mendoza Quispe', ci: '78451236', grade: '1° Año', section: 'A', turn: 'mañana', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Roberto Mendoza', parentPhone: '987654321', address: 'Av. Principal 123', city: 'Asunción', department: 'Central', birthDate: '2008-05-15', nationality: 'paraguayo' },
  { id: 's2', firstName: 'María', lastName: 'Flores Torres', ci: '78451237', grade: '1° Año', section: 'A', turn: 'mañana', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Ana Torres', parentPhone: '987654322', address: 'Jr. Los Olivos 456', city: 'Asunción', department: 'Central', birthDate: '2008-08-22', nationality: 'paraguayo' },
  { id: 's3', firstName: 'Juan', lastName: 'García López', ci: '78451238', grade: '2° Año', section: 'A', turn: 'tarde', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Pedro García', parentPhone: '987654323', address: 'Calle Lima 789', city: 'Asunción', department: 'Central', birthDate: '2007-03-10', nationality: 'paraguayo' },
  { id: 's4', firstName: 'Ana', lastName: 'Rodríguez Sánchez', ci: '78451239', grade: '2° Año', section: 'B', turn: 'tarde', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Luis Rodríguez', parentPhone: '987654324', address: 'Av. Bolívar 321', city: 'Asunción', department: 'Central', birthDate: '2007-11-30', nationality: 'paraguayo' },
  { id: 's5', firstName: 'Pedro', lastName: 'Huamán Ramos', ci: '78451240', grade: '3° Año', section: 'A', turn: 'mañana', enrollmentDate: '2025-02-01', status: 'activo', parentName: 'José Huamán', parentPhone: '987654325', address: 'Jr. Cusco 654', city: 'Asunción', department: 'Central', birthDate: '2006-07-18', nationality: 'paraguayo' },
  { id: 's6', firstName: 'Lucía', lastName: 'Quispe Mamani', ci: '78451241', grade: '3° Año', section: 'A', turn: 'mañana', enrollmentDate: '2025-02-01', status: 'activo', parentName: 'Rosa Mamani', parentPhone: '987654326', address: 'Av. Arequipa 987', city: 'Asunción', department: 'Central', birthDate: '2006-02-14', nationality: 'paraguayo' },
];

export const mockTeachers: Teacher[] = [
  { id: 't1', firstName: 'Roberto', lastName: 'Vargas Medina', ci: '45678901', cedula: '4567891', specialty: 'Informática', title: 'Licenciado en Informática', phone: '912345678', email: 'rvargas@colegio.edu', subjects: ['sub1', 'sub2'], hireDate: '2020-03-01', contractType: 'permanente', category: 'Categoría III' },
  { id: 't2', firstName: 'Carmen', lastName: 'López Díaz', ci: '45678902', cedula: '4567892', specialty: 'Matemáticas', title: 'Licenciada en Matemáticas', phone: '912345679', email: 'clopez@colegio.edu', subjects: ['sub3'], hireDate: '2019-02-15', contractType: 'permanente', category: 'Categoría II' },
  { id: 't3', firstName: 'Miguel', lastName: 'Torres Pinto', ci: '45678903', cedula: '4567893', specialty: 'Comunicación', title: 'Profesor de Comunicación', phone: '912345680', email: 'mtorres@colegio.edu', subjects: ['sub4'], hireDate: '2021-07-01', contractType: 'temporal', category: 'Categoría I' },
  { id: 't4', firstName: 'Sandra', lastName: 'Ramos Cruz', ci: '45678904', cedula: '4567894', specialty: 'Ciencias', title: 'Licenciada en Ciencias', phone: '912345681', email: 'sramos@colegio.edu', subjects: ['sub5'], hireDate: '2020-08-20', contractType: 'permanente', category: 'Categoría III' },
];

export const mockSubjects: Subject[] = [
  { id: 'sub1', name: 'Programación', code: 'PROG101', grade: '1° Año', teacherId: 't1', hoursPerWeek: 6, area: 'tecnica', isMandatory: true },
  { id: 'sub2', name: 'Base de Datos', code: 'BD101', grade: '1° Año', teacherId: 't1', hoursPerWeek: 4, area: 'tecnica', isMandatory: true },
  { id: 'sub3', name: 'Matemática', code: 'MAT101', grade: '1° Año', teacherId: 't2', hoursPerWeek: 5, area: 'matematica', isMandatory: true },
  { id: 'sub4', name: 'Comunicación', code: 'COM101', grade: '2° Año', teacherId: 't3', hoursPerWeek: 4, area: 'lenguaje', isMandatory: true },
  { id: 'sub5', name: 'Ciencia y Tecnología', code: 'CT101', grade: '2° Año', teacherId: 't4', hoursPerWeek: 4, area: 'ciencias', isMandatory: true },
  { id: 'sub6', name: 'Redes y Conectividad', code: 'RED201', grade: '3° Año', teacherId: 't1', hoursPerWeek: 6, area: 'tecnica', isMandatory: true },
];

export const mockCriteria: EvaluationCriteria[] = [
  { id: 'c1', name: 'Examen Parcial', weight: 30, subjectId: 'sub1', etapa: 1, type: 'examen' },
  { id: 'c2', name: 'Trabajos Prácticos', weight: 25, subjectId: 'sub1', etapa: 1, type: 'practico' },
  { id: 'c3', name: 'Participación', weight: 15, subjectId: 'sub1', etapa: 1, type: 'participacion' },
  { id: 'c4', name: 'Examen Final', weight: 30, subjectId: 'sub1', etapa: 1, type: 'examen' },
  { id: 'c5', name: 'Examen Parcial', weight: 30, subjectId: 'sub3', etapa: 1, type: 'examen' },
  { id: 'c6', name: 'Ejercicios', weight: 30, subjectId: 'sub3', etapa: 1, type: 'practico' },
  { id: 'c7', name: 'Examen Final', weight: 40, subjectId: 'sub3', etapa: 1, type: 'examen' },
];

export const mockGrades: Grade[] = [
  { id: 'g1', studentId: 's1', subjectId: 'sub1', etapa: 1, year: 2026, finalGrade: 4, isRecovery: false, criteriaGrades: [
    { criteriaId: 'c1', criteriaName: 'Examen Parcial', grade: 4, weight: 30, date: '2026-03-15' },
    { criteriaId: 'c2', criteriaName: 'Trabajos Prácticos', grade: 5, weight: 25, date: '2026-03-20' },
    { criteriaId: 'c3', criteriaName: 'Participación', grade: 4, weight: 15, date: '2026-04-01' },
    { criteriaId: 'c4', criteriaName: 'Examen Final', grade: 4, weight: 30, date: '2026-04-15' }
  ]},
  { id: 'g2', studentId: 's1', subjectId: 'sub3', etapa: 1, year: 2026, finalGrade: 3, isRecovery: false, criteriaGrades: [
    { criteriaId: 'c5', criteriaName: 'Examen Parcial', grade: 3, weight: 30, date: '2026-03-18' },
    { criteriaId: 'c6', criteriaName: 'Ejercicios', grade: 4, weight: 30, date: '2026-04-05' },
    { criteriaId: 'c7', criteriaName: 'Examen Final', grade: 3, weight: 40, date: '2026-04-18' }
  ]},
  { id: 'g3', studentId: 's2', subjectId: 'sub1', etapa: 1, year: 2026, finalGrade: 5, isRecovery: false, criteriaGrades: [
    { criteriaId: 'c1', criteriaName: 'Examen Parcial', grade: 5, weight: 30, date: '2026-03-15' },
    { criteriaId: 'c2', criteriaName: 'Trabajos Prácticos', grade: 5, weight: 25, date: '2026-03-20' },
    { criteriaId: 'c3', criteriaName: 'Participación', grade: 5, weight: 15, date: '2026-04-01' },
    { criteriaId: 'c4', criteriaName: 'Examen Final', grade: 5, weight: 30, date: '2026-04-15' }
  ]},
  { id: 'g6', studentId: 's2', subjectId: 'sub3', etapa: 1, year: 2026, finalGrade: 4, isRecovery: false, criteriaGrades: [] },
  { id: 'g7', studentId: 's3', subjectId: 'sub1', etapa: 1, year: 2026, finalGrade: 2, isRecovery: false, criteriaGrades: [] },
  { id: 'g8', studentId: 's3', subjectId: 'sub3', etapa: 1, year: 2026, finalGrade: 3, isRecovery: false, criteriaGrades: [] },
  // Period 2
  { id: 'g9', studentId: 's1', subjectId: 'sub1', etapa: 2, year: 2026, finalGrade: 5, isRecovery: false, criteriaGrades: [] },
  { id: 'g10', studentId: 's1', subjectId: 'sub3', etapa: 2, year: 2026, finalGrade: 4, isRecovery: false, criteriaGrades: [] },
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
  { id: 'p1', studentId: 's1', concept: 'Pensión Marzo', amount: 350000, dueDate: '2026-03-10', paidDate: '2026-03-08', status: 'pagado', month: 3, year: 2026, paymentType: 'mensualidad', currency: 'PYG' },
  { id: 'p2', studentId: 's1', concept: 'Pensión Abril', amount: 350000, dueDate: '2026-04-10', status: 'pendiente', month: 4, year: 2026, paymentType: 'mensualidad', currency: 'PYG' },
  { id: 'p3', studentId: 's1', concept: 'Matrícula', amount: 500000, dueDate: '2026-02-01', paidDate: '2026-01-28', status: 'pagado', month: 2, year: 2026, paymentType: 'matricula', currency: 'PYG' },
  { id: 'p4', studentId: 's2', concept: 'Pensión Marzo', amount: 350000, dueDate: '2026-03-10', status: 'vencido', month: 3, year: 2026, paymentType: 'mensualidad', currency: 'PYG' },
  { id: 'p5', studentId: 's2', concept: 'Matrícula', amount: 500000, dueDate: '2026-02-01', paidDate: '2026-02-01', status: 'pagado', month: 2, year: 2026, paymentType: 'matricula', currency: 'PYG' },
  { id: 'p6', studentId: 's3', concept: 'Pensión Marzo', amount: 350000, dueDate: '2026-03-10', paidDate: '2026-03-10', status: 'pagado', month: 3, year: 2026, paymentType: 'mensualidad', currency: 'PYG' },
];

export const mockSchedule: ScheduleEntry[] = [
  { id: 'sch1', subjectId: 'sub1', subjectName: 'Programación', teacherName: 'Prof. Vargas', dayOfWeek: 1, startTime: '08:00', endTime: '09:30', grade: '1° Año', section: 'A', classroom: 'Lab 1', turn: 'mañana' },
  { id: 'sch2', subjectId: 'sub3', subjectName: 'Matemática', teacherName: 'Prof. López', dayOfWeek: 1, startTime: '09:45', endTime: '11:15', grade: '1° Año', section: 'A', classroom: 'Aula 101', turn: 'mañana' },
  { id: 'sch3', subjectId: 'sub4', subjectName: 'Comunicación', teacherName: 'Prof. Torres', dayOfWeek: 1, startTime: '11:30', endTime: '13:00', grade: '2° Año', section: 'A', classroom: 'Aula 201', turn: 'mañana' },
  { id: 'sch4', subjectId: 'sub2', subjectName: 'Base de Datos', teacherName: 'Prof. Vargas', dayOfWeek: 2, startTime: '08:00', endTime: '09:30', grade: '1° Año', section: 'A', classroom: 'Lab 1', turn: 'mañana' },
  { id: 'sch5', subjectId: 'sub5', subjectName: 'Ciencia y Tecnología', teacherName: 'Prof. Ramos', dayOfWeek: 2, startTime: '09:45', endTime: '11:15', grade: '2° Año', section: 'A', classroom: 'Lab 2', turn: 'mañana' },
  { id: 'sch6', subjectId: 'sub1', subjectName: 'Programación', teacherName: 'Prof. Vargas', dayOfWeek: 2, startTime: '11:30', endTime: '13:00', grade: '1° Año', section: 'A', classroom: 'Lab 1', turn: 'mañana' },
  { id: 'sch7', subjectId: 'sub3', subjectName: 'Matemática', teacherName: 'Prof. López', dayOfWeek: 3, startTime: '08:00', endTime: '09:30', grade: '1° Año', section: 'A', classroom: 'Aula 101', turn: 'mañana' },
  { id: 'sch8', subjectId: 'sub1', subjectName: 'Programación', teacherName: 'Prof. Vargas', dayOfWeek: 3, startTime: '09:45', endTime: '11:15', grade: '1° Año', section: 'A', classroom: 'Lab 1', turn: 'mañana' },
  { id: 'sch9', subjectId: 'sub4', subjectName: 'Comunicación', teacherName: 'Prof. Torres', dayOfWeek: 4, startTime: '08:00', endTime: '09:30', grade: '2° Año', section: 'A', classroom: 'Aula 201', turn: 'mañana' },
  { id: 'sch10', subjectId: 'sub2', subjectName: 'Base de Datos', teacherName: 'Prof. Vargas', dayOfWeek: 4, startTime: '09:45', endTime: '11:15', grade: '1° Año', section: 'A', classroom: 'Lab 1', turn: 'mañana' },
  { id: 'sch11', subjectId: 'sub5', subjectName: 'Ciencia y Tecnología', teacherName: 'Prof. Ramos', dayOfWeek: 5, startTime: '08:00', endTime: '09:30', grade: '2° Año', section: 'A', classroom: 'Lab 2', turn: 'mañana' },
  { id: 'sch12', subjectId: 'sub3', subjectName: 'Matemática', teacherName: 'Prof. López', dayOfWeek: 5, startTime: '09:45', endTime: '11:15', grade: '1° Año', section: 'A', classroom: 'Aula 101', turn: 'mañana' },
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

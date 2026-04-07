import { Student, Teacher, Subject, Grade, EvaluationCriteria, Attendance, Payment, ScheduleEntry, AcademicYear, MonthlyGradeSheet, Task } from './types';

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

export const MONTHS_ETAPA_1 = [
  { month: 2, name: 'Febrero' },
  { month: 3, name: 'Marzo' },
  { month: 4, name: 'Abril' },
  { month: 5, name: 'Mayo' },
  { month: 6, name: 'Junio' },
  { month: 7, name: 'Julio' },
];

export const MONTHS_ETAPA_2 = [
  { month: 8, name: 'Agosto' },
  { month: 9, name: 'Septiembre' },
  { month: 10, name: 'Octubre' },
  { month: 11, name: 'Noviembre' },
  { month: 12, name: 'Diciembre' },
];

export const ALL_MONTHS = [
  { month: 2, name: 'Febrero' },
  { month: 3, name: 'Marzo' },
  { month: 4, name: 'Abril' },
  { month: 5, name: 'Mayo' },
  { month: 6, name: 'Junio' },
  { month: 7, name: 'Julio' },
  { month: 8, name: 'Agosto' },
  { month: 9, name: 'Septiembre' },
  { month: 10, name: 'Octubre' },
  { month: 11, name: 'Noviembre' },
  { month: 12, name: 'Diciembre' },
];

export const mockStudents: Student[] = [
  { id: 's1', firstName: 'Carlos', lastName: 'Mendoza González', ci: '5.845.123', grade: '1° Año', turn: 'mañana', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Roberto Mendoza', parentPhone: '0981-234567', address: 'Av. Mariscal López 1234', city: 'Asunción', department: 'Central', birthDate: '2008-05-15', nationality: 'paraguayo' },
  { id: 's2', firstName: 'María', lastName: 'Flores Benítez', ci: '5.845.124', grade: '1° Año', turn: 'mañana', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Ana Benítez', parentPhone: '0982-345678', address: 'Calle Palma 456', city: 'Asunción', department: 'Central', birthDate: '2008-08-22', nationality: 'paraguayo' },
  { id: 's3', firstName: 'Juan', lastName: 'García Villalba', ci: '5.845.125', grade: '2° Año', turn: 'mañana', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Pedro García', parentPhone: '0983-456789', address: 'Av. España 789', city: 'Asunción', department: 'Central', birthDate: '2007-03-10', nationality: 'paraguayo' },
  { id: 's4', firstName: 'Ana', lastName: 'Rodríguez Ortiz', ci: '5.845.126', grade: '2° Año', turn: 'mañana', enrollmentDate: '2026-02-01', status: 'activo', parentName: 'Luis Rodríguez', parentPhone: '0984-567890', address: 'Av. Eusebio Ayala 321', city: 'Asunción', department: 'Central', birthDate: '2007-11-30', nationality: 'paraguayo' },
  { id: 's5', firstName: 'Pedro', lastName: 'Ramírez Acosta', ci: '5.845.127', grade: '3° Año', turn: 'mañana', enrollmentDate: '2025-02-01', status: 'activo', parentName: 'José Ramírez', parentPhone: '0985-678901', address: 'Av. San Martín 654', city: 'Asunción', department: 'Central', birthDate: '2006-07-18', nationality: 'paraguayo' },
  { id: 's6', firstName: 'Lucía', lastName: 'Giménez Duarte', ci: '5.845.128', grade: '3° Año', turn: 'mañana', enrollmentDate: '2025-02-01', status: 'activo', parentName: 'Rosa Duarte', parentPhone: '0986-789012', address: 'Calle Independencia Nacional 987', city: 'Asunción', department: 'Central', birthDate: '2006-02-14', nationality: 'paraguayo' },
];

export const mockTeachers: Teacher[] = [
  { id: 't1', firstName: 'Roberto', lastName: 'Vargas Medina', ci: '2.567.891', cedula: '2567891', specialty: 'Informática', title: 'Licenciado en Informática', phone: '0991-234567', email: 'rvargas@cpcc.edu.py', subjects: ['sub1', 'sub2'], hireDate: '2020-03-01', contractType: 'permanente', category: 'Categoría III' },
  { id: 't2', firstName: 'Carmen', lastName: 'López Insfrán', ci: '2.567.892', cedula: '2567892', specialty: 'Matemáticas', title: 'Licenciada en Matemáticas', phone: '0992-345678', email: 'clopez@cpcc.edu.py', subjects: ['sub3'], hireDate: '2019-02-15', contractType: 'permanente', category: 'Categoría II' },
  { id: 't3', firstName: 'Miguel', lastName: 'Torres Cabrera', ci: '2.567.893', cedula: '2567893', specialty: 'Lengua Castellana', title: 'Profesor de Lengua Castellana', phone: '0993-456789', email: 'mtorres@cpcc.edu.py', subjects: ['sub4'], hireDate: '2021-07-01', contractType: 'temporal', category: 'Categoría I' },
  { id: 't4', firstName: 'Sandra', lastName: 'Ramos Paredes', ci: '2.567.894', cedula: '2567894', specialty: 'Ciencias', title: 'Licenciada en Ciencias', phone: '0994-567890', email: 'sramos@cpcc.edu.py', subjects: ['sub5'], hireDate: '2020-08-20', contractType: 'permanente', category: 'Categoría III' },
];

export const mockSubjects: Subject[] = [
  { id: 'sub1', name: 'Lengua Castellana y Literatura', code: 'LEN101', grade: '3° Año', teacherId: 't3', hoursPerWeek: 4, area: 'lenguaje', isMandatory: true },
  { id: 'sub2', name: 'Ciencias Naturales y Salud', code: 'CN101', grade: '3° Año', teacherId: 't4', hoursPerWeek: 2, area: 'ciencias', isMandatory: true },
  { id: 'sub3', name: 'Matemática', code: 'MAT101', grade: '3° Año', teacherId: 't2', hoursPerWeek: 4, area: 'matematica', isMandatory: true },
  { id: 'sub4', name: 'Historia y Geografía', code: 'HG101', grade: '3° Año', teacherId: 't3', hoursPerWeek: 3, area: 'sociales', isMandatory: true },
  { id: 'sub5', name: 'Economía y Gestión', code: 'EG101', grade: '3° Año', teacherId: 't4', hoursPerWeek: 4, area: 'sociales', isMandatory: true },
  { id: 'sub6', name: 'Psicología', code: 'PSI101', grade: '3° Año', teacherId: 't4', hoursPerWeek: 4, area: 'sociales', isMandatory: true },
  { id: 'sub7', name: 'Educación Física', code: 'EF101', grade: '3° Año', teacherId: 't1', hoursPerWeek: 2, area: 'fisica', isMandatory: true },
  { id: 'sub8', name: 'Orientación Educacional y Sociolaboral', code: 'OES101', grade: '3° Año', teacherId: 't3', hoursPerWeek: 2, area: 'sociales', isMandatory: true },
  { id: 'sub9', name: 'Informática - Laboratorio', code: 'INF101', grade: '3° Año', teacherId: 't1', hoursPerWeek: 4, area: 'tecnica', isMandatory: true },
  { id: 'sub10', name: 'Algorítmica', code: 'ALG101', grade: '3° Año', teacherId: 't1', hoursPerWeek: 4, area: 'tecnica', isMandatory: true },
  { id: 'sub11', name: 'Administración Financiera', code: 'AF101', grade: '3° Año', teacherId: 't2', hoursPerWeek: 4, area: 'sociales', isMandatory: true },
  { id: 'sub12', name: 'Matemática Aplicada a la Informática', code: 'MAI101', grade: '3° Año', teacherId: 't2', hoursPerWeek: 4, area: 'matematica', isMandatory: true },
  { id: 'sub13', name: 'Plan Optativo - Cooperativismo', code: 'COOP101', grade: '3° Año', teacherId: 't3', hoursPerWeek: 6, area: 'sociales', isMandatory: false },
  // 1° Año subjects
  { id: 'sub14', name: 'Programación', code: 'PROG101', grade: '1° Año', teacherId: 't1', hoursPerWeek: 6, area: 'tecnica', isMandatory: true },
  { id: 'sub15', name: 'Base de Datos', code: 'BD101', grade: '1° Año', teacherId: 't1', hoursPerWeek: 4, area: 'tecnica', isMandatory: true },
  { id: 'sub16', name: 'Matemática', code: 'MAT201', grade: '1° Año', teacherId: 't2', hoursPerWeek: 4, area: 'matematica', isMandatory: true },
  // 2° Año subjects
  { id: 'sub17', name: 'Lengua Castellana', code: 'LEN201', grade: '2° Año', teacherId: 't3', hoursPerWeek: 4, area: 'lenguaje', isMandatory: true },
  { id: 'sub18', name: 'Ciencia y Tecnología', code: 'CT201', grade: '2° Año', teacherId: 't4', hoursPerWeek: 4, area: 'ciencias', isMandatory: true },
  { id: 'sub19', name: 'Redes y Conectividad', code: 'RED201', grade: '2° Año', teacherId: 't1', hoursPerWeek: 6, area: 'tecnica', isMandatory: true },
];

export const mockCriteria: EvaluationCriteria[] = [
  { id: 'c1', name: 'Examen Parcial', weight: 30, subjectId: 'sub14', etapa: 1, type: 'examen' },
  { id: 'c2', name: 'Trabajos Prácticos', weight: 25, subjectId: 'sub14', etapa: 1, type: 'practico' },
  { id: 'c3', name: 'Participación', weight: 15, subjectId: 'sub14', etapa: 1, type: 'participacion' },
  { id: 'c4', name: 'Examen Final', weight: 30, subjectId: 'sub14', etapa: 1, type: 'examen' },
  { id: 'c5', name: 'Examen Parcial', weight: 30, subjectId: 'sub16', etapa: 1, type: 'examen' },
  { id: 'c6', name: 'Ejercicios', weight: 30, subjectId: 'sub16', etapa: 1, type: 'practico' },
  { id: 'c7', name: 'Examen Final', weight: 40, subjectId: 'sub16', etapa: 1, type: 'examen' },
];

export const mockGrades: Grade[] = [
  { id: 'g1', studentId: 's1', subjectId: 'sub14', etapa: 1, year: 2026, month: 3, finalGrade: 4, isRecovery: false, criteriaGrades: [
    { criteriaId: 'c1', criteriaName: 'Examen Parcial', grade: 4, weight: 30, date: '2026-03-15' },
    { criteriaId: 'c2', criteriaName: 'Trabajos Prácticos', grade: 5, weight: 25, date: '2026-03-20' },
    { criteriaId: 'c3', criteriaName: 'Participación', grade: 4, weight: 15, date: '2026-04-01' },
    { criteriaId: 'c4', criteriaName: 'Examen Final', grade: 4, weight: 30, date: '2026-04-15' }
  ]},
  { id: 'g2', studentId: 's1', subjectId: 'sub16', etapa: 1, year: 2026, month: 3, finalGrade: 3, isRecovery: false, criteriaGrades: [
    { criteriaId: 'c5', criteriaName: 'Examen Parcial', grade: 3, weight: 30, date: '2026-03-18' },
    { criteriaId: 'c6', criteriaName: 'Ejercicios', grade: 4, weight: 30, date: '2026-04-05' },
    { criteriaId: 'c7', criteriaName: 'Examen Final', grade: 3, weight: 40, date: '2026-04-18' }
  ]},
  { id: 'g3', studentId: 's2', subjectId: 'sub14', etapa: 1, year: 2026, month: 3, finalGrade: 5, isRecovery: false, criteriaGrades: [] },
  { id: 'g6', studentId: 's2', subjectId: 'sub16', etapa: 1, year: 2026, month: 3, finalGrade: 4, isRecovery: false, criteriaGrades: [] },
  { id: 'g7', studentId: 's3', subjectId: 'sub17', etapa: 1, year: 2026, month: 3, finalGrade: 2, isRecovery: false, criteriaGrades: [] },
  { id: 'g8', studentId: 's3', subjectId: 'sub18', etapa: 1, year: 2026, month: 3, finalGrade: 3, isRecovery: false, criteriaGrades: [] },
  { id: 'g9', studentId: 's1', subjectId: 'sub14', etapa: 2, year: 2026, month: 8, finalGrade: 5, isRecovery: false, criteriaGrades: [] },
  { id: 'g10', studentId: 's1', subjectId: 'sub16', etapa: 2, year: 2026, month: 8, finalGrade: 4, isRecovery: false, criteriaGrades: [] },
];

// Planilla mensual: ahora es por curso completo con todas las materias
export const mockMonthlySheets: MonthlyGradeSheet[] = [
  {
    id: 'ms1', subjectId: 'sub14', teacherId: 't1', grade: '1° Año', month: 3, year: 2026, etapa: 1, status: 'aprobado',
    submittedDate: '2026-03-28', approvedBy: 'Director',
    entries: [
      { studentId: 's1', grades: [], finalGrade: 10 },
      { studentId: 's2', grades: [], finalGrade: 12 },
    ]
  },
  {
    id: 'ms2', subjectId: 'sub14', teacherId: 't1', grade: '1° Año', month: 4, year: 2026, etapa: 1, status: 'borrador',
    entries: [
      { studentId: 's1', grades: [], finalGrade: 0 },
      { studentId: 's2', grades: [], finalGrade: 0 },
    ]
  }
];

export const mockTasks: Task[] = [
  { id: 'task1', subjectId: 'sub14', teacherId: 't1', title: 'Proyecto de Programación', description: 'Desarrollar una aplicación de consola en Python', dueDate: '2026-04-15', grade: '1° Año', type: 'proyecto', status: 'activa', createdDate: '2026-03-10' },
  { id: 'task2', subjectId: 'sub16', teacherId: 't2', title: 'Ejercicios de Álgebra', description: 'Resolver ejercicios del capítulo 5', dueDate: '2026-04-10', grade: '1° Año', type: 'tarea', status: 'activa', createdDate: '2026-03-15' },
];

export const mockAttendance: Attendance[] = [
  { id: 'a1', studentId: 's1', subjectId: 'sub14', date: '2026-03-16', status: 'presente' },
  { id: 'a2', studentId: 's1', subjectId: 'sub14', date: '2026-03-17', status: 'presente' },
  { id: 'a3', studentId: 's1', subjectId: 'sub14', date: '2026-03-18', status: 'tardanza' },
  { id: 'a4', studentId: 's2', subjectId: 'sub14', date: '2026-03-16', status: 'presente' },
  { id: 'a5', studentId: 's2', subjectId: 'sub14', date: '2026-03-17', status: 'ausente' },
  { id: 'a6', studentId: 's3', subjectId: 'sub17', date: '2026-03-16', status: 'presente' },
  { id: 'a7', studentId: 's3', subjectId: 'sub17', date: '2026-03-17', status: 'presente' },
  { id: 'a8', studentId: 's3', subjectId: 'sub17', date: '2026-03-18', status: 'justificado' },
];

export const mockPayments: Payment[] = [
  { id: 'p1', studentId: 's1', concept: 'Cuota Marzo', amount: 350000, dueDate: '2026-03-10', paidDate: '2026-03-08', status: 'pagado', month: 3, year: 2026, paymentType: 'mensualidad', currency: 'PYG' },
  { id: 'p2', studentId: 's1', concept: 'Cuota Abril', amount: 350000, dueDate: '2026-04-10', status: 'pendiente', month: 4, year: 2026, paymentType: 'mensualidad', currency: 'PYG' },
  { id: 'p3', studentId: 's1', concept: 'Matrícula 2026', amount: 500000, dueDate: '2026-02-01', paidDate: '2026-01-28', status: 'pagado', month: 2, year: 2026, paymentType: 'matricula', currency: 'PYG' },
  { id: 'p4', studentId: 's2', concept: 'Cuota Marzo', amount: 350000, dueDate: '2026-03-10', status: 'vencido', month: 3, year: 2026, paymentType: 'mensualidad', currency: 'PYG' },
  { id: 'p5', studentId: 's2', concept: 'Matrícula 2026', amount: 500000, dueDate: '2026-02-01', paidDate: '2026-02-01', status: 'pagado', month: 2, year: 2026, paymentType: 'matricula', currency: 'PYG' },
  { id: 'p6', studentId: 's3', concept: 'Cuota Marzo', amount: 350000, dueDate: '2026-03-10', paidDate: '2026-03-10', status: 'pagado', month: 3, year: 2026, paymentType: 'mensualidad', currency: 'PYG' },
];

export const mockSchedule: ScheduleEntry[] = [
  { id: 'sch1', subjectId: 'sub14', subjectName: 'Programación', teacherName: 'Prof. Vargas', dayOfWeek: 1, startTime: '07:00', endTime: '08:30', grade: '1° Año', classroom: 'Lab. Informática 1', turn: 'mañana' },
  { id: 'sch2', subjectId: 'sub16', subjectName: 'Matemática', teacherName: 'Prof. López', dayOfWeek: 1, startTime: '08:45', endTime: '10:15', grade: '1° Año', classroom: 'Aula 101', turn: 'mañana' },
  { id: 'sch3', subjectId: 'sub17', subjectName: 'Lengua Castellana', teacherName: 'Prof. Torres', dayOfWeek: 1, startTime: '10:30', endTime: '12:00', grade: '2° Año', classroom: 'Aula 201', turn: 'mañana' },
  { id: 'sch4', subjectId: 'sub15', subjectName: 'Base de Datos', teacherName: 'Prof. Vargas', dayOfWeek: 2, startTime: '07:00', endTime: '08:30', grade: '1° Año', classroom: 'Lab. Informática 1', turn: 'mañana' },
  { id: 'sch5', subjectId: 'sub18', subjectName: 'Ciencia y Tecnología', teacherName: 'Prof. Ramos', dayOfWeek: 2, startTime: '08:45', endTime: '10:15', grade: '2° Año', classroom: 'Lab. Ciencias', turn: 'mañana' },
  { id: 'sch6', subjectId: 'sub14', subjectName: 'Programación', teacherName: 'Prof. Vargas', dayOfWeek: 2, startTime: '10:30', endTime: '12:00', grade: '1° Año', classroom: 'Lab. Informática 1', turn: 'mañana' },
  { id: 'sch7', subjectId: 'sub16', subjectName: 'Matemática', teacherName: 'Prof. López', dayOfWeek: 3, startTime: '07:00', endTime: '08:30', grade: '1° Año', classroom: 'Aula 101', turn: 'mañana' },
  { id: 'sch8', subjectId: 'sub14', subjectName: 'Programación', teacherName: 'Prof. Vargas', dayOfWeek: 3, startTime: '08:45', endTime: '10:15', grade: '1° Año', classroom: 'Lab. Informática 1', turn: 'mañana' },
  { id: 'sch9', subjectId: 'sub17', subjectName: 'Lengua Castellana', teacherName: 'Prof. Torres', dayOfWeek: 4, startTime: '07:00', endTime: '08:30', grade: '2° Año', classroom: 'Aula 201', turn: 'mañana' },
  { id: 'sch10', subjectId: 'sub15', subjectName: 'Base de Datos', teacherName: 'Prof. Vargas', dayOfWeek: 4, startTime: '08:45', endTime: '10:15', grade: '1° Año', classroom: 'Lab. Informática 1', turn: 'mañana' },
  { id: 'sch11', subjectId: 'sub18', subjectName: 'Ciencia y Tecnología', teacherName: 'Prof. Ramos', dayOfWeek: 5, startTime: '07:00', endTime: '08:30', grade: '2° Año', classroom: 'Lab. Ciencias', turn: 'mañana' },
  { id: 'sch12', subjectId: 'sub19', subjectName: 'Redes y Conectividad', teacherName: 'Prof. Vargas', dayOfWeek: 5, startTime: '08:45', endTime: '10:15', grade: '2° Año', classroom: 'Lab. Informática 2', turn: 'mañana' },
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

export const formatGuaranies = (amount: number) => {
  return new Intl.NumberFormat('es-PY', { style: 'currency', currency: 'PYG', minimumFractionDigits: 0 }).format(amount);
};
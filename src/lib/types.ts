export type UserRole = 'director' | 'coordinador' | 'docente' | 'alumno';

// Sistema educativo CPCC: 2 etapas por año
export type PeriodType = 'etapa';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  ci: string;
  cedula?: string;
  grade: string; // "1° Año", "2° Año", "3° Año"
  turn: 'mañana' | 'tarde';
  enrollmentDate: string;
  status: 'activo' | 'inactivo' | 'retirado' | 'trasladado';
  parentName: string;
  parentPhone: string;
  parentCi?: string;
  address: string;
  city: string;
  department: string;
  birthDate: string;
  nationality: 'paraguayo' | 'extranjero';
  previousSchool?: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  ci: string;
  cedula: string;
  specialty: string;
  title: string;
  phone: string;
  email: string;
  subjects: string[];
  hireDate: string;
  contractType: 'permanente' | 'temporal' | 'suplente';
  category: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  grade: string;
  teacherId: string;
  hoursPerWeek: number;
  area: 'lenguaje' | 'ciencias' | 'matematica' | 'sociales' | 'artistica' | 'fisica' | 'tecnica';
  isMandatory: boolean;
}

// Planilla de puntaje mensual - foco principal del sistema
export interface MonthlyGradeSheet {
  id: string;
  subjectId: string;
  teacherId: string;
  grade: string;
  month: number; // 1-12
  year: number;
  etapa: 1 | 2;
  entries: MonthlyGradeEntry[];
  status: 'borrador' | 'enviado' | 'aprobado';
  submittedDate?: string;
  approvedBy?: string;
}

export interface MonthlyGradeEntry {
  studentId: string;
  grades: {
    criteriaId: string;
    grade: number; // 1-5
  }[];
  finalGrade: number; // 1-5
  observations?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  etapa: 1 | 2;
  criteriaGrades: CriteriaGrade[];
  finalGrade: number; // 1-5 escala paraguaya
  year: number;
  month?: number; // mes de la calificación
  recoveryGrade?: number;
  isRecovery: boolean;
}

export interface EvaluationCriteria {
  id: string;
  name: string;
  weight: number;
  subjectId: string;
  etapa: 1 | 2;
  type: 'trabajo' | 'examen' | 'participacion' | 'practico' | 'cuaderno';
}

export interface CriteriaGrade {
  criteriaId: string;
  criteriaName: string;
  grade: number; // 1-5
  weight: number;
  date: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  status: 'presente' | 'ausente' | 'tardanza' | 'justificado' | 'licencia';
  justificacion?: string;
}

export interface Payment {
  id: string;
  studentId: string;
  concept: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pendiente' | 'pagado' | 'vencido' | 'cuota';
  month: number;
  year: number;
  paymentType: 'mensualidad' | 'matricula' | 'material' | 'otros';
  currency: 'PYG' | 'USD';
}

export interface ScheduleEntry {
  id: string;
  subjectId: string;
  subjectName: string;
  teacherName: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  grade: string;
  classroom: string;
  turn: 'mañana' | 'tarde';
}

export interface AcademicYear {
  id: string;
  year: number;
  periodType: PeriodType;
  startDate: string;
  endDate: string;
  status: 'activo' | 'cerrado' | 'planificado';
  etapas: {
    1: { start: string; end: string };
    2: { start: string; end: string };
  };
}

export interface BoletaNotas {
  id: string;
  studentId: string;
  year: number;
  etapa: 1 | 2;
  grades: {
    subjectId: string;
    subjectName: string;
    finalGrade: number;
    criteria: CriteriaGrade[];
    teacherName: string;
    area: string;
  }[];
  attendance: {
    total: number;
    present: number;
    absent: number;
    tardy: number;
    justified: number;
  };
  conducta: 1 | 2 | 3 | 4 | 5;
  observaciones: string;
  generatedDate: string;
  directorSignature: string;
  teacherSignature: string;
}

export interface Colegio {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  department: string;
  phone: string;
  email: string;
  director: string;
  tipo: 'publico' | 'privado' | 'subvencionado';
  niveles: ('inicial' | 'primario' | 'secundario')[];
  turno: ('mañana' | 'tarde')[];
}

// Tarea asignada por docente
export interface Task {
  id: string;
  subjectId: string;
  teacherId: string;
  title: string;
  description: string;
  dueDate: string;
  grade: string;
  type: 'tarea' | 'proyecto' | 'investigacion' | 'examen';
  status: 'activa' | 'cerrada';
  createdDate: string;
}

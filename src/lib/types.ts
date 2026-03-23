export type UserRole = 'director' | 'docente' | 'alumno';

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
  ci: string; // Cédula de identidad paraguaya
  cedula?: string; // CI paraguaya
  grade: string; // "1° Año", "2° Año", "3° Año"
  section: string; // "A", "B", "C"
  turn: 'mañana' | 'tarde'; // Turnos disponibles en CPCC
  enrollmentDate: string;
  status: 'activo' | 'inactivo' | 'retirado' | 'trasladado';
  parentName: string;
  parentPhone: string;
  parentCi?: string; // CI del padre/tutor
  address: string;
  city: string;
  department: string; // Departamento de Paraguay
  birthDate: string;
  nationality: 'paraguayo' | 'extranjero';
  previousSchool?: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  ci: string; // Cédula de identidad paraguaya
  cedula: string; // CI paraguaya obligatoria
  specialty: string;
  title: string; // Título profesional
  phone: string;
  email: string;
  subjects: string[];
  hireDate: string;
  contractType: 'permanente' | 'temporal' | 'suplente';
  category: string; // Categoría magisterial
}

export interface Subject {
  id: string;
  name: string;
  code: string; // Código de asignatura MEC
  grade: string; // "1° Año", "2° Año", "3° Año"
  teacherId: string;
  hoursPerWeek: number;
  area: 'lenguaje' | 'ciencias' | 'matematica' | 'sociales' | 'artistica' | 'fisica' | 'tecnica';
  isMandatory: boolean;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  etapa: 1 | 2; // 2 etapas al año
  criteriaGrades: CriteriaGrade[];
  finalGrade: number; // 1-5 escala paraguaya
  year: number;
  recoveryGrade?: number; // Nota de recuperación
  isRecovery: boolean; // Si es nota de recuperación
}

export interface EvaluationCriteria {
  id: string;
  name: string;
  weight: number; // porcentaje
  subjectId: string;
  etapa: 1 | 2; // 2 etapas al año
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
  amount: number; // En guaraníes
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
  dayOfWeek: number; // 1=Lunes, 2=Martes...
  startTime: string;
  endTime: string;
  grade: string; // "1° Año", "2° Año", "3° Año"
  section: string;
  classroom: string; // Aula asignada
  turn: 'mañana' | 'tarde';
}

export interface AcademicYear {
  id: string;
  year: number;
  periodType: PeriodType; // Siempre 'etapa'
  startDate: string;
  endDate: string;
  status: 'activo' | 'cerrado' | 'planificado';
  etapas: {
    1: { start: string; end: string };
    2: { start: string; end: string };
  };
}

// Nuevos tipos para sistema paraguayo
export interface BoletaNotas {
  id: string;
  studentId: string;
  year: number;
  etapa: 1 | 2; // 2 etapas al año
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
  conducta: 1 | 2 | 3 | 4 | 5; // Escala 1-5
  observaciones: string;
  generatedDate: string;
  directorSignature: string;
  teacherSignature: string;
}

export interface Colegio {
  id: string;
  name: string;
  code: string; // Código MEC
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

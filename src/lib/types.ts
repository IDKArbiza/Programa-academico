export type UserRole = 'director' | 'docente' | 'alumno';

export type PeriodType = 'bimestre' | 'trimestre' | 'semestre';

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
  dni: string;
  grade: string;
  section: string;
  enrollmentDate: string;
  status: 'activo' | 'inactivo' | 'retirado';
  parentName: string;
  parentPhone: string;
  address: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  specialty: string;
  phone: string;
  email: string;
  subjects: string[];
}

export interface Subject {
  id: string;
  name: string;
  grade: string;
  teacherId: string;
  hoursPerWeek: number;
}

export interface Grade {
  id: string;
  studentId: string;
  subjectId: string;
  period: number;
  periodType: PeriodType;
  criteriaGrades: CriteriaGrade[];
  finalGrade: number; // 1-5
  year: number;
}

export interface EvaluationCriteria {
  id: string;
  name: string;
  weight: number; // percentage
  subjectId: string;
  period: number;
  periodType: PeriodType;
}

export interface CriteriaGrade {
  criteriaId: string;
  criteriaName: string;
  grade: number; // 1-5
  weight: number;
}

export interface Attendance {
  id: string;
  studentId: string;
  subjectId: string;
  date: string;
  status: 'presente' | 'ausente' | 'tardanza' | 'justificado';
}

export interface Payment {
  id: string;
  studentId: string;
  concept: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pendiente' | 'pagado' | 'vencido';
  month: number;
  year: number;
}

export interface ScheduleEntry {
  id: string;
  subjectId: string;
  subjectName: string;
  teacherName: string;
  dayOfWeek: number; // 0=Lun, 1=Mar...
  startTime: string;
  endTime: string;
  grade: string;
  section: string;
}

export interface AcademicYear {
  id: string;
  year: number;
  periodType: PeriodType;
  startDate: string;
  endDate: string;
  status: 'activo' | 'cerrado' | 'planificado';
}

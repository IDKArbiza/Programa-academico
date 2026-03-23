import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  DocumentData,
  QuerySnapshot,
  QueryConstraint
} from "firebase/firestore";
import { db } from "./firebase";
import { Student, Teacher, Subject, Grade, EvaluationCriteria, Attendance, Payment, ScheduleEntry, AcademicYear, User, BoletaNotas, Colegio } from "./types";

// Generic CRUD operations
const createDocument = async <T>(collectionName: string, data: Omit<T, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  });
  return docRef.id;
};

const getDocument = async <T extends { id: string }>(collectionName: string, id: string): Promise<T | null> => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as T : null;
};

const getDocuments = async <T extends { id: string }>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> => {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as T);
};

const updateDocument = async <T extends { id: string }>(collectionName: string, id: string, data: Partial<T>): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Timestamp.now()
  });
};

const deleteDocument = async (collectionName: string, id: string): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

// Student services
export const studentService = {
  create: (student: Omit<Student, 'id'>) => createDocument<Student>('students', student),
  getById: (id: string) => getDocument<Student>('students', id),
  getAll: () => getDocuments<Student>('students'),
  getByGrade: (grade: string) => getDocuments<Student>('students', [where('grade', '==', grade)]),
  update: (id: string, student: Partial<Student>) => updateDocument<Student>('students', id, student),
  delete: (id: string) => deleteDocument('students', id)
};

// Teacher services
export const teacherService = {
  create: (teacher: Omit<Teacher, 'id'>) => createDocument<Teacher>('teachers', teacher),
  getById: (id: string) => getDocument<Teacher>('teachers', id),
  getAll: () => getDocuments<Teacher>('teachers'),
  getBySpecialty: (specialty: string) => getDocuments<Teacher>('teachers', [where('specialty', '==', specialty)]),
  update: (id: string, teacher: Partial<Teacher>) => updateDocument<Teacher>('teachers', id, teacher),
  delete: (id: string) => deleteDocument('teachers', id)
};

// Subject services
export const subjectService = {
  create: (subject: Omit<Subject, 'id'>) => createDocument<Subject>('subjects', subject),
  getById: (id: string) => getDocument<Subject>('subjects', id),
  getAll: () => getDocuments<Subject>('subjects'),
  getByGrade: (grade: string) => getDocuments<Subject>('subjects', [where('grade', '==', grade)]),
  getByTeacher: (teacherId: string) => getDocuments<Subject>('subjects', [where('teacherId', '==', teacherId)]),
  update: (id: string, subject: Partial<Subject>) => updateDocument<Subject>('subjects', id, subject),
  delete: (id: string) => deleteDocument('subjects', id)
};

// Grade services (adaptado para etapas CPCC)
export const gradeService = {
  create: (grade: Omit<Grade, 'id'>) => createDocument<Grade>('grades', grade),
  getById: (id: string) => getDocument<Grade>('grades', id),
  getByStudent: (studentId: string) => getDocuments<Grade>('grades', [where('studentId', '==', studentId)]),
  getBySubject: (subjectId: string) => getDocuments<Grade>('grades', [where('subjectId', '==', subjectId)]),
  getByStudentAndSubject: (studentId: string, subjectId: string) => 
    getDocuments<Grade>('grades', [where('studentId', '==', studentId), where('subjectId', '==', subjectId)]),
  getByEtapa: (etapa: 1 | 2) => getDocuments<Grade>('grades', [where('etapa', '==', etapa)]),
  getByYear: (year: number) => getDocuments<Grade>('grades', [where('year', '==', year)]),
  update: (id: string, grade: Partial<Grade>) => updateDocument<Grade>('grades', id, grade),
  delete: (id: string) => deleteDocument('grades', id)
};

// Evaluation Criteria services (adaptado para etapas)
export const criteriaService = {
  create: (criteria: Omit<EvaluationCriteria, 'id'>) => createDocument<EvaluationCriteria>('evaluationCriteria', criteria),
  getById: (id: string) => getDocument<EvaluationCriteria>('evaluationCriteria', id),
  getAll: () => getDocuments<EvaluationCriteria>('evaluationCriteria'),
  getBySubject: (subjectId: string) => getDocuments<EvaluationCriteria>('evaluationCriteria', [where('subjectId', '==', subjectId)]),
  getByEtapa: (etapa: 1 | 2) => getDocuments<EvaluationCriteria>('evaluationCriteria', [where('etapa', '==', etapa)]),
  update: (id: string, criteria: Partial<EvaluationCriteria>) => updateDocument<EvaluationCriteria>('evaluationCriteria', id, criteria),
  delete: (id: string) => deleteDocument('evaluationCriteria', id)
};

// Attendance services
export const attendanceService = {
  create: (attendance: Omit<Attendance, 'id'>) => createDocument<Attendance>('attendance', attendance),
  getById: (id: string) => getDocument<Attendance>('attendance', id),
  getByStudent: (studentId: string) => getDocuments<Attendance>('attendance', [where('studentId', '==', studentId)]),
  getBySubject: (subjectId: string) => getDocuments<Attendance>('attendance', [where('subjectId', '==', subjectId)]),
  getByDate: (date: string) => getDocuments<Attendance>('attendance', [where('date', '==', date)]),
  update: (id: string, attendance: Partial<Attendance>) => updateDocument<Attendance>('attendance', id, attendance),
  delete: (id: string) => deleteDocument('attendance', id)
};

// Payment services
export const paymentService = {
  create: (payment: Omit<Payment, 'id'>) => createDocument<Payment>('payments', payment),
  getById: (id: string) => getDocument<Payment>('payments', id),
  getByStudent: (studentId: string) => getDocuments<Payment>('payments', [where('studentId', '==', studentId)]),
  getByStatus: (status: Payment['status']) => getDocuments<Payment>('payments', [where('status', '==', status)]),
  getByMonthYear: (month: number, year: number) => 
    getDocuments<Payment>('payments', [where('month', '==', month), where('year', '==', year)]),
  update: (id: string, payment: Partial<Payment>) => updateDocument<Payment>('payments', id, payment),
  delete: (id: string) => deleteDocument('payments', id)
};

// Schedule services
export const scheduleService = {
  create: (schedule: Omit<ScheduleEntry, 'id'>) => createDocument<ScheduleEntry>('schedule', schedule),
  getById: (id: string) => getDocument<ScheduleEntry>('schedule', id),
  getAll: () => getDocuments<ScheduleEntry>('schedule'),
  getByGrade: (grade: string) => getDocuments<ScheduleEntry>('schedule', [where('grade', '==', grade)]),
  getByTeacher: (teacherName: string) => getDocuments<ScheduleEntry>('schedule', [where('teacherName', '==', teacherName)]),
  getByDayOfWeek: (dayOfWeek: number) => getDocuments<ScheduleEntry>('schedule', [where('dayOfWeek', '==', dayOfWeek)]),
  update: (id: string, schedule: Partial<ScheduleEntry>) => updateDocument<ScheduleEntry>('schedule', id, schedule),
  delete: (id: string) => deleteDocument('schedule', id)
};

// Academic Year services
export const academicYearService = {
  create: (year: Omit<AcademicYear, 'id'>) => createDocument<AcademicYear>('academicYears', year),
  getById: (id: string) => getDocument<AcademicYear>('academicYears', id),
  getAll: () => getDocuments<AcademicYear>('academicYears'),
  getByStatus: (status: AcademicYear['status']) => 
    getDocuments<AcademicYear>('academicYears', [where('status', '==', status)]),
  update: (id: string, year: Partial<AcademicYear>) => updateDocument<AcademicYear>('academicYears', id, year),
  delete: (id: string) => deleteDocument('academicYears', id)
};

// User services for authentication
export const userService = {
  create: (user: Omit<User, 'id'>) => createDocument<User>('users', user),
  getById: (id: string) => getDocument<User>('users', id),
  getAll: () => getDocuments<User>('users'),
  getByEmail: (email: string) => getDocuments<User>('users', [where('email', '==', email), limit(1)]),
  getByRole: (role: User['role']) => getDocuments<User>('users', [where('role', '==', role)]),
  update: (id: string, user: Partial<User>) => updateDocument<User>('users', id, user),
  delete: (id: string) => deleteDocument('users', id)
};

// Servicios para Boleta de Notas (sistema CPCC)
export const boletaService = {
  create: (boleta: Omit<BoletaNotas, 'id'>) => createDocument<BoletaNotas>('boletas', boleta),
  getById: (id: string) => getDocument<BoletaNotas>('boletas', id),
  getByStudent: (studentId: string) => getDocuments<BoletaNotas>('boletas', [where('studentId', '==', studentId)]),
  getByStudentAndEtapa: (studentId: string, etapa: 1 | 2) => 
    getDocuments<BoletaNotas>('boletas', [where('studentId', '==', studentId), where('etapa', '==', etapa)]),
  getByYear: (year: number) => getDocuments<BoletaNotas>('boletas', [where('year', '==', year)]),
  update: (id: string, boleta: Partial<BoletaNotas>) => updateDocument<BoletaNotas>('boletas', id, boleta),
  delete: (id: string) => deleteDocument('boletas', id)
};

// Servicios para Colegio (sistema paraguayo)
export const colegioService = {
  create: (colegio: Omit<Colegio, 'id'>) => createDocument<Colegio>('colegios', colegio),
  getById: (id: string) => getDocument<Colegio>('colegios', id),
  getAll: () => getDocuments<Colegio>('colegios'),
  getByDepartment: (department: string) => getDocuments<Colegio>('colegios', [where('department', '==', department)]),
  getByTipo: (tipo: Colegio['tipo']) => getDocuments<Colegio>('colegios', [where('tipo', '==', tipo)]),
  update: (id: string, colegio: Partial<Colegio>) => updateDocument<Colegio>('colegios', id, colegio),
  delete: (id: string) => deleteDocument('colegios', id)
};

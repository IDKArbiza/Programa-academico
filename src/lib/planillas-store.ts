import { create } from 'zustand';
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface TaskRow {
  id: string;
  name: string;
  maxPoints: number;
}

export interface PlanillaScore {
  studentId: string;
  scores: Record<string, number>; // taskId -> score
}

export interface Planilla {
  id: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  grade: string;
  month: number;
  year: number;
  etapa: 1 | 2;
  tasks: TaskRow[];
  scores: PlanillaScore[];
  status: 'borrador' | 'enviado' | 'aprobado' | 'rechazado';
  submittedDate?: string;
  approvedDate?: string;
  approvedBy?: string;
  rejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PlanillasState {
  planillas: Planilla[];
  loading: boolean;
  loaded: boolean;
  fetchPlanillas: () => Promise<void>;
  savePlanilla: (planilla: Omit<Planilla, 'id'>) => Promise<string>;
  updatePlanilla: (id: string, data: Partial<Planilla>) => Promise<void>;
  deletePlanilla: (id: string) => Promise<void>;
  getPlanillasByTeacher: (teacherId: string) => Planilla[];
  getPlanillasByGrade: (grade: string) => Planilla[];
  getPlanillasByStatus: (status: Planilla['status']) => Planilla[];
  getApprovedForStudent: (studentId: string, grade: string) => Planilla[];
}

const COLLECTION = 'planillas';

export const usePlanillasStore = create<PlanillasState>((set, get) => ({
  planillas: [],
  loading: false,
  loaded: false,

  fetchPlanillas: async () => {
    if (get().loaded) return;
    set({ loading: true });
    try {
      const snapshot = await getDocs(collection(db, COLLECTION));
      const planillas = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
      })) as Planilla[];
      set({ planillas, loading: false, loaded: true });
    } catch (error) {
      console.error('Error fetching planillas:', error);
      set({ loading: false });
    }
  },

  savePlanilla: async (planilla) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...planilla,
        createdAt: Timestamp.now().toDate().toISOString(),
        updatedAt: Timestamp.now().toDate().toISOString(),
      });
      const newPlanilla = { ...planilla, id: docRef.id };
      set(state => ({ planillas: [...state.planillas, newPlanilla] }));
      return docRef.id;
    } catch (error) {
      console.error('Error saving planilla:', error);
      throw error;
    }
  },

  updatePlanilla: async (id, data) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now().toDate().toISOString(),
      });
      set(state => ({
        planillas: state.planillas.map(p => p.id === id ? { ...p, ...data } : p),
      }));
    } catch (error) {
      console.error('Error updating planilla:', error);
      throw error;
    }
  },

  deletePlanilla: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
      set(state => ({
        planillas: state.planillas.filter(p => p.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting planilla:', error);
      throw error;
    }
  },

  getPlanillasByTeacher: (teacherId) => {
    return get().planillas.filter(p => p.teacherId === teacherId);
  },

  getPlanillasByGrade: (grade) => {
    return get().planillas.filter(p => p.grade === grade);
  },

  getPlanillasByStatus: (status) => {
    return get().planillas.filter(p => p.status === status);
  },

  getApprovedForStudent: (studentId, grade) => {
    return get().planillas.filter(
      p => p.status === 'aprobado' && p.grade === grade && p.scores.some(s => s.studentId === studentId)
    );
  },
}));

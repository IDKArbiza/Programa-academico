import { create } from 'zustand';
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, where, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { UserRole } from './types';

export interface Account {
  id: string;
  firstName: string;
  lastName: string;
  ci: string;
  email: string;
  role: UserRole;
  grade?: string;
  status: 'activo' | 'inactivo';
  createdAt?: string;
  updatedAt?: string;
}

interface AccountsState {
  accounts: Account[];
  loading: boolean;
  loaded: boolean;
  fetchAccounts: () => Promise<void>;
  createAccount: (account: Omit<Account, 'id'>) => Promise<string>;
  updateAccount: (id: string, data: Partial<Account>) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
  getByRole: (role: UserRole) => Account[];
  getByEmail: (email: string) => Account | undefined;
  getStudents: () => Account[];
  getTeachers: () => Account[];
  getStudentsByGrade: (grade: string) => Account[];
  getAccountName: (id: string) => string;
}

const COLLECTION = 'users';

export const useAccountsStore = create<AccountsState>((set, get) => ({
  accounts: [],
  loading: false,
  loaded: false,

  fetchAccounts: async () => {
    if (get().loaded) return;
    set({ loading: true });
    try {
      const snapshot = await getDocs(collection(db, COLLECTION));
      const accounts = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
      })) as Account[];
      set({ accounts, loading: false, loaded: true });
    } catch (error) {
      console.error('Error fetching accounts:', error);
      set({ loading: false });
    }
  },

  createAccount: async (account) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...account,
        createdAt: Timestamp.now().toDate().toISOString(),
        updatedAt: Timestamp.now().toDate().toISOString(),
      });
      const newAccount = { ...account, id: docRef.id };
      set(state => ({ accounts: [...state.accounts, newAccount] }));
      return docRef.id;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  updateAccount: async (id, data) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now().toDate().toISOString(),
      });
      set(state => ({
        accounts: state.accounts.map(a => a.id === id ? { ...a, ...data } : a),
      }));
    } catch (error) {
      console.error('Error updating account:', error);
      throw error;
    }
  },

  deleteAccount: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
      set(state => ({
        accounts: state.accounts.filter(a => a.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  },

  getByRole: (role) => get().accounts.filter(a => a.role === role),
  
  getByEmail: (email) => get().accounts.find(a => a.email === email),
  
  getStudents: () => get().accounts.filter(a => a.role === 'alumno'),
  
  getTeachers: () => get().accounts.filter(a => a.role === 'docente' || a.role === 'coordinador' || a.role === 'director'),
  
  getStudentsByGrade: (grade) => get().accounts.filter(a => a.role === 'alumno' && a.grade === grade),

  getAccountName: (id) => {
    const a = get().accounts.find(acc => acc.id === id);
    return a ? `${a.lastName}, ${a.firstName}` : id;
  },
}));

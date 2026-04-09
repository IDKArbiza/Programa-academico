import { create } from 'zustand';
import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface Course {
  id: string;
  name: string;
  grade: string;
  year: number;
  students: string[];
  teachers: string[];
  subjects: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface CoursesState {
  courses: Course[];
  loading: boolean;
  loaded: boolean;
  fetchCourses: () => Promise<void>;
  createCourse: (course: Omit<Course, 'id'>) => Promise<string>;
  updateCourse: (id: string, data: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  getCourseByGrade: (grade: string) => Course | undefined;
  getStudentCourses: (studentId: string) => Course[];
  getTeacherCourses: (teacherId: string) => Course[];
}

const COLLECTION = 'courses';

export const useCoursesStore = create<CoursesState>((set, get) => ({
  courses: [],
  loading: false,
  loaded: false,

  fetchCourses: async () => {
    if (get().loaded) return;
    set({ loading: true });
    try {
      const snapshot = await getDocs(collection(db, COLLECTION));
      const courses = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data(),
      })) as Course[];
      set({ courses, loading: false, loaded: true });
    } catch (error) {
      console.error('Error fetching courses:', error);
      set({ loading: false });
    }
  },

  createCourse: async (course) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...course,
        createdAt: Timestamp.now().toDate().toISOString(),
        updatedAt: Timestamp.now().toDate().toISOString(),
      });
      const newCourse = { ...course, id: docRef.id };
      set(state => ({ courses: [...state.courses, newCourse] }));
      return docRef.id;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  updateCourse: async (id, data) => {
    try {
      const docRef = doc(db, COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now().toDate().toISOString(),
      });
      set(state => ({
        courses: state.courses.map(c => c.id === id ? { ...c, ...data } : c),
      }));
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  },

  deleteCourse: async (id) => {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
      set(state => ({
        courses: state.courses.filter(c => c.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  },

  getCourseByGrade: (grade) => get().courses.find(c => c.grade === grade),
  
  getStudentCourses: (studentId) => get().courses.filter(c => c.students.includes(studentId)),
  
  getTeacherCourses: (teacherId) => get().courses.filter(c => c.teachers.includes(teacherId)),
}));

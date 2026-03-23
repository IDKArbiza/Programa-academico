import { create } from 'zustand';
import { UserRole } from './types';

interface AppState {
  currentRole: UserRole | null;
  currentUserId: string | null;
  setRole: (role: UserRole, userId?: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentRole: null,
  currentUserId: null,
  setRole: (role, userId) => set({ currentRole: role, currentUserId: userId || null }),
  logout: () => set({ currentRole: null, currentUserId: null }),
}));

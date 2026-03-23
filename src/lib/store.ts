import { create } from 'zustand';
import { UserRole, User } from './types';
import { userService } from './firebase-services';

interface AppState {
  currentRole: UserRole | null;
  currentUserId: string | null;
  user: User | null;
  isLoading: boolean;
  setRole: (role: UserRole, userId?: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentRole: null,
  currentUserId: null,
  user: null,
  isLoading: false,
  setRole: (role, userId) => set({ currentRole: role, currentUserId: userId || null }),
  logout: () => set({ currentRole: null, currentUserId: null, user: null }),
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const users = await userService.getByEmail(email);
      if (users.length > 0) {
        const user = users[0];
        set({ 
          user, 
          currentRole: user.role, 
          currentUserId: user.id,
          isLoading: false 
        });
        return true;
      }
      set({ isLoading: false });
      return false;
    } catch (error) {
      console.error('Login error:', error);
      set({ isLoading: false });
      return false;
    }
  }
}));

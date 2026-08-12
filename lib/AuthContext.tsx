'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
  profilePhoto?: string;
}

export interface WeddingSession {
  groomName: string;
  brideName: string;
  weddingDate: string;
  slug: string;
  venue?: string;
  story?: string;
  coverImage?: string;
}

interface AuthContextType {
  user: UserSession | null;
  wedding: WeddingSession | null;
  loading: boolean;
  refetchAuth: () => Promise<void>;
  updateProfile: (data: Record<string, any>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  wedding: null,
  loading: true,
  refetchAuth: async () => {},
  updateProfile: async () => ({ success: false, error: 'Not initialized' }),
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [wedding, setWedding] = useState<WeddingSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
        setWedding(data.wedding || null);
      } else {
        setUser(null);
        setWedding(null);
      }
    } catch {
      setUser(null);
      setWedding(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  const updateProfile = async (data: Record<string, any>) => {
    try {
      const res = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        setUser(resData.user || user);
        setWedding(resData.wedding || wedding);
        router.refresh();
        return { success: true };
      }
      return { success: false, error: resData.error || 'Failed to update profile' };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setWedding(null);
      router.push('/login');
      router.refresh();
    }
  };

  return (
    <AuthContext.Provider value={{ user, wedding, loading, refetchAuth: fetchAuth, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

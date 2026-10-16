import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateUserSafely = (newUser: User | null) => {
      setUser(prev => {
        if (!prev && !newUser) return null;
        if (prev && newUser && prev.id === newUser.id && prev.email === newUser.email) {
          return prev; // Preserve identity to avoid triggering dependent useEffects
        }
        return newUser;
      });
    };

    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateUserSafely(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes (e.g. TOKEN_REFRESHED on tab focus)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      updateUserSafely(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

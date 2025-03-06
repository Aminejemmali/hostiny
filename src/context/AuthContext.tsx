// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider, 
  GithubAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  UserCredential
} from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signInWithGoogle: () => Promise<UserCredential>;
  signInWithGithub: () => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    setError(null);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Sign in with GitHub
  const signInWithGithub = async () => {
    setError(null);
    try {
      const provider = new GithubAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Log out
  const logOut = async () => {
    setError(null);
    try {
      await signOut(auth);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Verify email
  const verifyEmail = async () => {
    setError(null);
    try {
      if (user) {
        await sendEmailVerification(user);
      } else {
        throw new Error('No user is signed in');
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        logOut,
        signInWithGoogle,
        signInWithGithub,
        resetPassword,
        verifyEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
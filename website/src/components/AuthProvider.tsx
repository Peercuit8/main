"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";

interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isConfigured: boolean;
  signInWithGoogle: () => Promise<AuthUser | null>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check saved demo user if Firebase is unconfigured
    if (!isFirebaseConfigured || !auth) {
      const demoUser = localStorage.getItem("peercuit-demo-user");
      if (demoUser) {
        try {
          setUser(JSON.parse(demoUser));
        } catch {
          // ignore
        }
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<AuthUser | null> => {
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const loggedUser: AuthUser = {
          uid: result.user.uid,
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        setUser(loggedUser);
        return loggedUser;
      } catch (err: unknown) {
        const error = err as Error;
        console.error("[Auth] Google Sign-In failed:", error);
        alert(`Google Sign-In Error: ${error.message}`);
        return null;
      }
    } else {
      // Graceful local development demo sign-in
      const simulatedName = prompt("Enter your name to simulate Google Sign-In (Local Dev):", "Alex Rivera");
      if (!simulatedName) return null;
      
      const simulatedEmail = prompt("Enter your email for Google Sign-In (Local Dev):", "alex.rivera@example.edu") || "alex.rivera@example.edu";
      const demoUser: AuthUser = {
        uid: `demo_${Date.now()}`,
        displayName: simulatedName,
        email: simulatedEmail,
        photoURL: null,
      };
      setUser(demoUser);
      localStorage.setItem("peercuit-demo-user", JSON.stringify(demoUser));
      return demoUser;
    }
  };

  const signOutUser = async (): Promise<void> => {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error("[Auth] Sign out error:", err);
      }
    }
    setUser(null);
    localStorage.removeItem("peercuit-demo-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isFirebaseConfigured,
        signInWithGoogle,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

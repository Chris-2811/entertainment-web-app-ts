import { createContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { ReactNode } from 'react';
import { auth, db } from '@/lib/firebase/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { UserCredential, User } from 'firebase/auth';

interface AuthContextValues {
  user: firebase.User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext<AuthContextValues | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });

    return () => {
      unsubscibe();
    };
  });

  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  return (
    <AuthContext.Provider value={{ user, signUp, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

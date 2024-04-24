import { createContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { auth, db } from '@/lib/firebase/firebase';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { UserCredential, User } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

interface AuthContextValues {
  isLoading: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscibe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscibe();
    };
  });

  function signUp(email: string, password: string) {
    if (user) {
      setDoc(doc(db, 'users', user.uid), {
        savedMovies: [],
        savedShows: [],
      });
    }
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function logIn(email: string, password: string) {
    await setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  }

  return (
    <AuthContext.Provider value={{ setUser, user, signUp, logIn, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

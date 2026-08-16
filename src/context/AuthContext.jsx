import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const AuthContext = createContext(null);

// Every signed-up user gets a matching document at users/{uid} in Firestore.
// To make someone an admin: Firebase console -> Firestore -> users ->
// their document -> change role from "customer" to "admin".
async function ensureUserProfile(user, displayName) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    await setDoc(ref, {
      email: user.email,
      displayName: displayName || user.displayName || "",
      role: "customer",
      createdAt: serverTimestamp(),
    });
    return { email: user.email, displayName: displayName || "", role: "customer" };
  }
  return snap.data();
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userProfile = await ensureUserProfile(firebaseUser);
          setProfile(userProfile);
        } catch {
          setProfile({ role: "customer" });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    const userProfile = await ensureUserProfile(cred.user, displayName);
    setProfile(userProfile);
    return cred.user;
  };

  const logIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then((c) => c.user);

  const logOut = () => signOut(auth);

  const value = {
    user,
    profile,
    role: profile?.role || "customer",
    isAdmin: profile?.role === "admin",
    loading,
    signUp,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

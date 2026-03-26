import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./authContext.js";

const STORAGE_USERS = "dhaneshwari_users";
const STORAGE_SESSION = "dhaneshwari_session";

function readUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(user) {
  if (user) localStorage.setItem(STORAGE_SESSION, JSON.stringify(user));
  else localStorage.removeItem(STORAGE_SESSION);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession());

  const signUp = useCallback((name, email, password, phone = "") => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      phone: phone.trim(),
    };
    users.push(newUser);
    writeUsers(users);
    const session = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    };
    writeSession(session);
    setUser(session);
    return { ok: true };
  }, []);

  const signIn = useCallback((email, password) => {
    const users = readUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password,
    );
    if (!found) {
      return { ok: false, error: "Invalid email or password." };
    }
    const session = {
      id: found.id,
      name: found.name,
      email: found.email,
      phone: found.phone || "",
    };
    writeSession(session);
    setUser(session);
    return { ok: true };
  }, []);

  const signOut = useCallback(() => {
    writeSession(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === updates.id);
    if (idx === -1) return { ok: false, error: "User not found." };
    users[idx] = {
      ...users[idx],
      name: updates.name ?? users[idx].name,
      phone: updates.phone ?? users[idx].phone,
    };
    writeUsers(users);
    const session = {
      id: users[idx].id,
      name: users[idx].name,
      email: users[idx].email,
      phone: users[idx].phone || "",
    };
    writeSession(session);
    setUser(session);
    return { ok: true };
  }, []);

  const value = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      signOut,
      updateProfile,
      isAuthenticated: Boolean(user),
    }),
    [user, signIn, signUp, signOut, updateProfile],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { clearSession, setSession, authStorage } from "../store/authSlice.js";

function safeJsonParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const { STORAGE_USERS, STORAGE_SESSION } = authStorage();

  const signOut = () => {
    try {
      localStorage.removeItem(STORAGE_SESSION);
    } catch {
      // ignore
    }
    dispatch(clearSession());
    return { ok: true };
  };

  const signIn = (email, password) => {
    const usersRaw = localStorage.getItem(STORAGE_USERS);
    const users = safeJsonParse(usersRaw, []);

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

    try {
      localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    } catch {
      // ignore
    }
    dispatch(setSession(session));
    return { ok: true };
  };

  const signUp = (name, email, password, phone = "") => {
    const usersRaw = localStorage.getItem(STORAGE_USERS);
    const users = safeJsonParse(usersRaw, []);

    const exists = users.some(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (exists) {
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
    try {
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    } catch {
      // ignore
    }

    const session = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
    };

    try {
      localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    } catch {
      // ignore
    }
    dispatch(setSession(session));
    return { ok: true };
  };

  const updateProfile = (updates) => {
    const usersRaw = localStorage.getItem(STORAGE_USERS);
    const users = safeJsonParse(usersRaw, []);

    const idx = users.findIndex((u) => u.id === updates.id);
    if (idx === -1) {
      return { ok: false, error: "User not found." };
    }

    users[idx] = {
      ...users[idx],
      name: updates.name ?? users[idx].name,
      phone: updates.phone ?? users[idx].phone,
    };

    try {
      localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
    } catch {
      // ignore
    }

    const session = {
      id: users[idx].id,
      name: users[idx].name,
      email: users[idx].email,
      phone: users[idx].phone || "",
    };

    try {
      localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
    } catch {
      // ignore
    }
    dispatch(setSession(session));
    return { ok: true };
  };

  return {
    user,
    isAuthenticated: Boolean(user),
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
}

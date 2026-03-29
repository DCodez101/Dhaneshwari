import { useDispatch, useSelector } from "react-redux";
import { clearSession, setSession, authStorage } from "../store/authSlice.js";
import api from "../api/axios.js";

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

  const { STORAGE_SESSION, STORAGE_TOKEN } = authStorage();

  const signOut = () => {
    try {
      localStorage.removeItem(STORAGE_SESSION);
      localStorage.removeItem(STORAGE_TOKEN);
    } catch {
      // ignore
    }
    dispatch(clearSession());
    return { ok: true };
  };

  const signIn = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const session = {
        id: data?.user?.id || data?.user?._id,
        name: data?.user?.name || "",
        email: data?.user?.email || email.trim().toLowerCase(),
        phone: data?.user?.phone || "",
      };

      localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
      if (data?.token) {
        localStorage.setItem(STORAGE_TOKEN, data.token);
      }
      dispatch(setSession(session));
      return { ok: true };
    } catch (error) {
      const message =
        error?.response?.data?.error || "Unable to sign in. Please try again.";
      return { ok: false, error: message };
    }
  };

  const signUp = async (name, email, password, phone = "") => {
    try {
      await api.post("/auth/signup", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: phone.trim(),
      });
      return signIn(email, password);
    } catch (error) {
      const message =
        error?.response?.data?.error || "Unable to sign up. Please try again.";
      return { ok: false, error: message };
    }
  };

  const updateProfile = (updates) => {
    const sessionRaw = localStorage.getItem(STORAGE_SESSION);
    const currentSession = safeJsonParse(sessionRaw, null);

    if (!currentSession || currentSession.id !== updates.id) {
      return { ok: false, error: "Session not found." };
    }

    const session = {
      id: currentSession.id,
      name: updates.name ?? currentSession.name,
      email: currentSession.email,
      phone: updates.phone ?? currentSession.phone ?? "",
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

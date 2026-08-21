import { createContext, useState, useContext, useEffect } from "react";
import { matchRoute } from "../data/constants";

// ─── AUTH CONTEXT ─────────────────────────────────────────────────────────────
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("se_user")); } catch { return null; }
  });
  const login = (u) => { setUser(u); localStorage.setItem("se_user", JSON.stringify(u)); };
  const logout = () => { setUser(null); localStorage.removeItem("se_user"); };
  const upgradeToHost = () => {
    const updated = { ...user, role: "host" };
    login(updated);
  };
  const upgradeToAdmin = () => {
    const updated = { ...user, role: "admin" };
    login(updated);
  };
  return <AuthContext.Provider value={{ user, login, logout, upgradeToHost, upgradeToAdmin }}>{children}</AuthContext.Provider>;
}

// ─── ROUTER CONTEXT ──────────────────────────────────────────────────────────
const RouterContext = createContext(null);
export const useRouter = () => useContext(RouterContext);

export function RouterProvider({ children }) {
  const [path, setPath] = useState(window.location.hash.slice(1) || "/");
  const navigate = (to) => { window.location.hash = to; setPath(to); };
  useEffect(() => {
    const h = () => setPath(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

// ─── ROUTE COMPONENT ─────────────────────────────────────────────────────────
export function Route({ path: pattern, component: C, protect, hostOnly, adminOnly }) {
  const { path, navigate } = useRouter();
  const { user } = useAuth();
  const params = matchRoute(pattern, path);
  if (!params) return null;
  if (protect && !user) { setTimeout(() => navigate("/login"), 0); return null; }
  if (hostOnly && user?.role !== "host") { setTimeout(() => navigate("/dashboard"), 0); return null; }
  if (adminOnly && user?.role !== "admin") { setTimeout(() => navigate("/"), 0); return null; }
  return <C params={params} />;
}
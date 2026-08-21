import { useEffect } from "react";
import { useAuth, useRouter } from "../context/AuthContext";

export function ProtectedRoute({ children, hostOnly = false, adminOnly = false }) {
  const { user } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (hostOnly && user?.role !== "host") {
      navigate("/dashboard");
    } else if (adminOnly && user?.role !== "admin") {
      navigate("/");
    }
  }, [user, hostOnly, adminOnly, navigate]);

  if (!user) return null;
  if (hostOnly && user?.role !== "host") return null;
  if (adminOnly && user?.role !== "admin") return null;
  return children;
}

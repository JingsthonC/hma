import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/signin", { replace: true });
    }
  }, [navigate, user]);
  return children;
}

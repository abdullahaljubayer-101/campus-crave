import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
          credentials: "include",
        });
        if (res.ok) {
          navigate("/");
        }
      } catch (e) {}
    };
    logout();
  }, []);

  return <></>;
}

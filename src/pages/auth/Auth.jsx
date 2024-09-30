import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.location.pathname.split("/").length == 2)
      navigate("/auth/login");
  }, []);
  return <Outlet />;
}

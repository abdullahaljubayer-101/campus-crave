import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/auth/forgot-password/confirm-email");
  }, []);

  return (
    <div className="flex items-center justify-center mt-20 ">
      <div className="bg-white border border-gray-200 shadow-sm w-96 mt-7 rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="flex flex-col items-center justify-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot Password
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Remember your password?
            </p>
            <Link
              className="text-sm font-medium text-lime-500 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
              to="/auth/login"
            >
              Login
            </Link>
          </div>

          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

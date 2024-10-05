import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [whoIsRegistering, setWhoIsRegistering] = useState();
  const [registerOrEmailVerification, setRegisterOrEmailVerification] =
    useState(false);

  useEffect(() => {
    if (window.location.pathname.split("/").length == 3)
      navigate("/auth/register/customer");
    setWhoIsRegistering(() =>
      window.location.pathname
        .split("/")[3]
        .replace(/\b\w/g, (l) => l.toUpperCase())
    );
    if (window.location.pathname.split("/")[4])
      setRegisterOrEmailVerification(true);
  }, []);

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="bg-white border border-gray-200 shadow-sm w-96 mt-7 rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="flex flex-col items-center justify-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              {!registerOrEmailVerification
                ? `${whoIsRegistering} Register`
                : "Email Verification"}
            </h1>
            {!registerOrEmailVerification && (
              <>
                <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                  Already have an account?
                </p>
                <Link
                  className="text-sm font-medium text-lime-500 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                  to="/auth/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>

          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

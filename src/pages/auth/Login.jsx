import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().min(1, { message: "Required" }).email(),
  password: z.string().min(1, { message: "Required" }),
  remember_me: z.boolean(),
});

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const login = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) {
        setError("root", {
          message: result.msg,
        });
      } else {
        if (result.role == "customer") navigate("/");
        else navigate(`/${result.role}`);
      }
    } catch (e) {
      setError("root", {
        message: "Something went wrong in the server!",
      });
    }

    // console.log(data);
  };

  return (
    <div className="flex items-center justify-center mt-20 ">
      <div className="bg-white border border-gray-200 shadow-sm w-96 mt-7 rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          {/* >register link */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Login
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Don't have an account yet?
            </p>
            <Link
              className="text-sm font-medium text-lime-500 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
              to="/auth/register/customer"
            >
              Register as Customer
            </Link>
            <Link
              className="text-sm font-medium text-lime-500 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
              to="/auth/register/vendor"
            >
              Register as Vendor
            </Link>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(login)}>
              <div className="grid gap-y-4">
                {/* >email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm dark:text-white"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      {...register("email")}
                      type="text"
                      id="email"
                      name="email"
                      className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      aria-describedby="email-error"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-500" id="email-error">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* >password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm dark:text-white"
                    >
                      Password
                    </label>
                    <Link
                      className="inline-flex items-center text-sm font-medium text-lime-500 gap-x-1 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                      to="/auth/forgot-password"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type="password"
                      id="password"
                      name="password"
                      className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      aria-describedby="password-error"
                    />
                  </div>
                  {errors.password && (
                    <p
                      className="mt-2 text-xs text-red-500"
                      id="password-error"
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* >remember me */}
                <div className="flex items-center">
                  <div className="flex">
                    <input
                      {...register("remember_me")}
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-lime-400 focus:ring-lime-400 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ms-3">
                    <label
                      htmlFor="remember_me"
                      className="text-sm dark:text-white"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                {/* >login */}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-black border border-transparent rounded-lg bg-lime-400 gap-x-2 hover:bg-lime-500 focus:outline-none focus:bg-lime-600 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {isSubmitting && (
                    <span
                      class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-black rounded-full"
                      role="status"
                      aria-label="loading"
                    ></span>
                  )}
                  Login
                </button>
                {errors.root && (
                  <p className="mt-2 text-xs text-red-500" id="password-error">
                    {errors.root.message}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

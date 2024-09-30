import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Required" })
      .min(6, { message: "Password must contain at least 6 character's" }),
    confirmPassword: z.string().min(1, { message: "Required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const resetPassword = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    navigate("/auth/login");
  };

  return (
    <form onSubmit={handleSubmit(resetPassword)}>
      <div className="grid gap-y-4">
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm dark:text-white"
          >
            Password
          </label>
          <div className="relative">
            {/* >password */}
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
            <p className="mt-2 text-xs text-red-500" id="password-error">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm dark:text-white"
          >
            Confirm Password
          </label>
          <div className="relative">
            {/* >confirmPassword */}
            <input
              {...register("confirmPassword")}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              aria-describedby="confirmPassword-error"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-2 text-xs text-red-500" id="confirmPassword-error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* >reset password */}
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
          Reset Password
        </button>
      </div>
    </form>
  );
}

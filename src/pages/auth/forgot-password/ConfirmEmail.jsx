import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().min(1, { message: "Required" }).email(),
});

export default function ConfirmEmail() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const forgotPassword = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/confirm-email`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        setError("root", {
          message: result.msg,
        });
      } else {
        navigate("/auth/forgot-password/confirm-otp");
      }
    } catch (e) {
      setError("root", {
        message: "Something went wrong in the server!",
      });
    }

    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(forgotPassword)}>
      <div className="grid gap-y-4">
        {/* >email */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm dark:text-white">
            Email
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

        {/* >forgot password */}
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
          Forgot Password
        </button>
        {errors.root && (
          <p className="mt-2 text-xs text-red-500" id="password-error">
            {errors.root.message}
          </p>
        )}
      </div>
    </form>
  );
}

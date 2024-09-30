import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

const schema = z
  .object({
    name: z.string().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Required" }).email(),
    phone: z
      .string()
      .min(1, { message: "Required" })
      .min(11, { message: "Invalid phone number" })
      .max(11, { message: "Invalid phone number" }),
    password: z
      .string()
      .min(1, { message: "Required" })
      .min(6, { message: "Password must contain at least 6 character's" }),
    confirmPassword: z.string().min(1, { message: "Required" }),
    emailVerification: z.boolean(),
    termsAndConditions: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Customer() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const customerRegister = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);

    if (!data.termsAndConditions) {
      setError("termsAndConditions", {
        message: "Accept the Terms and Conditions",
      });
      return;
    }

    if (data.emailVerification)
      navigate("/auth/register/customer/email-verification");
    else navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(customerRegister)}>
      <div className="grid gap-y-4">
        {/* >name */}
        <div>
          <label htmlFor="name" className="block mb-2 text-sm dark:text-white">
            Name
          </label>
          <div className="relative">
            <input
              {...register("name")}
              type="text"
              id="name"
              name="name"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              aria-describedby="name-error"
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-xs text-red-500" id="name-error">
              {errors.name.message}
            </p>
          )}
        </div>

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

        {/* >phone */}
        <div>
          <label htmlFor="phone" className="block mb-2 text-sm dark:text-white">
            Phone
          </label>
          <div className="relative">
            <input
              {...register("phone")}
              type="number"
              id="phone"
              name="phone"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              aria-describedby="phone-error"
            />
          </div>
          {errors.phone && (
            <p className="mt-2 text-xs text-red-500" id="phone-error">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* >password */}
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm dark:text-white"
          >
            Password
          </label>
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
            <p className="mt-2 text-xs text-red-500" id="password-error">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* >confirm password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm dark:text-white"
          >
            Confirm Password
          </label>
          <div className="relative">
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

        {/* >email verification */}
        <div className="flex items-center">
          <div className="flex">
            <input
              {...register("emailVerification")}
              id="emailVerification"
              name="emailVerification"
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded text-lime-400 focus:ring-lime-400 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            />
          </div>
          <div className="ms-3">
            <label
              htmlFor="emailVerification"
              className="text-sm dark:text-white"
            >
              I want to verify my email now
            </label>
          </div>
        </div>

        {/* >terms and conditions */}
        <div className="flex flex-col">
          <div className="flex items-center">
            <input
              {...register("termsAndConditions")}
              id="termsAndConditions"
              name="termsAndConditions"
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded text-lime-400 focus:ring-lime-400 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
              aria-describedby="termsAndConditions-error"
            />
            <div className="ms-3">
              <label
                htmlFor="termsAndConditions"
                className="text-sm dark:text-white"
              >
                I accept the{" "}
                <Link
                  className="text-sm font-medium text-lime-500 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                  to="/terms-and-conditions"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>

          {errors.termsAndConditions && (
            <p
              className="mt-2 text-xs text-red-500"
              id="termsAndConditions-error"
            >
              {errors.termsAndConditions.message}
            </p>
          )}
        </div>

        {/* >customer register */}
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
          Register
        </button>
      </div>
    </form>
  );
}

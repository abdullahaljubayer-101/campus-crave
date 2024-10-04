import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const schema = z.object({
  otp: z
    .string()
    .min(1, { message: "Required" })
    .min(6, { message: "OTP must contain 6 digit's" })
    .max(6, { message: "OTP must contain 6 digit's" }),
});

export default function ConfirmOTP() {
  const [encryptedEmail, setEncryptedEmail] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const sendOTP = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/send-otp`,
          {
            method: "post",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject: "Forgot Password" }),
          }
        );
        const result = await res.json();
        if (res.ok) {
          setEncryptedEmail(result.msg);
        } else {
          setError("root", {
            message: "Something went wrong in the server!",
          });
        }
      } catch (e) {
        setError("root", {
          message: "Something went wrong in the server!",
        });
      }
    };
    sendOTP();
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const otp = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/confirm-otp`,
        {
          method: "post",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp: data.otp, subject: "Forgot Password" }),
        }
      );
      const result = await res.json();
      if (res.ok) {
        navigate("/auth/forgot-password/reset-password");
      } else {
        setError("root", {
          message: result.msg,
        });
      }
    } catch (e) {
      setError("root", {
        message: "Something went wrong in the server!",
      });
    }

    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(otp)}>
      <div className="grid gap-y-4">
        {/* >otp */}
        <div>
          <label htmlFor="otp" className="block mb-2 text-sm dark:text-white">
            OPT
          </label>
          <p className="my-2 text-xs text-black" id="otp-error">
            {encryptedEmail}
          </p>
          <div className="relative">
            <input
              {...register("otp")}
              type="text"
              id="otp"
              name="otp"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              aria-describedby="otp-error"
            />
          </div>
          {errors.otp && (
            <p className="mt-2 text-xs text-red-500" id="otp-error">
              {errors.otp.message}
            </p>
          )}
        </div>

        {/* >confirm otp */}
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
          Confirm OTP
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

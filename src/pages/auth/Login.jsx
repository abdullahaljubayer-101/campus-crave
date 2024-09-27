import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const schema = z.object({
  email: z.string().min(1, { message: "Required" }).email(),
  password: z
    .string()
    .min(1, { message: "Required" })
    .min(6, { message: "Password must contain at least 6 character(s)" }),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "test@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  const login = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setError("root", {
      message: "This email is already taken",
    });
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="flex flex-col items-center justify-center gap-2 mt-10"
    >
      {/* email */}
      <InputText {...register("email")} type="text" placeholder="email" />
      {errors.email && (
        <small className="text-red-400">{errors.email.message}</small>
      )}

      {/* password */}
      <InputText
        {...register("password")}
        type="password"
        placeholder="password"
      />
      {errors.password && (
        <small className="text-red-400">{errors.password.message}</small>
      )}

      {/* submit */}
      <Button
        disabled={isSubmitting}
        loading={isSubmitting}
        type="submit"
        label="Submit"
      />
      {errors.root && (
        <small className="text-red-400">{errors.root.message}</small>
      )}
    </form>
  );
}

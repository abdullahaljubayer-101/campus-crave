import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Badge from "../../components/Badge";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const [user, setUser] = useState({});
  const [vendor, setVendor] = useState({});
  useEffect(() => {
    getUser();
    getVendor();
  }, []);

  const getUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/get-user`, {
        credentials: "include",
      });
      const result = await res.json();
      setUser(result);
    } catch (e) {}
  };
  const getVendor = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/get-vendor`,
        {
          credentials: "include",
        }
      );
      const result = await res.json();
      setVendor(result);
    } catch (e) {}
  };

  return (
    <>
      {user.id && (
        <div className="space-y-16">
          <Status user={user} />
          <p className="text-lg font-medium">Vendor Information</p>
          {vendor.id && (
            <>
              <VendorDisplayPicture vendor={vendor} />
              <VendorInfo vendor={vendor} />
            </>
          )}
          <p className="text-lg font-medium">User Information</p>
          <DisplayPicture user={user} />
          <Info user={user} />
          <ChangePassword />
          <DeleteAccount />
        </div>
      )}
    </>
  );
}

export function Status({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <div className="flex space-x-4">
        <Badge
          text={user.is_approved ? "Approved" : "Not Approved"}
          isOkay={user.is_approved}
        />
        <Badge
          text={
            user.is_email_verified ? "Email Verified" : "Email Not Verified"
          }
          isOkay={user.is_email_verified}
        />
      </div>

      {/* >email verified */}
      <button
        onClick={async () => {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/send-otp`,
            {
              method: "post",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ subject: "Email Verification" }),
            }
          );
          const result = await res.json();
          navigate("/auth/register/vendor/email-verification");
        }}
        disabled={user.is_email_verified}
        type="submit"
        className="inline-flex items-center justify-center w-auto px-4 py-3 text-sm font-medium text-black border border-transparent rounded-lg bg-lime-400 gap-x-2 hover:bg-lime-500 focus:outline-none focus:bg-lime-600 disabled:opacity-50 disabled:pointer-events-none"
      >
        Verify Email
      </button>
    </div>
  );
}

export function VendorDisplayPicture({ vendor }) {
  const MAX_FILE_SIZE = 5000000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const schema = z.object({
    avatar: z
      .any()
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        message: ".jpg, .jpeg, .png and .webp files are accepted.",
      })
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
        message: "Max file size is 5MB.",
      }),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const uploadAvatar = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    var formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/upload-vendor-avatar`,
      {
        method: "post",
        credentials: "include",
        body: formData,
      }
    );
    const result = await res.json();
  };

  const [DP, setDP] = useState();
  useEffect(() => {
    downloadAvatar();
  }, []);

  const downloadAvatar = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/download-vendor-avatar`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: vendor.img }),
      }
    );
    const result = await res.blob();
    const imageUrl = URL.createObjectURL(result);
    setDP(imageUrl);
  };

  return (
    <div className="flex items-center justify-between">
      {vendor && (
        <img
          className="object-cover rounded-full w-36 h-36"
          src={vendor.img ? DP : "../src/assets/avatar-default.svg"}
          alt=""
        />
      )}

      <form onSubmit={handleSubmit(uploadAvatar)} className="space-y-4 ">
        {/* >choose file */}
        <div>
          <label htmlFor="vendorAvatar" className="sr-only">
            Choose file
          </label>
          <input
            {...register("avatar")}
            type="file"
            name="avatar"
            id="vendorAvatar"
            className="block w-full text-sm border border-gray-200 rounded-lg shadow-sm focus:border-lime-400 focus:ring-lime-400 active:border-lime-400 active:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
          />
          {errors.avatar && (
            <p className="mt-2 text-xs text-red-500" id="avatar-error">
              {errors.avatar.message}
            </p>
          )}
        </div>

        {/* >change vendor display picture */}
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
          Change Display Picture
        </button>
      </form>
    </div>
  );
}

export function VendorInfo({ vendor }) {
  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    description: z.string().min(1, { message: "Required" }),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: vendor.name,
      description: vendor.description,
    },
  });

  const updateInformation = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/update-vendor-information`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
        }),
      }
    );
    const result = await res.json();

    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(updateInformation)}>
      <div className="grid gap-y-4">
        {/* >name */}
        <div>
          <label
            htmlFor="vendorName"
            className="block mb-2 text-sm dark:text-white"
          >
            Vendor Name
          </label>
          <div className="relative">
            <input
              {...register("name")}
              type="text"
              id="vendorName"
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

        {/* >description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm dark:text-white"
          >
            Description
          </label>
          <div className="relative">
            {/* <input
              {...register("description")}
              type="text"
              id="description"
              name="description"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              aria-describedby="description-error"
            /> */}
            <textarea
              {...register("description")}
              id="description"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              rows="4"
            ></textarea>
          </div>
          {errors.description && (
            <p className="mt-2 text-xs text-red-500" id="description-error">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* >update information */}
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
          Update Information
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

export function DisplayPicture({ user }) {
  const MAX_FILE_SIZE = 5000000;
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const schema = z.object({
    avatar: z
      .any()
      .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
        message: ".jpg, .jpeg, .png and .webp files are accepted.",
      })
      .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
        message: "Max file size is 5MB.",
      }),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const uploadAvatar = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    var formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/upload-avatar`, {
      method: "post",
      credentials: "include",
      body: formData,
    });
    const result = await res.json();
  };

  const [DP, setDP] = useState();
  useEffect(() => {
    downloadAvatar();
  }, []);
  const downloadAvatar = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/download-avatar?`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: user.img }),
      }
    );
    const result = await res.blob();
    const imageUrl = URL.createObjectURL(result);
    setDP(imageUrl);
  };

  return (
    <div className="flex items-center justify-between">
      <img
        className="object-cover rounded-full w-36 h-36"
        src={user.img ? DP : "../src/assets/avatar-default.svg"}
        alt=""
      />

      <form onSubmit={handleSubmit(uploadAvatar)} className="space-y-4 ">
        {/* >choose file */}
        <div>
          <label htmlFor="avatar" className="sr-only">
            Choose file
          </label>
          <input
            {...register("avatar")}
            type="file"
            name="avatar"
            id="avatar"
            className="block w-full text-sm border border-gray-200 rounded-lg shadow-sm focus:border-lime-400 focus:ring-lime-400 active:border-lime-400 active:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
          />
          {errors.avatar && (
            <p className="mt-2 text-xs text-red-500" id="avatar-error">
              {errors.avatar.message}
            </p>
          )}
        </div>

        {/* >change display picture */}
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
          Change Display Picture
        </button>
      </form>
    </div>
  );
}

export function Info({ user }) {
  const schema = z.object({
    name: z.string().min(1, { message: "Required" }),
    email: z.string().min(1, { message: "Required" }).email(),
    phone: z
      .string()
      .min(1, { message: "Required" })
      .min(11, { message: "Invalid phone number" })
      .max(11, { message: "Invalid phone number" }),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const updateInformation = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/update-information`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
        }),
      }
    );
    const result = await res.json();

    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(updateInformation)}>
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

        {/* >update information */}
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
          Update Information
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

export function ChangePassword() {
  const schema = z
    .object({
      oldPassword: z.string().min(1, { message: "Required" }),
      newPassword: z
        .string()
        .min(1, { message: "Required" })
        .min(6, { message: "Password must contain at least 6 character's" }),
      confirmPassword: z.string().min(1, { message: "Required" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const changePassword = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/change-password`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      }
    );
    const result = await res.json();
    if (!res.ok) {
      setError("root", {
        message: result.msg,
      });
    }

    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(changePassword)}>
      <div className="grid gap-y-4">
        {/* >old password */}
        <div>
          <label
            htmlFor="oldPassword"
            className="block mb-2 text-sm dark:text-white"
          >
            Old Password
          </label>
          <div className="relative">
            <input
              {...register("oldPassword")}
              type="password"
              id="oldPassword"
              name="oldPassword"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              aria-describedby="oldPassword-error"
            />
          </div>
          {errors.oldPassword && (
            <p className="mt-2 text-xs text-red-500" id="oldPassword-error">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        {/* >new password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block mb-2 text-sm dark:text-white"
          >
            New Password
          </label>
          <div className="relative">
            <input
              {...register("newPassword")}
              type="password"
              id="newPassword"
              name="newPassword"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              aria-describedby="newPassword-error"
            />
          </div>
          {errors.newPassword && (
            <p className="mt-2 text-xs text-red-500" id="newPassword-error">
              {errors.newPassword.message}
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

        {/* >change password */}
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
          Change Password
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

export function DeleteAccount() {
  return (
    <button
      type="submit"
      className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-black bg-red-400 border border-transparent rounded-lg gap-x-2 hover:bg-red-500 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none"
    >
      Delete Account
    </button>
  );
}

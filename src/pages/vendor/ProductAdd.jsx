import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  name: z.string().min(1, { message: "Required" }),
  description: z.string().min(1, { message: "Required" }),
  price: z.coerce
    .number({
      required_error: "Postal Code is required",
      invalid_type_error: "Price must be a number",
    })
    .min(1, { message: "Required" }),
  avatar: z
    .any()
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB.",
    }),
});

export default function ProductAdd() {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState([]);
  const [isCategorysError, setIsCategorysError] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const addProduct = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // check categorys error
    if (categorys.length == 0) {
      setIsCategorysError(true);
      return;
    } else setIsCategorysError(false);

    // upload product img
    var formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    const productImgRes = await fetch(
      `${import.meta.env.VITE_API_URL}/upload-product`,
      {
        method: "post",
        credentials: "include",
        body: formData,
      }
    );
    const productImg = await productImgRes.json();

    // insert product
    const productRes = await fetch(
      `${import.meta.env.VITE_API_URL}/product/create`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          price: data.price,
          img: productImg.img,
          categorys: categorys,
        }),
      }
    );
    const product = await productRes.json();
    if (productRes.ok) navigate("/vendor/product/");
  };

  return (
    <form onSubmit={handleSubmit(addProduct)}>
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

        {/* >description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm dark:text-white"
          >
            Description
          </label>
          <div className="relative">
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

        {/* >price */}
        <div>
          <label htmlFor="price" className="block mb-2 text-sm dark:text-white">
            Price
          </label>
          <div className="relative">
            <input
              {...register("price")}
              type="text"
              id="price"
              name="price"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              aria-describedby="price-error"
            />
          </div>
          {errors.price && (
            <p className="mt-2 text-xs text-red-500" id="price-error">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* >category */}
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm dark:text-white"
          >
            Category
          </label>
          <select
            onChange={(e) => setCategorys((p) => [...p, e.target.value])}
            id="category"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg pe-9 focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          >
            <option value="">Select a category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Snacks">Snacks</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverages">Beverages</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Bengali">Bengali</option>
            <option value="Chinese">Chinese</option>
          </select>
          {isCategorysError && (
            <p className="mt-2 text-xs text-red-500" id="category-error">
              Required
            </p>
          )}
          <div className="flex mt-4 space-x-4">
            {categorys.map((category) => (
              <span class="inline-flex items-center gap-x-1.5 py-1.5 ps-3 pe-2 rounded-full text-xs font-medium bg-lime-200 text-gray-800 dark:bg-blue-800/30 dark:text-blue-500">
                {category}
                <button
                  onClick={() =>
                    setCategorys(categorys.filter((item) => item !== category))
                  }
                  type="button"
                  class="shrink-0 size-4 inline-flex text-red-800 items-center justify-center rounded-full bg-red-200  hover:bg-red-300 focus:outline-none focus:bg-red-300 focus:text-red-800 dark:hover:bg-blue-900"
                >
                  <svg
                    class="shrink-0 size-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* >choose file */}
        <div>
          <p className="block mb-2 text-sm dark:text-white">Product Image</p>
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

        {/* >add product */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-black border border-transparent rounded-lg bg-lime-400 gap-x-2 hover:bg-lime-500 focus:outline-none focus:bg-lime-600 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting && (
            <span
              className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-black rounded-full"
              role="status"
              aria-label="loading"
            ></span>
          )}
          Add Product
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

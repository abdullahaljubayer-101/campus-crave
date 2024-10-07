import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductImg from "./ProductImg";

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const productRes = await fetch(
      `${import.meta.env.VITE_API_URL}/product/${params.id}`
    );
    const result = await productRes.json();
    setProduct(() => result);
    // console.log(result);
  };

  return (
    <div className=" mx-[110px] my-10 flex space-x-14">
      <div className="w-1/3 h-[500px] ">
        {product.img && <ProductImg img={product.img} h="h-96" />}
      </div>
      <div className="space-y-4">
        <p className="font-bold">{product.name}</p>
        <p className="text-sm w-96">{product.description}</p>
        <p className="font-medium ">{product.price} tk</p>
        <p className="text-sm font-medium">{product.vendor_name}</p>
        <div className="inline-block px-3 py-2 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
          <div className="flex items-center gap-x-1.5">
            <button
              onClick={() => setQuantity((p) => (p == 1 ? 1 : p - 1))}
              type="button"
              className="inline-flex items-center justify-center text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-md shadow-sm size-6 gap-x-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              <svg
                className="shrink-0 size-3.5"
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
                <path d="M5 12h14"></path>
              </svg>
            </button>
            <input
              className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white"
              type="number"
              value={quantity}
            />
            <button
              onClick={() => setQuantity((p) => p + 1)}
              type="button"
              className="inline-flex items-center justify-center text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-md shadow-sm size-6 gap-x-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
            >
              <svg
                className="shrink-0 size-3.5"
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
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={async () => {
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/customer/cart`,
              {
                method: "post",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  productID: params.id,
                  quantity: quantity,
                }),
              }
            );
            const result = await res.json();
            if (res.ok) {
              alert("Product added to the cart");
            }
          }}
          type="button"
          className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-transparent rounded-lg gap-x-2 bg-lime-200 text-lime-800 hover:bg-lime-300 focus:outline-none focus:bg-lime-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

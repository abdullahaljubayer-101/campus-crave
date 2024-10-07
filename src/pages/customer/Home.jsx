import { useEffect, useState } from "react";
import ProductImg from "./ProductImg";
import ProductCategory from "./ProductCategory";
import { Link } from "react-router-dom";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getProduct();
    getVendors();
  }, []);

  const getProduct = async () => {
    const productRes = await fetch(`${import.meta.env.VITE_API_URL}/product`);
    const result = await productRes.json();
    setProduct(() => result);
    // console.log(result);
  };

  const getVendors = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/vendor`);
    const result = await res.json();
    setVendors(() => result);
    // console.log(result);
  };

  return (
    <div className=" mx-[110px] my-10 flex space-x-14">
      {/* >side bar */}
      <div className="w-1/4 h-[500px] space-y-10">
        {/* >search */}
        <div className="max-w-sm space-y-3">
          <input
            onChange={(e) => setSearchKey(() => e.target.value)}
            type="text"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Search"
          />
          <button
            onClick={async () => {
              if (searchKey !== "") {
                const productRes = await fetch(
                  `${import.meta.env.VITE_API_URL}/product/search/${searchKey}`
                );
                const result = await productRes.json();
                setProduct(() => result);
              } else getProduct();
            }}
            type="button"
            className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-transparent rounded-lg gap-x-2 bg-lime-100 text-lime-800 hover:bg-lime-200 focus:outline-none focus:bg-lime-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900"
          >
            Search
          </button>
        </div>

        {/* >category */}
        <div className="max-w-sm space-y-3">
          <select
            onChange={(e) => setCategory(() => e.target.value)}
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
          <button
            onClick={async () => {
              if (category !== "") {
                const productRes = await fetch(
                  `${
                    import.meta.env.VITE_API_URL
                  }/product/categorys/${category}`
                );
                const result = await productRes.json();
                setProduct(() => result);
              } else getProduct();
            }}
            type="button"
            className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-transparent rounded-lg gap-x-2 bg-lime-100 text-lime-800 hover:bg-lime-200 focus:outline-none focus:bg-lime-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900"
          >
            Set Category
          </button>
        </div>

        {/* >vendor */}
        <div className="max-w-sm space-y-3">
          <select
            onChange={(e) => setVendor(() => e.target.value)}
            id="vendor"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg pe-9 focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          >
            <option value="">Select a vendor</option>
            {vendors.map((v) => (
              <option key={v.id} value={v.vendor_name}>
                {v.vendor_name}
              </option>
            ))}
          </select>
          <button
            onClick={async () => {
              if (vendor !== "") {
                const productRes = await fetch(
                  `${import.meta.env.VITE_API_URL}/product/vendors/${vendor}`
                );
                const result = await productRes.json();
                setProduct(() => result);
              } else getProduct();
            }}
            type="button"
            className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-transparent rounded-lg gap-x-2 bg-lime-100 text-lime-800 hover:bg-lime-200 focus:outline-none focus:bg-lime-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900"
          >
            Set Vendor
          </button>
        </div>

        {/* >price range */}
        <div className="max-w-sm space-y-3">
          <div className="flex space-x-2">
            <input
              onChange={(e) => setMin(() => e.target.value)}
              type="text"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Min"
            />
            <input
              onChange={(e) => setMax(() => e.target.value)}
              type="text"
              className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              placeholder="Max"
            />
          </div>
          <button
            onClick={async () => {
              if (min !== "" && max !== "") {
                const productRes = await fetch(
                  `${import.meta.env.VITE_API_URL}/product/price/${min}&${max}`
                );
                const result = await productRes.json();
                setProduct(() => result);
              } else getProduct();
            }}
            type="button"
            className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-transparent rounded-lg gap-x-2 bg-lime-100 text-lime-800 hover:bg-lime-200 focus:outline-none focus:bg-lime-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900"
          >
            Set price range
          </button>
        </div>
      </div>

      {/* product */}
      <div className="flex flex-wrap justify-between w-full h-full gap-10">
        {product.map((p) => (
          <div
            key={p.id}
            className="flex flex-col w-[280px] bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
          >
            <ProductImg img={p.img} />
            <div className="p-4 md:p-5">
              <Link to={`/product/${p.id}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-neutral-400">
                    {p.price} tk
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">
                  {p.vendor_name}
                </p>
                <ProductCategory productID={p.id} />
              </Link>
              <div className="flex mt-2 space-x-2">
                {/* >favorite */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-transparent rounded-lg gap-x-2 bg-lime-100 text-lime-800 hover:bg-lime-200 focus:outline-none focus:bg-lime-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900"
                >
                  <svg
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#3f6212"
                      d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"
                    />
                  </svg>
                </button>
                {/* >cart */}
                <button
                  onClick={async () => {
                    const res = await fetch(
                      `${import.meta.env.VITE_API_URL}/customer/cart`,
                      {
                        method: "post",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ productID: p.id, quantity: 1 }),
                      }
                    );
                    const result = await res.json();
                    if (res.ok) {
                      alert("Product added to the cart");
                    }
                  }}
                  type="button"
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium border border-transparent rounded-lg gap-x-2 bg-lime-100 text-lime-800 hover:bg-lime-200 focus:outline-none focus:bg-lime-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:hover:bg-blue-900 dark:focus:bg-blue-900"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

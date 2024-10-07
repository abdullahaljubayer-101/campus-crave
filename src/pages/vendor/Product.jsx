import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/Badge";

export default function Product() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    // >get vendor
    const vendorRes = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/get-vendor`,
      {
        credentials: "include",
      }
    );
    const vendor = await vendorRes.json();

    // >get product
    const productRes = await fetch(
      `${import.meta.env.VITE_API_URL}/products/vendor/${vendor.id}`
    );
    const result = await productRes.json();
    setProduct(() => result);
    // console.log(result);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border divide-y divide-gray-200 rounded-lg dark:border-neutral-700 dark:divide-neutral-700">
              <div className="flex items-center justify-between px-4 py-3">
                {/* >search */}
                <div className="relative flex max-w-xs">
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg shadow-sm ps-9 focus:z-10 focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Search for items"
                  />
                  <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                    <svg
                      className="text-gray-400 size-4 dark:text-neutral-500"
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
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                  </div>
                  <button
                    onClick={async () => {}}
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-3 ml-4 text-sm font-medium border border-transparent rounded-lg text-lime-800 bg-lime-200 gap-x-2 hover:bg-lime-300 focus:outline-none focus:bg-lime-300 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Search
                  </button>
                </div>

                <div className="space-x-4 ">
                  {/* >add */}
                  <button
                    onClick={() => navigate(`/vendor/product/add`)}
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium border border-transparent rounded-lg text-lime-800 bg-lime-200 gap-x-2 hover:bg-lime-300 focus:outline-none focus:bg-lime-300 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-50 dark:bg-neutral-700">
                    {/* >header */}
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Available
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-end dark:text-neutral-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {/* >body */}
                    {product.map((p) => (
                      <tr key={p.id}>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {p.name}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {p.description.length > 30
                            ? `${p.description.substring(0, 30)}...`
                            : p.description}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {p.price}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          <Badge
                            text={
                              p.is_available ? "Available" : "Not Available"
                            }
                            isOkay={p.is_available}
                          />
                        </td>
                        <td className="px-2 py-4 text-sm font-medium whitespace-nowrap text-end">
                          <button
                            onClick={() => navigate(`/vendor/product/${p.id}`)}
                            type="button"
                            className="inline-flex items-center text-sm font-semibold border border-transparent rounded-lg gap-x-2 text-lime-500 hover:text-lime-600 focus:outline-none focus:text-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

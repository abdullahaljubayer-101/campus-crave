import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    getTotal();
  }, [cart]);

  const getCart = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/customers/cart`, {
      credentials: "include",
    });
    const result = await res.json();
    setCart(() => result);
    // console.log(result);
  };

  const getTotal = () => {
    setTotal(0);
    cart.map((c) => {
      setTotal((p) => p + c.total);
    });
  };

  return (
    <div>
      <div className="flex flex-col mx-[110px]">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border divide-y divide-gray-200 rounded-lg dark:border-neutral-700 dark:divide-neutral-700">
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
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {/* >body */}
                    {cart.map((c) => (
                      <tr key={c.id}>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {c.name}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {c.price}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {c.quantity}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {c.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full mt-10 space-x-4">
          <p className="text-right">Total: {total}</p>
          <button
            onClick={async () => {
              const res = await fetch(
                `${import.meta.env.VITE_API_URL}/customers/confirm-order`,
                {
                  credentials: "include",
                }
              );
              const result = await res.json();
              if (res.ok) {
                alert("OK");
              }
            }}
            type="button"
            className="inline-flex items-center text-sm font-semibold border border-transparent rounded-lg gap-x-2 text-lime-500 hover:text-lime-600 focus:outline-none focus:text-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

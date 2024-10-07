import { useEffect, useState } from "react";

export default function Order() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/customers/order`);
    const result = await res.json();
    setOrder(() => result);
    // console.log(result);
  };

  return (
    <div>
      <div className="flex flex-col">
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
                        Customer Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Vendor Name
                      </th>
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
                    {order.map((o) => (
                      <tr key={o.id}>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {o.user_name}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {o.vendor_name}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {o.product_name}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {o.price}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {o.quantity}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {o.total}
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
    </div>
  );
}

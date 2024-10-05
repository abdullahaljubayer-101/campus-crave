import { useEffect, useState } from "react";
import Badge from "../../components/Badge";
import { useNavigate } from "react-router-dom";

export default function Vendor() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState([]);

  useEffect(() => {
    const getVendor = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/vendor`);
      const result = await res.json();
      setVendor(() => result);
      // console.log(result);
    };
    getVendor();
  }, []);
  return (
    <div>
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="border rounded-lg divide-y divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
              <div class="py-3 px-4">
                {/* >search */}
                <div class="relative max-w-xs">
                  <input
                    type="text"
                    name="hs-table-search"
                    id="hs-table-search"
                    class="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-lime-400 focus:ring-lime-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Search for items"
                  />
                  <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                    <svg
                      class="size-4 text-gray-400 dark:text-neutral-500"
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
                </div>
              </div>
              <div class="overflow-hidden">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead class="bg-gray-50 dark:bg-neutral-700">
                    {/* >header */}
                    <tr>
                      <th
                        scope="col"
                        class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Select
                      </th>
                      <th
                        scope="col"
                        class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Vendor Name
                      </th>
                      <th
                        scope="col"
                        class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Owner Name
                      </th>
                      <th
                        scope="col"
                        class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Verification
                      </th>
                      <th
                        scope="col"
                        class="px-2 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Approved
                      </th>
                      <th
                        scope="col"
                        class="px-2 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                    {/* >body */}
                    {vendor.map((v) => (
                      <tr key={v.user_id}>
                        <td class="py-3 ps-4">
                          <div class="flex items-center h-5">
                            <input
                              id="hs-table-search-checkbox-1"
                              type="checkbox"
                              class="border-gray-200 rounded text-lime-400 focus:ring-lime-400 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                            />
                          </div>
                        </td>
                        <td class="px-2 py-4 whitespace-nowrap text-sm  text-gray-800 dark:text-neutral-200">
                          {v.vendor_name}
                        </td>
                        <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {v.username}
                        </td>
                        <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {v.email}
                        </td>
                        <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          {v.phone}
                        </td>
                        <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          <Badge
                            text={
                              v.is_email_verified
                                ? "Email Verified"
                                : "Email Not Verified"
                            }
                            isOkay={v.is_email_verified}
                          />
                        </td>
                        <td class="px-2 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                          <Badge
                            text={v.is_approved ? "Approved" : "Not Approved"}
                            isOkay={v.is_approved}
                          />
                        </td>
                        <td class="px-2 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button
                            onClick={() =>
                              navigate(`/admin/vendor/${v.user_id}`)
                            }
                            type="button"
                            class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-lime-500 hover:text-lime-600 focus:outline-none focus:text-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
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
    </div>
  );
}

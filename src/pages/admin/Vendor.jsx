import { useEffect, useState } from "react";
import Badge from "../../components/Badge";
import { useNavigate } from "react-router-dom";

export default function Vendor() {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getVendor();
  }, []);

  const getVendor = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/vendor`);
    const result = await res.json();
    setVendor(() => result);
    // console.log(result);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border divide-y divide-gray-200 rounded-lg dark:border-neutral-700 dark:divide-neutral-700">
              <div className="px-4 py-3">
                {/* >search */}
                <div className="relative flex max-w-xs ">
                  <input
                    onChange={(e) => setSearchKey(() => e.target.value)}
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
                    onClick={async () => {
                      if (searchKey !== "") {
                        const res = await fetch(
                          `${
                            import.meta.env.VITE_API_URL
                          }/vendor/search/${searchKey}`
                        );
                        const result = await res.json();
                        setVendor(() => result);
                      } else getVendor();
                    }}
                    type="submit"
                    className="inline-flex items-center justify-center px-4 py-3 ml-4 text-sm font-medium border border-transparent rounded-lg text-lime-800 bg-lime-200 gap-x-2 hover:bg-lime-300 focus:outline-none focus:bg-lime-300 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Search
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
                        Vendor Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Owner Name
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Verification
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3 text-xs font-medium text-gray-500 uppercase text-start dark:text-neutral-500"
                      >
                        Approved
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
                    {vendor.map((v) => (
                      <tr key={v.user_id}>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {v.vendor_name}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {v.username}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {v.email}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          {v.phone}
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          <Badge
                            text={
                              v.is_email_verified
                                ? "Email Verified"
                                : "Email Not Verified"
                            }
                            isOkay={v.is_email_verified}
                          />
                        </td>
                        <td className="px-2 py-4 text-sm text-gray-800 whitespace-nowrap dark:text-neutral-200">
                          <Badge
                            text={v.is_approved ? "Approved" : "Not Approved"}
                            isOkay={v.is_approved}
                          />
                        </td>
                        <td className="px-2 py-4 text-sm font-medium whitespace-nowrap text-end">
                          <button
                            onClick={() =>
                              navigate(`/admin/vendor/${v.user_id}`)
                            }
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
    </div>
  );
}

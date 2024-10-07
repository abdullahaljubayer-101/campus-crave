import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AvatarDefault from "../../assets/avatar-default.svg";
import Badge from "../../components/Badge";

export default function VendorDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState({});
  const [vendorImg, setVendorImg] = useState();
  const [userImg, setUserImg] = useState();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getVendor();
  }, []);
  useEffect(() => {
    getVendorImg();
    getUserImg();
    getProduct();
  }, [vendor]);

  const getVendor = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/vendor/${params.id}`
    );
    const result = await res.json();
    setVendor(() => result);
    // console.log(result);
  };

  const getVendorImg = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/download-vendor-avatar`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: vendor.vendor_img }),
      }
    );
    const result = await res.blob();
    const imageUrl = URL.createObjectURL(result);
    setVendorImg(imageUrl);
  };

  const getUserImg = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/download-avatar`, {
      method: "post",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: vendor.user_img }),
    });
    const result = await res.blob();
    const imageUrl = URL.createObjectURL(result);
    setUserImg(imageUrl);
  };

  const getProduct = async () => {
    const productRes = await fetch(
      `${import.meta.env.VITE_API_URL}/products/vendor/${vendor.vendor_id}`
    );
    const result = await productRes.json();
    setProduct(() => result);
    // console.log(result);
  };

  return (
    <div className="space-y-20">
      <div className="flex justify-between space-x-10">
        {/* >vendor information */}
        <div className="w-full space-y-4">
          <h1 className="font-medium ">Vendor Information</h1>
          <img
            className="object-cover rounded-full w-36 h-36"
            src={vendor.vendor_img ? vendorImg : AvatarDefault}
            alt=""
          />
          <div className="flex ">
            <p className="font-medium w-36">Vendor Name:</p>
            <p>{vendor.vendor_name}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Description :</p>
            <p className="w-80">{vendor.description}</p>
          </div>
        </div>

        {/* >user information */}
        <div className="w-full space-y-4">
          <h1 className="font-medium">User Information</h1>
          <img
            className="object-cover rounded-full w-36 h-36"
            src={vendor.user_img ? userImg : AvatarDefault}
            alt=""
          />
          <div className="flex ">
            <p className="font-medium w-36">User Name:</p>
            <p>{vendor.username}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Email:</p>
            <p>{vendor.email}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Phone:</p>
            <p>{vendor.phone}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Email Verification:</p>
            <p>
              <Badge
                text={
                  vendor.is_email_verified
                    ? "Email Verified"
                    : "Email Not Verified"
                }
                isOkay={vendor.is_email_verified}
              />
            </p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Approved:</p>
            <p className="space-x-4 ">
              <Badge
                text={vendor.is_approved ? "Approved" : "Not Approved"}
                isOkay={vendor.is_approved}
              />
              <button
                disabled={vendor.is_approved}
                onClick={async () => {
                  const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/approved/${params.id}`
                  );
                  const result = await res.json();
                  if (res.ok) {
                    window.location.reload();
                  }
                }}
                type="button"
                class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-lime-500 hover:text-lime-600 focus:outline-none focus:text-lime-500 disabled:opacity-70 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
              >
                Approved
              </button>
            </p>
          </div>
        </div>
      </div>

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
                            onClick={() =>
                              navigate(`/admin/vendor/product/${p.id}`)
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

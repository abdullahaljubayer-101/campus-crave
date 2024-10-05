import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AvatarDefault from "../../assets/avatar-default.svg";
import Badge from "../../components/Badge";

export default function VendorDetails() {
  const params = useParams();
  const [vendor, setVendor] = useState({});
  const [vendorImg, setVendorImg] = useState();
  const [userImg, setUserImg] = useState();

  useEffect(() => {
    getVendor();
  }, []);
  useEffect(() => {
    getVendorImg();
    getUserImg();
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

  return (
    <div className="flex justify-between space-x-10">
      {/* >vendor information */}
      <div className="w-full space-y-4">
        <h1 className="font-medium ">Vendor Information</h1>
        <img
          className="rounded-full w-36 h-36"
          src={vendor.vendor_img ? vendorImg : AvatarDefault}
          alt=""
        />
        <div className="flex ">
          <p className="font-medium w-36">Vendor Name:</p>
          <p>{vendor.vendor_name}</p>
        </div>
        <div className="flex ">
          <p className="font-medium w-36">Description :</p>
          <p>{vendor.description}</p>
        </div>
      </div>

      {/* >user information */}
      <div className="w-full space-y-4">
        <h1 className="font-medium">User Information</h1>
        <img
          className="rounded-full w-36 h-36 "
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
  );
}

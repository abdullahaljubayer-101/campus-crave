import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AvatarDefault from "../../assets/avatar-default.svg";
import Badge from "../../components/Badge";

export default function CustomerDetails() {
  const params = useParams();
  const [customer, setCustomer] = useState({});
  const [customerImg, setCustomerImg] = useState();

  useEffect(() => {
    getCustomer();
  }, []);
  useEffect(() => {
    getCustomerImg();
  }, [customer]);

  const getCustomer = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/customer/${params.id}`
    );
    const result = await res.json();
    setCustomer(() => result);
    // console.log(result);
  };

  const getCustomerImg = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/download-vendor-avatar`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: customer.img }),
      }
    );
    const result = await res.blob();
    const imageUrl = URL.createObjectURL(result);
    setCustomerImg(imageUrl);
  };

  return (
    <div className="space-y-20">
      <div className="flex justify-between space-x-10">
        <div className="w-full space-y-4">
          <img
            className="object-cover rounded-full w-36 h-36"
            src={customerImg}
            alt=""
          />
        </div>
        <div className="w-full space-y-4">
          <div className="flex ">
            <p className="font-medium w-36">Name:</p>
            <p>{customer.name}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Email:</p>
            <p>{customer.email}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Phone:</p>
            <p>{customer.phone}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Email Verification:</p>
            <p>
              <Badge
                text={
                  customer.is_email_verified
                    ? "Email Verified"
                    : "Email Not Verified"
                }
                isOkay={customer.is_email_verified}
              />
            </p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Approved:</p>
            <p className="space-x-4 ">
              <Badge
                text={customer.is_approved ? "Approved" : "Not Approved"}
                isOkay={customer.is_approved}
              />
              <button
                disabled={customer.is_approved}
                onClick={async () => {
                  const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/approved/${
                      customer.user_id
                    }`
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

      {/* order */}
    </div>
  );
}

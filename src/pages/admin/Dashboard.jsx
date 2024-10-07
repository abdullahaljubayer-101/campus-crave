import { useEffect, useState } from "react";

export default function Dashboard() {
  const [order, setOrder] = useState("");
  const [customer, setCustomer] = useState("");
  const [vendor, setVendor] = useState("");

  useEffect(() => {
    countOrder();
    countCustomer();
    countVendor();
  }, []);

  const countOrder = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/count/order`);
    const result = await res.json();
    setOrder(() => result.count);
    // console.log(result);
  };

  const countCustomer = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/count/customer`);
    const result = await res.json();
    setCustomer(() => result.count);
    // console.log(result);
  };

  const countVendor = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/count/vendor`);
    const result = await res.json();
    setVendor(() => result.count);
    // console.log(result);
  };

  console.log(order, vendor, customer);

  return (
    <div className="flex space-x-20 ">
      <div className="flex space-x-4 ">
        <p>Total Order: </p>
        <p>{order}</p>
      </div>
      <div className="flex space-x-4 ">
        <p>Total Vendor: </p>
        <p>{vendor}</p>
      </div>
      <div className="flex space-x-4 ">
        <p>Total Customer: </p>
        <p>{customer}</p>
      </div>
    </div>
  );
}

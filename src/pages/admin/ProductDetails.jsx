import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AvatarDefault from "../../assets/avatar-default.svg";
import Badge from "../../components/Badge";

export default function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [categorys, setCategorys] = useState([]);
  const [vendorImg, setVendorImg] = useState();
  const [productImg, setProductImg] = useState();

  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    getCategorys();
    getVendorImg();
    getProductImg();
  }, [product]);

  const getProduct = async () => {
    const productRes = await fetch(
      `${import.meta.env.VITE_API_URL}/product/${params.id}`
    );
    const result = await productRes.json();
    setProduct(() => result);
    // console.log(result);
  };

  const getCategorys = async () => {
    const productRes = await fetch(
      `${import.meta.env.VITE_API_URL}/product/category/${product.id}`
    );
    const result = await productRes.json();
    setCategorys(() => result);
  };

  const getVendorImg = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/download-vendor-avatar`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: product.vendor_img }),
      }
    );
    const result = await res.blob();
    const imageUrl = URL.createObjectURL(result);
    setVendorImg(imageUrl);
  };

  const getProductImg = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/download-product`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: product.img }),
      }
    );
    const result = await res.blob();
    const imageUrl = URL.createObjectURL(result);
    setProductImg(imageUrl);
  };

  return (
    <div className="space-y-20">
      <div className="flex justify-between space-x-10">
        {/* >vendor information */}
        <div className="w-full space-y-4">
          <h1 className="font-medium ">Vendor Information</h1>
          <img
            className="object-cover rounded-full w-36 h-36"
            src={product.vendor_img ? vendorImg : AvatarDefault}
            alt=""
          />
          <div className="flex ">
            <p className="font-medium w-36">Vendor Name:</p>
            <p>{product.vendor_name}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Description :</p>
            <p className="w-80">{product.vendor_description}</p>
          </div>
        </div>

        {/* >product information */}
        <div className="w-full space-y-4">
          <h1 className="font-medium">Product Information</h1>
          <img
            className="object-cover rounded-full w-36 h-36"
            src={product.img ? productImg : AvatarDefault}
            alt=""
          />
          <div className="flex ">
            <p className="font-medium w-36">Product Name:</p>
            <p>{product.name}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Description:</p>
            <p className=" w-80">{product.description}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Price:</p>
            <p>{product.price}</p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Categorys:</p>
            <p className="space-x-4 ">
              {categorys.map((category) => (
                <Badge text={category.name} isOkay={true} />
              ))}
            </p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Available:</p>
            <p>
              <Badge
                text={product.is_available ? "Available" : "Not Available"}
                isOkay={product.is_available}
              />
            </p>
          </div>
          <div className="flex ">
            <p className="font-medium w-36">Action:</p>
            <p className="space-x-4">
              {/* >update available */}
              <button
                onClick={async () => {
                  const productRes = await fetch(
                    `${import.meta.env.VITE_API_URL}/product/available/${
                      product.id
                    }`
                  );
                  const result = await productRes.json();
                  window.location.reload();
                }}
                type="button"
                className={
                  product.is_available
                    ? "inline-flex items-center text-sm font-semibold text-red-500 border border-transparent rounded-lg gap-x-2 hover:text-red-600 focus:outline-none focus:text-red-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                    : "inline-flex items-center text-sm font-semibold text-lime-500 border border-transparent rounded-lg gap-x-2 hover:text-lime-600 focus:outline-none focus:text-lime-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
                }
              >
                {product.is_available ? "Unavailable" : "Available"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

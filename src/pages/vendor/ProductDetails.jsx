import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Badge from "../../components/Badge";

export default function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [DP, setDP] = useState();
  const params = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    getCategorys();
    downloadAvatar();
  }, [product]);

  const getProduct = async () => {
    const productRes = await fetch(
      `${import.meta.env.VITE_API_URL}/product/vendor/${params.id}`
    );
    const result = await productRes.json();
    setProduct(() => result);
  };

  const getCategorys = async () => {
    const productRes = await fetch(
      `${import.meta.env.VITE_API_URL}/product/category/${product.id}`
    );
    const result = await productRes.json();
    setCategorys(() => result);
  };

  const downloadAvatar = async () => {
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
    setDP(imageUrl);
  };

  console.log(product);

  return (
    <div className="flex justify-between space-x-10">
      {/* >product img */}
      <div className="w-full space-y-4">
        <img
          className="object-cover rounded-full w-36 h-36"
          src={product.img ? DP : "../src/assets/avatar-default.svg"}
          alt=""
        />
      </div>

      {/* >product information */}
      <div className="w-full space-y-4">
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
            {/* >delete */}
            <button
              onClick={async () => {
                const res = await fetch(
                  `${import.meta.env.VITE_API_URL}/product/delete/${params.id}`
                );
                const result = await res.json();
                if (res.ok) navigator("/vendor/product");
              }}
              type="button"
              className="inline-flex items-center text-sm font-semibold text-red-500 border border-transparent rounded-lg gap-x-2 hover:text-red-600 focus:outline-none focus:text-red-500 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
            >
              Delete
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

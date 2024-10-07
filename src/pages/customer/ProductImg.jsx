import { useEffect, useState } from "react";

export default function ProductImg({ img, h = "h-40" }) {
  const [productImg, setProductImg] = useState();

  useEffect(() => {
    getProductImg();
  }, []);

  const getProductImg = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/download-product`,
      {
        method: "post",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: img }),
      }
    );
    const result = await res.blob();
    const imageUrl = URL.createObjectURL(result);
    setProductImg(imageUrl);
  };

  return (
    <img
      className={`object-cover w-full ${h} rounded-t-xl `}
      src={productImg}
      alt="Card Image"
    />
  );
}

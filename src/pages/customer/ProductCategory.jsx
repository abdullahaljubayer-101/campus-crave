import { useEffect, useState } from "react";
import Badge from "../../components/Badge";

export default function ProductCategory({ productID }) {
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    getCategorys();
  }, []);

  const getCategorys = async () => {
    const productRes = await fetch(
      `${import.meta.env.VITE_API_URL}/product/category/${productID}`
    );
    const result = await productRes.json();
    setCategorys(() => result);
  };

  return (
    <div className="flex flex-wrap gap-2 my-2">
      {categorys.map((category) => (
        <Badge text={category.name} isOkay={true} />
      ))}
    </div>
  );
}

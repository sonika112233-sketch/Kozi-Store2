import { useState } from "react";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { img, category, product: name, price, text } = product;
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-fit">
      <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-[20rem] max-sm:m-0.5 max-sm:h-[10.5rem] sm:h-[15rem] md:h-[15rem] lg:h-[15rem] xl:h-[15rem]">
        <img src={img} alt={category} className="object-cover w-full h-full" />
      </div>
      <div className="max-sm:p-2 sm:p-3 xl:p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-cozy-brown">
            {name}
          </p>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-cozy-brown">
            {price}
          </p>
        </div>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
          {text}
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 ${
            added
              ? "bg-green-600 text-white"
              : "bg-cozy-terracotta/10 text-cozy-brown hover:bg-cozy-terracotta/20"
          }`}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

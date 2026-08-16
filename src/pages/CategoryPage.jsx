import { useState } from "react";
import { productData } from "../data/productData";
import ProductGrid from "../components/ProductGrid";
import CategoryHeader from "../components/CategoryHeader";

function CategoryPage({ title, category }) {
  const [activeFilter, setActiveFilter] = useState("SNEAKER");

  const products = productData.filter((p) => {
    const matchesCategory = category ? p.category === category : true;
    const matchesType = (p.type || "").toUpperCase() === activeFilter;
    return matchesCategory && matchesType;
  });

  return (
    <main className="h-fit mb-[10rem] w-[100%] mx-auto">
      <CategoryHeader
        title={title}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <article className="w-[90%] mx-auto max-sm:w-[98%] max-sm:mx-auto">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-center text-gray-500 py-20">
            No {activeFilter.toLowerCase()}s available in this category yet.
          </p>
        )}
      </article>
    </main>
  );
}

export default CategoryPage;
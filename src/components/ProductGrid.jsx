import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="mx-auto grid gap-[0.5rem] max-sm:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-sm:gap-[0.2rem]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;

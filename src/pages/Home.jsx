import { useNavigate } from "react-router-dom";
import { productData } from "../data/productData";
import ProductGrid from "../components/ProductGrid";
import poster from "../assets/poster.jpg";

function Home() {
  const navigate = useNavigate();
  const featured = productData.filter((p) => p.category === "Woman");

  return (
    <main className="h-fit mb-[10rem] w-[100%] mx-auto">
      {/* img 1 */}
      <div className="relative w-[90%] mx-auto max-sm:h-[25rem] max-sm:w-full sm:h-full sm:w-full xl:h-[50rem]">
        <img src={poster} alt="Poster" className="w-full h-full object-cover" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-none tracking-tight mb-4">
            ALWAYS BE
            <br />
            ORIGINAL
          </h1>
          <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl mb-8">
            NEW ARRIVALS ARE HERE
          </p>
          <button
            onClick={() => navigate("/all")}
            className="bg-transparent border-[2px] border-white text-white font-semibold py-3 px-10 rounded-full text-base sm:text-lg hover:bg-cozy-terracotta hover:border-cozy-terracotta hover:text-white transition-colors duration-300"
          >
            Shop Now
          </button>
        </div>
        <div className="absolute bottom-4 right-4">
          <button className="bg-white p-2 rounded-full shadow-md">⚪</button>
        </div>
      </div>
      {/* img 1 */}

      <h1 className="my-[2.5rem] flex justify-center text-[1.5rem] font-bold text-cozy-brown">
        LIMITED EDITION COLLECTION
      </h1>

      {/* Product-card */}
      <article className="w-[100%] mx-auto max-sm:mx-auto">
        <div className="w-[90%] mx-auto max-sm:w-[98%] max-sm:mx-auto">
          <ProductGrid products={featured} />
        </div>
      </article>
      {/* Product-card */}
    </main>
  );
}

export default Home;

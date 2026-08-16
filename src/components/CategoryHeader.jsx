import { useEffect, useState } from "react";

const filters = [
  {
    label: "SNEAKER",
    classes:
      "text-white bg-cozy-brown hover:bg-cozy-dark focus:ring-cozy-tan",
  },
  {
    label: "BOOT",
    classes:
      "text-cozy-brown bg-cozy-beige border border-cozy-tan hover:bg-cozy-tan/60 focus:ring-cozy-tan",
  },
  {
    label: "SANDAL",
    classes:
      "text-white bg-cozy-terracotta hover:bg-cozy-terracotta-dark focus:ring-cozy-tan",
  },
  {
    label: "HEEL",
    classes:
      "text-white bg-cozy-dark hover:bg-black focus:ring-cozy-tan",
  },
];

function CategoryHeader({ title, activeFilter, onFilterChange }) {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setFloating(window.scrollY > 220);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Normal inline filter bar */}
      <article className="w-[90%] mx-auto flex flex-col items-center gap-4 xl:flex-row xl:justify-between xl:items-center my-[1rem]">
        <div>
          {filters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              onClick={() => onFilterChange(filter.label)}
              className={`focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-4 transition-transform ${
                filter.classes
              } ${
                activeFilter === filter.label
                  ? "ring-4 ring-offset-2 scale-105"
                  : ""
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <h1 className="text-[1.5em] font-bold text-center xl:absolute xl:left-1/2 xl:-translate-x-1/2">
          {title}
        </h1>
      </article>

      {/* Floating vertical rail, desktop only, fades in once scrolled past the inline bar */}
      <div
        className={`hidden xl:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 transition-all duration-300 ease-out ${
          floating
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-4 pointer-events-none"
        }`}
      >
        {filters.map((filter) => (
          <button
            key={filter.label}
            type="button"
            onClick={() => onFilterChange(filter.label)}
            className={`focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 shadow-lg transition-transform ${
              filter.classes
            } ${
              activeFilter === filter.label
                ? "ring-4 ring-offset-2 scale-105"
                : ""
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default CategoryHeader;
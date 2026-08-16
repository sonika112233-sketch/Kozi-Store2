import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { label: "ALL", to: "/all" },
  { label: "WOMAN", to: "/woman" },
  { label: "MAN", to: "/man" },
  { label: "KID", to: "/kid" },
  { label: "STORE", to: "/store" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { total, itemCount } = useCart();
  const { user } = useAuth();
  const accountLink = { label: "ACCOUNT", to: user ? "/dashboard" : "/account" };

  return (
    <header className="sticky top-0 z-50 w-full bg-cozy-cream">
      <div>
        <article className="flex bg-cozy-dark text-cozy-cream font-bold">
          <h3 className="mx-auto py-[5px]">FREE SHIPPING IN CAMBODIA</h3>
        </article>

        <nav className="bg-cozy-cream shadow-lg relative z-10">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-cozy-brown tracking-wide">
              Kozi Store
            </Link>

            <div className="hidden xl:flex xl:items-center xl:space-x-8">
              <ul className="flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-8 mt-4 xl:mt-0 text-center">
                {[...navLinks, accountLink].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-cozy-brown/70 hover:text-cozy-terracotta transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-cozy-brown hidden md:block">
                TOTAL :{" "}
                <span className="text-cozy-terracotta font-medium">
                  {total.toFixed(2)} $
                </span>
              </span>
              <Link
                to="/cart"
                className="relative text-cozy-brown/70 hover:text-cozy-terracotta transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.953.66 2.585A1.5 1.5 0 0017 17.5a1.5 1.5 0 001.5-1.5c0-.63-.182-1.953-.66-2.585L17.5 13H7zm11 0a2 2 0 11-4 0 2 2 0 014 0zm-1-6.5a1.5 1.5 0 01-3 0V6a1.5 1.5 0 013 0v.5z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-cozy-terracotta text-[10px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="xl:hidden text-cozy-brown/70 hover:text-cozy-terracotta transition-colors duration-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="absolute inset-x-0 top-full bg-cozy-cream shadow-lg overflow-hidden transition-all duration-500 ease-in-out xl:hidden"
            style={{ maxHeight: menuOpen ? "24rem" : "0px" }}
          >
            <ul className="flex flex-col py-4 px-6 space-y-4 text-center">
              {[...navLinks, accountLink].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-cozy-brown/70 hover:text-cozy-terracotta transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;

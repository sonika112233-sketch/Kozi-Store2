import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, increment, decrement, removeItem, clearCart, total } =
    useCart();

  if (cart.length === 0) {
    return (
      <main className="flex-grow flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Your cart is empty
        </h1>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/all"
          className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow w-[90%] max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white rounded-xl shadow-md p-4"
          >
            <img
              src={item.img}
              alt={item.product}
              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
            />

            <div className="flex-grow min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {item.product}
              </p>
              <p className="text-sm text-gray-500">{item.price} each</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decrement(item.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-6 text-center font-medium">{item.qty}</span>
              <button
                onClick={() => increment(item.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <p className="w-20 text-right font-semibold text-gray-900">
              {(parseFloat(item.price) * item.qty).toFixed(2)} $
            </p>

            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-600 transition-colors"
              aria-label="Remove item"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 bg-white rounded-xl shadow-md p-6">
        <button
          onClick={clearCart}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors underline"
        >
          Clear cart
        </button>

        <div className="flex items-center gap-6">
          <p className="text-xl font-bold text-gray-900">
            Total: <span className="text-blue-700">{total.toFixed(2)} $</span>
          </p>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cart;

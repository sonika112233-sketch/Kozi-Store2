import { Link } from "react-router-dom";

function OrderConfirmation() {
  return (
    <main className="flex-grow flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Order placed! 🎉</h1>
      <p className="text-gray-500 mb-6">Thanks for your order — a confirmation has been sent to your email.</p>
      <Link to="/" className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700">
        Back to Home
      </Link>
    </main>
  );
}

export default OrderConfirmation;
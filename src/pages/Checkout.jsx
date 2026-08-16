import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";

function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", zip: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await addDoc(collection(db, "orders"), {
        uid: user ? user.uid : null,
        customerEmail: user ? user.email : form.email,
        shipping: form,
        items: cart.map((item) => ({
          id: item.id,
          product: item.product,
          price: item.price,
          qty: item.qty,
        })),
        total,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      clearCart();
      navigate("/order-confirmation");
    } catch {
      setError(
        "We couldn't place your order right now. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    // guard against someone landing here with nothing in cart
    navigate("/cart");
    return null;
  }

  return (
    <main className="w-[90%] max-w-4xl mx-auto my-10 grid md:grid-cols-2 gap-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold text-cozy-brown">Shipping Details</h1>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </p>
        )}
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="w-full border border-cozy-tan rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta" />
        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full border border-cozy-tan rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta" />
        <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="w-full border border-cozy-tan rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta" />
        <div className="flex gap-4">
          <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="w-full border border-cozy-tan rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta" />
          <input name="zip" value={form.zip} onChange={handleChange} required placeholder="ZIP" className="w-full border border-cozy-tan rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cozy-terracotta focus:border-cozy-terracotta" />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-cozy-terracotta text-white font-semibold py-3 rounded-lg hover:bg-cozy-terracotta-dark disabled:opacity-60"
        >
          {submitting ? "Placing order…" : "Place Order"}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-md p-6 h-fit border border-cozy-tan/40">
        <h2 className="text-xl font-bold mb-4 text-cozy-brown">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-2 border-b border-cozy-beige text-cozy-brown">
            <span>{item.product} × {item.qty}</span>
            <span>{(parseFloat(item.price) * item.qty).toFixed(2)} $</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg mt-4 text-cozy-brown">
          <span>Total</span>
          <span>{total.toFixed(2)} $</span>
        </div>
      </div>
    </main>
  );
}

export default Checkout;

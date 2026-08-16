import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { db } from "../firebase/firebase";

function StatCard({ label, value, accent }) {
  return (
    <div className="bg-white rounded-2xl border border-cozy-tan/40 p-6 shadow-sm">
      <p className="text-sm text-cozy-brown/60 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${accent ? "text-cozy-terracotta" : "text-cozy-brown"}`}>
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-100 text-amber-700",
    shipped: "bg-blue-100 text-blue-700",
    delivered: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
        styles[status] || "bg-cozy-beige text-cozy-brown"
      }`}
    >
      {status || "pending"}
    </span>
  );
}

function CustomerDashboard({ user }) {
  const { cart, itemCount, total } = useCart();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setOrdersLoading(false);
      },
      () => setOrdersLoading(false)
    );
    return unsubscribe;
  }, [user.uid]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard label="Past orders" value={orders.length} />
        <StatCard label="Items in cart" value={itemCount} />
        <StatCard label="Cart total" value={`${total.toFixed(2)} $`} accent />
      </div>

      <div className="bg-white rounded-2xl border border-cozy-tan/40 p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-cozy-brown mb-4">Your orders</h2>
        {ordersLoading ? (
          <p className="text-cozy-brown/60">Loading orders…</p>
        ) : orders.length === 0 ? (
          <p className="text-cozy-brown/60">You haven't placed any orders yet.</p>
        ) : (
          <ul className="divide-y divide-cozy-beige">
            {orders.map((order) => (
              <li key={order.id} className="py-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-cozy-brown/50">
                    Order #{order.id.slice(0, 8)}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cozy-brown">{order.items?.length || 0} item(s)</span>
                  <span className="font-medium text-cozy-brown">
                    {Number(order.total || 0).toFixed(2)} $
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-cozy-tan/40 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-cozy-brown mb-4">Current cart</h2>
        {cart.length === 0 ? (
          <p className="text-cozy-brown/60">
            Your cart is empty. Browse the store to add something cozy.
          </p>
        ) : (
          <ul className="divide-y divide-cozy-beige">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <span className="text-cozy-brown">
                  {item.product} <span className="text-cozy-brown/50">× {item.qty}</span>
                </span>
                <span className="text-cozy-brown font-medium">{item.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setOrdersLoading(false);
      },
      () => setOrdersLoading(false)
    );
    return unsubscribe;
  }, []);

  const revenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const pendingCount = orders.filter((o) => (o.status || "pending") === "pending").length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard label="Total orders" value={orders.length} />
        <StatCard label="Pending orders" value={pendingCount} />
        <StatCard label="Total revenue" value={`${revenue.toFixed(2)} $`} accent />
      </div>

      <div className="bg-white rounded-2xl border border-cozy-tan/40 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-cozy-brown mb-4">All orders</h2>
        {ordersLoading ? (
          <p className="text-cozy-brown/60">Loading orders…</p>
        ) : orders.length === 0 ? (
          <p className="text-cozy-brown/60">No orders have been placed yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-cozy-brown/50 border-b border-cozy-beige">
                  <th className="py-2 pr-4">Order</th>
                  <th className="py-2 pr-4">Customer</th>
                  <th className="py-2 pr-4">Items</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-cozy-beige/60">
                    <td className="py-3 pr-4 text-cozy-brown/50">#{order.id.slice(0, 8)}</td>
                    <td className="py-3 pr-4 text-cozy-brown">{order.customerEmail || "—"}</td>
                    <td className="py-3 pr-4 text-cozy-brown">{order.items?.length || 0}</td>
                    <td className="py-3 pr-4 text-cozy-brown font-medium">
                      {Number(order.total || 0).toFixed(2)} $
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

function Dashboard() {
  const { user, profile, isAdmin, loading, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/account");
    }
  }, [loading, user, navigate]);

  if (loading || !user || !profile) {
    return (
      <main className="min-h-[50vh] flex items-center justify-center text-cozy-brown/60">
        Loading…
      </main>
    );
  }

  const handleLogOut = async () => {
    await logOut();
    navigate("/account");
  };

  return (
    <main className="bg-cozy-cream min-h-[70vh]">
      <div className="w-[90%] max-w-5xl mx-auto py-12">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cozy-terracotta mb-1">
              {isAdmin ? "Admin Dashboard" : "Dashboard"}
            </p>
            <h1 className="text-3xl font-bold text-cozy-brown">
              Welcome back{profile.displayName ? `, ${profile.displayName}` : ""}
            </h1>
            <p className="text-cozy-brown/60 mt-1">{user.email}</p>
          </div>
          <button
            onClick={handleLogOut}
            className="px-5 py-2.5 rounded-xl border border-cozy-tan text-cozy-brown hover:bg-cozy-beige transition-colors font-medium"
          >
            Log out
          </button>
        </div>

        {isAdmin ? <AdminDashboard /> : <CustomerDashboard user={user} />}
      </div>
    </main>
  );
}

export default Dashboard;

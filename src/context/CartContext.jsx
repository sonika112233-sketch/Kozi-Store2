import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "INCREMENT":
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
      );
    case "DECREMENT":
      return state
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

function init() {
  try {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], init);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // ignore storage errors (e.g. private browsing)
    }
  }, [cart]);

  const addItem = (product) =>
    dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } });
  const increment = (id) => dispatch({ type: "INCREMENT", payload: { id } });
  const decrement = (id) => dispatch({ type: "DECREMENT", payload: { id } });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.qty,
    0
  );
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const value = {
    cart,
    addItem,
    removeItem,
    increment,
    decrement,
    clearCart,
    total,
    itemCount,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

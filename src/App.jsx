import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/all"
            element={<CategoryPage title="NEW ARRIVALS" category={null} />}
          />
          <Route
            path="/woman"
            element={<CategoryPage title="WOMAN STORE" category="Woman" />}
          />
          <Route
            path="/man"
            element={<CategoryPage title="MAN STORE" category="Man" />}
          />
          <Route
            path="/kid"
            element={<CategoryPage title="KID STORE" category="Kid" />}
          />
          <Route 
            path="/checkout" 
            element={<Checkout />} 
          />
          <Route 
            path="/order-confirmation" 
            element={<OrderConfirmation />} 
          />
          <Route 
            path="/store" 
            element={<Store />} 
          />
          <Route 
            path="/account" 
            element={<Account />} 
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
          <Route 
            path="/cart" 
            element={<Cart />} 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

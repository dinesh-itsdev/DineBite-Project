import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import AIFood from "./pages/AIFood";
import AddFood from "./pages/AddFood";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/restaurants" element={<Restaurants />} />

                <Route path="/food/:id" element={<FoodDetails />} />

                <Route path="/cart" element={<Cart />} />

                <Route path="/checkout" element={<Checkout />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/orders" element={<Orders />} />

                <Route path="/ai-food" element={<AIFood />} />

                <Route path="/add-food" element={<AddFood />} />

            </Routes>
        </>
    );
}

export default App;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import API_URL from "../api.js";

function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    cartCount,
    cartTotal,
    user,
    setCart,
  } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Free delivery above ₹500
  const deliveryFee = cartTotal >= 500 ? 0 : 99;

  const grandTotal = cartTotal + deliveryFee;

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    setError("");

    // Check login
    if (!user || !user.id) {
      setError("Please login before placing an order.");
      return;
    }

    // Check cart
    if (!cart || cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // Check delivery details
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.pincode.trim()
    ) {
      setError("Please fill in all delivery details.");
      return;
    }

    // Validate phone
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validate pincode
    if (!/^[0-9]{6}$/.test(formData.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // ORDER DATA
      // =========================
      const orderData = {
        totalAmount: grandTotal,
        customerName: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),

        // Backend can store this if your Order
        // entity contains PAYMENT_METHOD.
        paymentMethod: paymentMethod,

        status: "PLACED",
      };

      console.log("Sending order to backend:", orderData);
      console.log("User ID:", user.id);

      // =========================
      // SEND TO SPRING BOOT
      // =========================
      const response = await fetch(
        `${API_URL}/api/orders/user/${user.id}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );

      // Read response
      const text = await response.text();

      let data = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      // Backend error
      if (!response.ok) {
        const message =
          data?.message ||
          data?.error ||
          text ||
          "Failed to place order.";

        throw new Error(message);
      }

      console.log("Order saved successfully:", data);

      // =========================
      // CLEAR CART
      // =========================
      if (setCart) {
        setCart([]);
      } else {
        localStorage.removeItem("dinebite_cart");
      }

      // Remove old browser-only orders
      // because orders are now stored in Oracle.
      localStorage.removeItem("dinebite_orders");

      // =========================
      // GO TO ORDERS PAGE
      // =========================
      navigate("/orders");
    } catch (err) {
      console.error("Place order error:", err);

      if (err.message === "Failed to fetch") {
        setError(
          "Cannot connect to backend. Make sure Spring Boot is running on port 8080."
        );
      } else {
        setError(
          err.message || "Failed to place order. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // EMPTY CART
  // =========================
  if (!cart || cart.length === 0) {
    return (
      <main className="checkout-empty-page">
        <div className="checkout-empty-box">

          <span className="checkout-empty-label">
            CHECKOUT
          </span>

          <h1>Your cart is empty</h1>

          <p>
            Add some delicious dishes before proceeding
            to checkout.
          </p>

          <Link
            to="/restaurants"
            className="primary-btn"
          >
            Browse Food
          </Link>

        </div>
      </main>
    );
  }

  // =========================
  // CHECKOUT PAGE
  // =========================
  return (
    <main className="checkout-page">

      {/* ================= HEADER ================= */}

      <section className="checkout-header">

        <div className="checkout-container">

          <Link
            to="/cart"
            className="checkout-back"
          >
            ← Back to Cart
          </Link>

          <span className="section-label">
            SECURE CHECKOUT
          </span>

          <h1>
            Complete your order.
          </h1>

          <p>
            Enter your delivery details and choose your
            preferred payment method.
          </p>

        </div>

      </section>

      {/* ================= CONTENT ================= */}

      <section className="checkout-content">

        <div className="checkout-container">

          <div className="checkout-grid">

            {/* ================= LEFT ================= */}

            <div className="checkout-form-area">

              <form onSubmit={handlePlaceOrder}>

                {/* ================= DELIVERY ================= */}

                <div className="checkout-card">

                  <div className="checkout-card-header">

                    <div>

                      <span className="checkout-step">
                        01
                      </span>

                      <h2>
                        Delivery details
                      </h2>

                    </div>

                  </div>

                  <div className="checkout-form-grid">

                    {/* NAME */}

                    <div className="checkout-field">

                      <label>
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />

                    </div>

                    {/* PHONE */}

                    <div className="checkout-field">

                      <label>
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        maxLength="10"
                      />

                    </div>

                    {/* ADDRESS */}

                    <div className="checkout-field checkout-full">

                      <label>
                        Delivery Address
                      </label>

                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House / Street / Area"
                        rows="4"
                      />

                    </div>

                    {/* CITY */}

                    <div className="checkout-field">

                      <label>
                        City
                      </label>

                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter city"
                      />

                    </div>

                    {/* PINCODE */}

                    <div className="checkout-field">

                      <label>
                        Pincode
                      </label>

                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="6-digit pincode"
                        maxLength="6"
                      />

                    </div>

                  </div>

                </div>

                {/* ================= PAYMENT ================= */}

                <div className="checkout-card">

                  <div className="checkout-card-header">

                    <div>

                      <span className="checkout-step">
                        02
                      </span>

                      <h2>
                        Payment method
                      </h2>

                    </div>

                  </div>

                  <div className="payment-options">

                    {/* COD */}

                    <label
                      className={
                        paymentMethod === "Cash on Delivery"
                          ? "payment-option selected"
                          : "payment-option"
                      }
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="Cash on Delivery"
                        checked={
                          paymentMethod ===
                          "Cash on Delivery"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <div className="payment-icon">
                        COD
                      </div>

                      <div className="payment-info">

                        <strong>
                          Cash on Delivery
                        </strong>

                        <span>
                          Pay when your order arrives
                        </span>

                      </div>

                    </label>

                    {/* UPI */}

                    <label
                      className={
                        paymentMethod === "UPI"
                          ? "payment-option selected"
                          : "payment-option"
                      }
                    >

                      <input
                        type="radio"
                        name="payment"
                        value="UPI"
                        checked={
                          paymentMethod === "UPI"
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <div className="payment-icon">
                        UPI
                      </div>

                      <div className="payment-info">

                        <strong>
                          UPI
                        </strong>

                        <span>
                          Google Pay, PhonePe, Paytm
                        </span>

                      </div>

                    </label>

                  </div>

                </div>

                {/* ================= ERROR ================= */}

                {error && (
                  <div className="checkout-error">
                    {error}
                  </div>
                )}

                {/* ================= PLACE ORDER ================= */}

                <button
                  type="submit"
                  className="place-order-btn"
                  disabled={loading}
                >

                  {loading
                    ? "Placing Order..."
                    : "Place Order"}

                  {!loading && (
                    <span>
                      →
                    </span>
                  )}

                </button>

              </form>

            </div>

            {/* ================= RIGHT SIDE ================= */}

            <aside className="checkout-summary">

              <div className="summary-top">

                <span className="section-label">
                  ORDER SUMMARY
                </span>

                <h2>
                  Your order
                </h2>

              </div>

              {/* ================= ITEMS ================= */}

              <div className="checkout-items">

                {cart.map((item) => (

                  <div
                    className="checkout-item"
                    key={item.id}
                  >

                    <img
                      src={
                        item.image ||
                        item.imageUrl ||
                        ""
                      }
                      alt={item.name}
                    />

                    <div className="checkout-item-info">

                      <h3>
                        {item.name}
                      </h3>

                      <span>
                        Qty: {item.quantity}
                      </span>

                    </div>

                    <strong>
                      ₹
                      {(
                        Number(item.price) *
                        Number(item.quantity)
                      ).toLocaleString("en-IN")}
                    </strong>

                  </div>

                ))}

              </div>

              {/* ================= TOTAL ================= */}

              <div className="checkout-total-box">

                <div>

                  <span>
                    Items ({cartCount})
                  </span>

                  <strong>
                    ₹
                    {cartTotal.toLocaleString("en-IN")}
                  </strong>

                </div>

                <div>

                  <span>
                    Delivery
                  </span>

                  <strong>
                    {deliveryFee === 0
                      ? "FREE"
                      : `₹${deliveryFee}`}
                  </strong>

                </div>

                {deliveryFee > 0 && (

                  <p className="free-delivery-note">

                    Add ₹
                    {(500 - cartTotal).toLocaleString(
                      "en-IN"
                    )}{" "}
                    more to get free delivery.

                  </p>

                )}

                <div className="checkout-grand-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹
                    {grandTotal.toLocaleString("en-IN")}
                  </strong>

                </div>

              </div>

              {/* ================= SECURITY ================= */}

              <div className="checkout-security">

                <span>
                  ✓
                </span>

                <div>

                  <strong>
                    Secure checkout
                  </strong>

                  <p>
                    Your order information is safely
                    stored in the database.
                  </p>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Checkout;
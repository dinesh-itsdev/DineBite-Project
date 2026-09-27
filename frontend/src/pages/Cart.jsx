import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useApp();

  const deliveryFee =
    cartTotal >= 50000 || cartTotal === 0
      ? 0
      : 99;

  const grandTotal = cartTotal + deliveryFee;

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    navigate("/checkout");
  };

  const handleRemove = async (item) => {
    console.log("REMOVE BUTTON CLICKED:", {
      productId: item.id,
      cartItemId: item.cartItemId,
      name: item.name,
    });

    await removeFromCart(item.id);
  };

  return (
    <main className="cart-page">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <section className="cart-header-section">

        <div className="cart-container">

          <span className="section-label">
            YOUR ORDER
          </span>

          <h1>
            Your Cart
          </h1>

          <p>
            Review your selected dishes before
            continuing to checkout.
          </p>

        </div>

      </section>


      {/* =========================================
          CART CONTENT
      ========================================= */}

      <section className="cart-content-section">

        <div className="cart-container">

          {cart.length === 0 ? (

            /* =====================================
               EMPTY CART
            ===================================== */

            <div className="empty-cart">

              <div className="empty-cart-icon">

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >

                  <path
                    d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6"
                  />

                  <circle
                    cx="9"
                    cy="19"
                    r="1.2"
                  />

                  <circle
                    cx="18"
                    cy="19"
                    r="1.2"
                  />

                </svg>

              </div>

              <h2>
                Your cart is empty
              </h2>

              <p>
                Discover delicious dishes and
                add your favourites to your cart.
              </p>

              <Link
                to="/restaurants"
                className="primary-btn"
              >
                Explore Restaurants
              </Link>

            </div>

          ) : (

            /* =====================================
               CART WITH ITEMS
            ===================================== */

            <div className="cart-layout">


              {/* ===================================
                  LEFT SIDE
              =================================== */}

              <div className="cart-items-section">

                <div className="cart-items-header">

                  <div>

                    <span className="section-label">
                      SELECTED ITEMS
                    </span>

                    <h2>
                      {cartCount}{" "}
                      {cartCount === 1
                        ? "item"
                        : "items"}
                    </h2>

                  </div>


                  <Link
                    to="/restaurants"
                    className="continue-shopping"
                  >
                    ← Continue shopping
                  </Link>

                </div>


                {/* CART ITEMS */}

                <div className="cart-items-list">

                  {cart.map((item) => (

                    <article
                      className="cart-item"
                      key={item.id}
                    >


                      {/* =========================
                          FOOD IMAGE
                      ========================= */}

                      <Link
                        to={`/food/${item.id}`}
                        className="cart-item-image-wrap"
                      >

                        <img
                          src={
                            item.image ||
                            "https://via.placeholder.com/300x250?text=Food"
                          }
                          alt={item.name}
                          className="cart-item-image"
                        />

                      </Link>


                      {/* =========================
                          FOOD INFORMATION
                      ========================= */}

                      <div className="cart-item-info">

                        <div className="cart-item-main">

                          <span className="cart-item-category">
                            {item.category}
                          </span>

                          <Link
                            to={`/food/${item.id}`}
                            className="cart-item-name"
                          >
                            {item.name}
                          </Link>

                          <p>
                            {item.description ||
                              "Freshly prepared with quality ingredients."}
                          </p>

                        </div>


                        {/* =====================
                            BOTTOM
                        ===================== */}

                        <div className="cart-item-bottom">


                          {/* QUANTITY */}

                          <div className="cart-quantity">

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(
                                  item.id
                                )
                              }
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>

                            <span>
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(
                                  item.id
                                )
                              }
                              aria-label="Increase quantity"
                            >
                              +
                            </button>

                          </div>


                          {/* PRICE */}

                          <strong className="cart-item-price">

                            ₹
                            {(
                              Number(item.price) *
                              Number(item.quantity)
                            ).toLocaleString(
                              "en-IN"
                            )}

                          </strong>

                        </div>

                      </div>


                      {/* =========================
                          REMOVE BUTTON
                      ========================= */}

                      <button
                        type="button"
                        className="remove-cart-item"
                        onClick={() =>
                          handleRemove(item)
                        }
                        title="Remove item"
                      >
                        Remove
                      </button>

                    </article>

                  ))}

                </div>

              </div>


              {/* ===================================
                  RIGHT SIDE - ORDER SUMMARY
              =================================== */}

              <aside className="cart-summary">

                <div className="cart-summary-header">

                  <span className="section-label">
                    ORDER SUMMARY
                  </span>

                  <h2>
                    Your order
                  </h2>

                </div>


                {/* ITEMS */}

                <div className="summary-row">

                  <span>
                    Items ({cartCount})
                  </span>

                  <strong>
                    ₹
                    {cartTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                {/* DELIVERY */}

                <div className="summary-row">

                  <span>
                    Delivery
                  </span>

                  <strong>
                    {deliveryFee === 0
                      ? "FREE"
                      : `₹${deliveryFee}`}
                  </strong>

                </div>


                {/* FREE DELIVERY MESSAGE */}

                {cartTotal > 0 &&
                  cartTotal < 50000 && (

                    <div className="delivery-note">

                      Add ₹
                      {(
                        50000 - cartTotal
                      ).toLocaleString(
                        "en-IN"
                      )}

                      {" "}more to get free
                      delivery.

                    </div>

                  )}


                <div className="summary-divider" />


                {/* TOTAL */}

                <div className="summary-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹
                    {grandTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                {/* CHECKOUT */}

                <button
                  type="button"
                  className="checkout-btn"
                  onClick={handleCheckout}
                >

                  Proceed to Checkout

                  <span>
                    →
                  </span>

                </button>


                {/* SECURE CHECKOUT */}

                <div className="secure-checkout">

                  <span className="secure-icon">
                    ✓
                  </span>

                  <div>

                    <strong>
                      Secure checkout
                    </strong>

                    <p>
                      Your order details are
                      handled securely.
                    </p>

                  </div>

                </div>

              </aside>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Cart;
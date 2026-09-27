import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import ReviewSection from "../components/ReviewSection.jsx";
import { useApp } from "../context/AppContext.jsx";

const API_URL = "http://localhost:8080";

function FoodDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    addToCart,
    toggleWishlist,
    wishlist
  } = useApp();

  const [food, setFood] = useState(null);
  const [relatedFoods, setRelatedFoods] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =====================================================
     LOAD FOOD FROM ORACLE
  ===================================================== */

  useEffect(() => {

    const loadFood = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/foods/${id}`
        );

        if (!response.ok) {
          throw new Error(
            "Food not found in database"
          );
        }

        const data = await response.json();

        console.log(
          "FOOD FROM ORACLE:",
          data
        );

        setFood(data);


        /* ===============================================
           LOAD ALL FOODS FOR RELATED FOODS
        =============================================== */

        const allFoodsResponse = await fetch(
          `${API_URL}/api/foods`
        );

        if (allFoodsResponse.ok) {

          const allFoods =
            await allFoodsResponse.json();

          const related = allFoods
            .filter(
              (item) =>
                item.category === data.category &&
                String(item.id) !== String(data.id)
            )
            .slice(0, 4);

          setRelatedFoods(related);
        }

      } catch (error) {

        console.error(
          "FOOD DETAILS ERROR:",
          error
        );

        setError(
          "This food is not available in the database."
        );

      } finally {

        setLoading(false);
      }
    };

    loadFood();

  }, [id]);


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {

    return (
      <main className="food-not-found">

        <h1>Loading food...</h1>

        <p>
          Getting food details from DineBite database.
        </p>

      </main>
    );
  }


  /* =====================================================
     FOOD NOT FOUND
  ===================================================== */

  if (!food) {

    return (
      <main className="food-not-found">

        <h1>Food not found</h1>

        <p>
          {error}
        </p>

        <Link
          to="/restaurants"
          className="primary-btn"
        >
          Browse Restaurants
        </Link>

      </main>
    );
  }


  /* =====================================================
     WISHLIST
  ===================================================== */

  const isWishlisted =
    wishlist?.includes(food.id);


  /* =====================================================
     QUANTITY
  ===================================================== */

  const increaseQuantity = () => {

    if (
      food.stock != null &&
      quantity >= food.stock
    ) {

      alert(
        "Maximum available stock reached."
      );

      return;
    }

    setQuantity(
      (current) => current + 1
    );
  };


  const decreaseQuantity = () => {

    setQuantity(
      (current) =>
        Math.max(1, current - 1)
    );
  };


  /* =====================================================
     ADD TO CART
  ===================================================== */

  const handleAddToCart = async () => {

    for (let i = 0; i < quantity; i++) {

      await addToCart(food);
    }

    alert(
      `${food.name} added to cart`
    );
  };


  /* =====================================================
     BUY NOW
  ===================================================== */

  const handleBuyNow = async () => {

    for (let i = 0; i < quantity; i++) {

      await addToCart(food);
    }

    navigate("/cart");
  };


  /* =====================================================
     WISHLIST
  ===================================================== */

  const handleWishlist = () => {

    toggleWishlist(food.id);
  };


  /* =====================================================
     RETURN UI
  ===================================================== */

  return (

    <main className="food-details-page">

      {/* ===============================================
          TOP SECTION
      =============================================== */}

      <section className="food-details-top">

        <div className="food-details-container">

          <Link
            to="/restaurants"
            className="back-link"
          >
            ← Back to Restaurants
          </Link>


          <div className="food-details-layout">

            {/* =========================================
                IMAGE
            ========================================= */}

            <div className="food-details-gallery">

              <div className="food-main-image-wrap">

                <img
                  src={
                    food.imageUrl ||
                    "https://via.placeholder.com/600x500?text=Food"
                  }
                  alt={food.name}
                  className="food-main-image"
                />


                <button
                  className={`details-wishlist ${
                    isWishlisted
                      ? "active"
                      : ""
                  }`}
                  onClick={handleWishlist}
                  title="Wishlist"
                >
                  {isWishlisted
                    ? "♥"
                    : "♡"}
                </button>

              </div>


              <div className="food-image-caption">

                Freshly prepared • Quality ingredients

              </div>

            </div>


            {/* =========================================
                DETAILS
            ========================================= */}

            <div className="food-details-content">

              <span className="food-details-category">
                {food.category}
              </span>


              <h1 className="food-details-title">
                {food.name}
              </h1>


              <div className="food-details-rating-row">

                <span className="details-rating">
                  ★ {food.rating || "4.5"}
                </span>

                <span>
                  Highly rated
                </span>

              </div>


              <div className="food-details-price">

                ₹
                {Number(
                  food.price
                ).toLocaleString("en-IN")}

              </div>


              <p className="food-details-description">

                {food.description ||
                  `Enjoy delicious ${food.name}, prepared with quality ingredients and carefully selected flavors.`}

              </p>


              {/* =======================================
                  HIGHLIGHTS
              ======================================= */}

              <div className="food-highlights">

                <div className="food-highlight">

                  <span className="highlight-icon">
                    ✓
                  </span>

                  <div>

                    <strong>
                      Freshly Prepared
                    </strong>

                    <span>
                      Made with quality ingredients
                    </span>

                  </div>

                </div>


                <div className="food-highlight">

                  <span className="highlight-icon">
                    ✓
                  </span>

                  <div>

                    <strong>
                      Fast Delivery
                    </strong>

                    <span>
                      Delivered fresh to your door
                    </span>

                  </div>

                </div>


                <div className="food-highlight">

                  <span className="highlight-icon">
                    ✓
                  </span>

                  <div>

                    <strong>
                      Quality Assured
                    </strong>

                    <span>
                      Carefully prepared for you
                    </span>

                  </div>

                </div>

              </div>


              {/* =======================================
                  QUANTITY
              ======================================= */}

              <div className="quantity-section">

                <span>
                  Quantity
                </span>


                <div className="quantity-control">

                  <button
                    onClick={decreaseQuantity}
                  >
                    −
                  </button>


                  <span>
                    {quantity}
                  </span>


                  <button
                    onClick={increaseQuantity}
                  >
                    +
                  </button>

                </div>

              </div>


              {/* =======================================
                  ACTIONS
              ======================================= */}

              <div className="food-details-actions">

                <button
                  className="details-add-btn"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>


                <button
                  className="details-buy-btn"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>

              </div>


              {/* =======================================
                  DELIVERY
              ======================================= */}

              <div className="delivery-info">

                <div>

                  <strong>
                    Delivery
                  </strong>

                  <span>
                    30–40 minutes
                  </span>

                </div>


                <div>

                  <strong>
                    Availability
                  </strong>

                  <span>
                    {food.stock > 0
                      ? "Available now"
                      : "Out of stock"}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ===============================================
          ABOUT
      =============================================== */}

      <section className="food-about-section">

        <div className="food-details-container">

          <div className="section-header">

            <div>

              <span className="section-label">
                ABOUT THE DISH
              </span>

              <h2>
                Made for a better dining experience.
              </h2>

            </div>

          </div>


          <div className="food-about-grid">

            <div className="food-about-text">

              <p>
                At DineBite, every dish is selected
                with quality, taste and customer
                experience in mind.
              </p>


              <p>
                Browse our collection, add your
                favourite dishes to your cart and
                create your perfect meal.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ===============================================
          RELATED FOODS
      =============================================== */}

      {relatedFoods.length > 0 && (

        <section className="related-foods-section">

          <div className="food-details-container">

            <div className="section-header">

              <div>

                <span className="section-label">
                  YOU MAY ALSO LIKE
                </span>

                <h2>
                  More from {food.category}
                </h2>

              </div>


              <Link
                to="/restaurants"
                className="text-link"
              >
                View all →
              </Link>

            </div>


            <div className="related-food-grid">

              {relatedFoods.map((item) => (

                <Link
                  to={`/food/${item.id}`}
                  className="related-food-card"
                  key={item.id}
                >

                  <div className="related-food-image-wrap">

                    <img
                      src={
                        item.imageUrl ||
                        "https://via.placeholder.com/400x300?text=Food"
                      }
                      alt={item.name}
                      className="related-food-image"
                    />

                  </div>


                  <div className="related-food-info">

                    <span className="food-category">
                      {item.category}
                    </span>


                    <h3>
                      {item.name}
                    </h3>


                    <div className="related-food-bottom">

                      <strong>
                        ₹
                        {Number(
                          item.price
                        ).toLocaleString("en-IN")}
                      </strong>


                      <span className="related-rating">
                        ★ {item.rating || "4.5"}
                      </span>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* ===============================================
          CUSTOMER REVIEWS
      =============================================== */}

      <ReviewSection productId={food.id} />


    </main>
  );
}

export default FoodDetails;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

const API_URL = "http://localhost:8080";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Home() {
  const { addToCart, toggleWishlist, wishlist } = useApp();

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // =====================================================
  // LOAD FOODS FROM ORACLE / SPRING BOOT
  // =====================================================

  useEffect(() => {
    fetch(`${API_URL}/api/foods`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load foods");
        }

        return response.json();
      })
      .then((data) => {
        console.log("HOME FOODS FROM ORACLE:", data);
        setFoods(data);
      })
      .catch((error) => {
        console.error("HOME FOOD LOAD ERROR:", error);
      });
  }, []);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    {
      name: "South Indian",
      image:
        "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "North Indian",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Chinese",
      image:
        "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Western",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Desserts",
      image:
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Beverages",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // =====================================================
  // FILTER FOODS
  // =====================================================

  const filteredFoods = foods
    .filter((food) => {
      const categoryMatch =
        selectedCategory === "All" ||
        food.category?.toLowerCase() ===
          selectedCategory.toLowerCase();

      const searchText = search.toLowerCase().trim();

      const searchMatch =
        !searchText ||
        food.name?.toLowerCase().includes(searchText) ||
        food.category?.toLowerCase().includes(searchText);

      return categoryMatch && searchMatch;
    })
    .slice(0, 12);

  // =====================================================
  // CATEGORY CLICK
  // =====================================================

  const handleCategory = (category) => {
    setSelectedCategory(category);

    document
      .getElementById("popular-dishes")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // =====================================================
  // MOOD CLICK
  // =====================================================

  const handleMood = (value) => {
    setSearch(value);

    document
      .getElementById("popular-dishes")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <main>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">
        <div className="hero-container">

          <div className="hero-content">

            <p className="eyebrow">
              DINEBITE / FOOD DISCOVERY
            </p>

            <h1>
              Food that fits
              <br />
              <span>your mood.</span>
            </h1>

            <p className="hero-description">
              Discover restaurants, explore new flavours and
              find dishes you'll actually want to eat.
            </p>

            <div className="hero-actions">

              <a
                href="#popular-dishes"
                className="primary-btn"
              >
                Explore food
                <ArrowIcon />
              </a>

              <Link
                to="/ai-food"
                className="secondary-btn"
              >
                Get AI recommendations
              </Link>

            </div>

            <div className="hero-meta">

              <div>
                <strong>500+</strong>
                <span>Dishes</span>
              </div>

              <div>
                <strong>80+</strong>
                <span>Restaurants</span>
              </div>

              <div>
                <strong>4.8</strong>
                <span>Average rating</span>
              </div>

            </div>

          </div>

          <div className="hero-image-wrap">

            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85"
              alt="Restaurant food"
              className="hero-image"
            />

            <div className="hero-image-label">
              <span>CURATED DAILY</span>
              <strong>
                Good food, simply discovered.
              </strong>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section className="search-section">

        <div
          className="search-container"
          id="food-search"
        >

          <div className="search-heading">

            <span>SEARCH</span>

            <h2>
              What are you craving?
            </h2>

          </div>

          <div className="search-box">

            <SearchIcon />

            <input
              type="text"
              placeholder="Search dishes, cuisines or restaurants"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="clear-search"
              >
                Clear
              </button>
            )}

          </div>

        </div>

      </section>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}

      <section className="section category-section">

        <div className="section-header">

          <div>

            <span className="section-label">
              EXPLORE
            </span>

            <h2>
              Browse by cuisine
            </h2>

          </div>

          <button
            className="text-link"
            onClick={() =>
              handleCategory("All")
            }
          >
            View all
            <ArrowIcon />
          </button>

        </div>

        <div className="category-grid">

          {categories.map((category) => (

            <button
              key={category.name}
              className="category-card"
              onClick={() =>
                handleCategory(category.name)
              }
            >

              <img
                src={category.image}
                alt={category.name}
              />

              <div className="category-overlay">

                <span>
                  {category.name}
                </span>

                <span className="category-arrow">
                  →
                </span>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* =====================================================
          POPULAR DISHES
      ===================================================== */}

      <section
        className="section dishes-section"
        id="popular-dishes"
      >

        <div className="section-header">

          <div>

            <span className="section-label">
              DISCOVER
            </span>

            <h2>
              {selectedCategory === "All"
                ? "Popular dishes"
                : selectedCategory}
            </h2>

          </div>

          <Link
            to="/restaurants"
            className="text-link"
          >
            Explore restaurants
            <ArrowIcon />
          </Link>

        </div>

        {filteredFoods.length > 0 ? (

          <div className="premium-food-grid">

            {filteredFoods.map((food) => {

              const isWishlisted =
                wishlist?.includes(food.id);

              return (

                <article
                  className="premium-food-card"
                  key={food.id}
                >

                  {/* FOOD IMAGE */}

                  <div className="food-image-wrap">

                    <Link
                      to={`/food/${food.id}`}
                    >

                      <img
                        src={food.imageUrl}
                        alt={food.name}
                        className="food-image"
                      />

                    </Link>

                    {/* WISHLIST */}

                    <button
                      className={
                        isWishlisted
                          ? "wishlist-btn active"
                          : "wishlist-btn"
                      }
                      onClick={() =>
                        toggleWishlist(food.id)
                      }
                      title={
                        isWishlisted
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      {isWishlisted
                        ? "♥"
                        : "♡"}
                    </button>

                  </div>

                  {/* FOOD INFORMATION */}

                  <div className="food-card-info">

                    <div className="food-card-top">

                      <span className="food-category">
                        {food.category}
                      </span>

                      <span className="food-rating">
                        ★ {food.rating || "4.5"}
                      </span>

                    </div>

                    <Link
                      to={`/food/${food.id}`}
                      className="food-name"
                    >
                      {food.name}
                    </Link>

                    <div className="food-bottom">

                      <strong>
                        ₹
                        {Number(
                          food.price
                        ).toLocaleString("en-IN")}
                      </strong>

                      <button
                        className="add-btn"
                        onClick={() =>
                          addToCart(food)
                        }
                      >
                        Add
                      </button>

                    </div>

                  </div>

                </article>

              );
            })}

          </div>

        ) : (

          <div className="no-results">

            <h3>
              No dishes found
            </h3>

            <p>
              Try another dish, cuisine or category.
            </p>

            <button
              className="primary-btn"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
            >
              View all dishes
            </button>

          </div>

        )}

      </section>

      {/* =====================================================
          MOODS
      ===================================================== */}

      <section className="mood-section">

        <div className="mood-container">

          <div>

            <span className="section-label">
              YOUR MOOD
            </span>

            <h2>
              What are you in the mood for?
            </h2>

            <p>
              Choose a mood and discover food that
              matches it.
            </p>

          </div>

          <div className="mood-list">

            <button
              onClick={() =>
                handleMood("spicy")
              }
            >
              Spicy
            </button>

            <button
              onClick={() =>
                handleMood("healthy")
              }
            >
              Healthy
            </button>

            <button
              onClick={() =>
                handleMood("pizza")
              }
            >
              Comfort food
            </button>

            <button
              onClick={() =>
                handleCategory("Desserts")
              }
            >
              Sweet
            </button>

            <button
              onClick={() =>
                handleCategory("Beverages")
              }
            >
              Refreshing
            </button>

          </div>

        </div>

      </section>

      {/* =====================================================
          DINEBITE AI
      ===================================================== */}

      <section className="ai-section">

        <div className="ai-container">

          <div className="ai-content">

            <span className="section-label">
              DINEBITE AI
            </span>

            <h2>
              Not sure what
              <br />
              to order?
            </h2>

            <p>
              Tell DineBite what you're looking for.
              Get food recommendations based on your
              taste, cuisine and budget.
            </p>

            <Link
              to="/ai-food"
              className="ai-button"
            >
              Try DineBite AI
              <ArrowIcon />
            </Link>

          </div>

          <div className="ai-image">

            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85"
              alt="Food recommendation"
            />

          </div>

        </div>

      </section>

      {/* =====================================================
          POPULAR RESTAURANTS
      ===================================================== */}

      <section className="section restaurant-section">

        <div className="section-header">

          <div>

            <span className="section-label">
              PLACES TO EAT
            </span>

            <h2>
              Popular restaurants
            </h2>

          </div>

          <Link
            to="/restaurants"
            className="text-link"
          >
            See all restaurants
            <ArrowIcon />
          </Link>

        </div>

        <div className="restaurant-grid">

          {[
            {
              name: "The South Table",
              cuisine: "South Indian",
              image:
                "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80",
              rating: "4.8",
              time: "25–30 min",
            },

            {
              name: "Spice Route",
              cuisine: "Indian Cuisine",
              image:
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
              rating: "4.7",
              time: "30–35 min",
            },

            {
              name: "Urban Bowl",
              cuisine: "Asian & Chinese",
              image:
                "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
              rating: "4.6",
              time: "20–25 min",
            },

          ].map((restaurant) => (

            <article
              className="restaurant-card"
              key={restaurant.name}
            >

              <div className="restaurant-image">

                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                />

              </div>

              <div className="restaurant-info">

                <div>

                  <h3>
                    {restaurant.name}
                  </h3>

                  <p>
                    {restaurant.cuisine}
                  </p>

                </div>

                <div className="restaurant-meta">

                  <span>
                    ★ {restaurant.rating}
                  </span>

                  <span>
                    {restaurant.time}
                  </span>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="site-footer">

        <div className="footer-main">

          <div className="footer-brand">

            <div className="footer-logo">

              <span>D</span>
              DineBite

            </div>

            <p>
              Discover good food from restaurants
              around you.
            </p>

          </div>

          <div className="footer-column">

            <h4>
              Explore
            </h4>

            <Link to="/restaurants">
              Restaurants
            </Link>

            <Link to="/ai-food">
              AI Recommendations
            </Link>

            <Link to="/cart">
              Cart
            </Link>

          </div>

          <div className="footer-column">

            <h4>
              Company
            </h4>

            <a href="#popular-dishes">
              About
            </a>

            <a href="#popular-dishes">
              Careers
            </a>

            <a href="#popular-dishes">
              Help
            </a>

          </div>

          <div className="footer-column">

            <h4>
              Legal
            </h4>

            <a href="#popular-dishes">
              Privacy
            </a>

            <a href="#popular-dishes">
              Terms
            </a>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 DineBite
          </span>

          <span>
            Food discovery made simple.
          </span>

        </div>

      </footer>

    </main>
  );
}

export default Home;

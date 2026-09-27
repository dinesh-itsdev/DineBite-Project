import { useState } from "react";
import { Link } from "react-router-dom";

import foods from "../data/foods";
import { useApp } from "../context/AppContext.jsx";


function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" />
    </svg>
  );
}


function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}


function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
      <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
    </svg>
  );
}


function AIFood() {

  const {
    addToCart,
    toggleWishlist,
    wishlist,
  } = useApp();


  const [query, setQuery] = useState("");

  const [recommendations, setRecommendations] =
    useState([]);

  const [searched, setSearched] =
    useState(false);

  const [loading, setLoading] =
    useState(false);


  /*
   * QUICK SUGGESTIONS
   */

  const suggestions = [
    "Something spicy",
    "South Indian under ₹500",
    "Healthy food",
    "Something sweet",
    "Chinese food",
  ];


  /*
   * FIND BUDGET FROM USER QUERY
   */

  const getBudget = (text) => {

    const match = text.match(
      /(?:under|below|within)\s*₹?\s*(\d+)/i
    );

    return match
      ? Number(match[1])
      : null;
  };


  /*
   * FRONTEND AI RECOMMENDATION LOGIC
   *
   * This is currently a demo recommendation
   * system.
   *
   * Later:
   * React → Spring Boot → GenAI API
   */

  const generateRecommendations = (text) => {

    const value = text.toLowerCase().trim();

    const budget = getBudget(value);


    let result = [...foods];


    /*
     * CUISINE MATCHING
     */

    if (
      value.includes("south indian") ||
      value.includes("south")
    ) {

      result = result.filter(
        (food) =>
          food.category?.toLowerCase() ===
          "south indian"
      );

    } else if (
      value.includes("north indian") ||
      value.includes("north")
    ) {

      result = result.filter(
        (food) =>
          food.category?.toLowerCase() ===
          "north indian"
      );

    } else if (
      value.includes("chinese") ||
      value.includes("asian")
    ) {

      result = result.filter(
        (food) =>
          food.category?.toLowerCase() ===
          "chinese"
      );

    } else if (
      value.includes("western") ||
      value.includes("pizza") ||
      value.includes("burger") ||
      value.includes("pasta")
    ) {

      result = result.filter(
        (food) =>
          food.category?.toLowerCase() ===
          "western"
      );

    } else if (
      value.includes("dessert") ||
      value.includes("sweet") ||
      value.includes("cake")
    ) {

      result = result.filter(
        (food) =>
          food.category?.toLowerCase() ===
          "desserts"
      );

    } else if (
      value.includes("drink") ||
      value.includes("beverage") ||
      value.includes("coffee") ||
      value.includes("refresh")
    ) {

      result = result.filter(
        (food) =>
          food.category?.toLowerCase() ===
          "beverages"
      );
    }


    /*
     * BUDGET FILTER
     */

    if (budget) {

      result = result.filter(
        (food) =>
          Number(food.price) <= budget
      );

    }


    /*
     * HEALTHY FILTER
     */

    if (
      value.includes("healthy") ||
      value.includes("light")
    ) {

      result = result.filter((food) => {

        const text =
          `${food.name} ${food.description || ""}`
            .toLowerCase();

        return (
          text.includes("healthy") ||
          text.includes("salad") ||
          text.includes("veg") ||
          text.includes("vegetable")
        );

      });

    }


    /*
     * SPICY FILTER
     */

    if (
      value.includes("spicy") ||
      value.includes("hot")
    ) {

      result = result.filter((food) => {

        const text =
          `${food.name} ${food.description || ""}`
            .toLowerCase();

        return (
          text.includes("spicy") ||
          text.includes("chilli") ||
          text.includes("masala") ||
          text.includes("tandoori")
        );

      });

    }


    /*
     * SWEET FILTER
     */

    if (
      value.includes("sweet") ||
      value.includes("dessert")
    ) {

      result = result.filter(
        (food) =>
          food.category?.toLowerCase() ===
          "desserts"
      );

    }


    /*
     * IF FILTER BECOMES TOO RESTRICTIVE,
     * USE CATEGORY / GENERAL MATCHING
     */

    if (result.length === 0 && budget) {

      result = foods.filter(
        (food) =>
          Number(food.price) <= budget
      );

    }


    /*
     * SORT BY RATING
     */

    result.sort(
      (a, b) =>
        Number(b.rating || 0) -
        Number(a.rating || 0)
    );


    /*
     * SHOW MAXIMUM 6 RESULTS
     */

    return result.slice(0, 6);
  };


  /*
   * ASK AI
   */

  const handleRecommend = () => {

    if (!query.trim()) {
      return;
    }


    setLoading(true);
    setSearched(false);


    /*
     * Small delay gives the interface
     * an AI-like processing experience.
     */

    setTimeout(() => {

      const result =
        generateRecommendations(query);

      setRecommendations(result);

      setSearched(true);
      setLoading(false);

    }, 500);
  };


  /*
   * QUICK SUGGESTION
   */

  const handleSuggestion = (suggestion) => {

    setQuery(suggestion);

    setLoading(true);
    setSearched(false);


    setTimeout(() => {

      const result =
        generateRecommendations(suggestion);

      setRecommendations(result);

      setSearched(true);
      setLoading(false);

    }, 500);
  };


  /*
   * ENTER KEY
   */

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      handleRecommend();
    }

  };


  return (

    <main className="ai-food-page">


      {/* ==================================================
          HERO
      ================================================== */}

      <section className="ai-food-hero">

        <div className="ai-food-hero-container">

          <div className="ai-food-hero-content">

            <span className="ai-label">
              DINEBITE AI
            </span>


            <h1>
              Tell us what
              <br />
              <span>you're craving.</span>
            </h1>


            <p>
              Describe your mood, taste or budget
              and DineBite will help you discover
              dishes that match.
            </p>


            <div className="ai-hero-meta">

              <div>
                <strong>
                  PERSONALIZED
                </strong>

                <span>
                  Food discovery
                </span>
              </div>


              <div>
                <strong>
                  SMART
                </strong>

                <span>
                  Preference matching
                </span>
              </div>


              <div>
                <strong>
                  SIMPLE
                </strong>

                <span>
                  Natural language
                </span>
              </div>

            </div>

          </div>


          <div className="ai-hero-visual">

            <div className="ai-visual-card">

              <div className="ai-visual-icon">
                <SparkIcon />
              </div>

              <span>
                DINEBITE AI
              </span>

              <strong>
                Find your next favourite dish.
              </strong>

              <div className="ai-visual-line" />

              <small>
                Taste • Mood • Cuisine • Budget
              </small>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          AI SEARCH
      ================================================== */}

      <section className="ai-search-section">

        <div className="ai-search-container">


          <div className="ai-section-heading">

            <span className="section-label">
              WHAT ARE YOU LOOKING FOR?
            </span>

            <h2>
              Ask DineBite AI
            </h2>

            <p>
              Tell us naturally what you want to eat.
            </p>

          </div>


          <div className="ai-input-box">

            <SearchIcon />

            <input
              type="text"
              placeholder="Example: I want something spicy under ₹300"
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              onKeyDown={handleKeyDown}
            />


            <button
              className="ai-recommend-btn"
              onClick={handleRecommend}
              disabled={
                !query.trim() || loading
              }
            >

              <SparkIcon />

              {loading
                ? "Finding..."
                : "Recommend"}

            </button>

          </div>


          {/* QUICK SUGGESTIONS */}

          <div className="ai-suggestions">

            <span>
              Try something like
            </span>


            <div className="suggestion-list">

              {suggestions.map(
                (suggestion) => (

                  <button
                    key={suggestion}
                    onClick={() =>
                      handleSuggestion(
                        suggestion
                      )
                    }
                  >
                    {suggestion}
                  </button>

                )
              )}

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          RECOMMENDATIONS
      ================================================== */}

      {(searched || loading) && (

        <section className="ai-results-section">

          <div className="ai-results-container">


            <div className="section-header">

              <div>

                <span className="section-label">
                  YOUR RECOMMENDATIONS
                </span>

                <h2>
                  {loading
                    ? "Finding something for you..."
                    : "Picked for you."}
                </h2>

              </div>


              {!loading &&
                recommendations.length > 0 && (

                  <span className="ai-result-count">
                    {recommendations.length}{" "}
                    dishes
                  </span>

                )}

            </div>


            {/* LOADING */}

            {loading && (

              <div className="ai-loading">

                <div className="ai-loading-spinner" />

                <p>
                  Understanding your preferences...
                </p>

              </div>

            )}


            {/* RESULTS */}

            {!loading &&
              recommendations.length > 0 && (

                <div className="ai-food-grid">

                  {recommendations.map(
                    (food) => {

                      const isWishlisted =
                        wishlist?.includes(
                          food.id
                        );


                      return (

                        <article
                          className="ai-food-card"
                          key={food.id}
                        >


                          <div className="ai-food-image-wrap">

                            <Link
                              to={`/food/${food.id}`}
                            >

                              <img
                                src={food.image}
                                alt={food.name}
                              />

                            </Link>


                            <button
                              className={
                                isWishlisted
                                  ? "ai-wishlist active"
                                  : "ai-wishlist"
                              }
                              onClick={() =>
                                toggleWishlist(
                                  food.id
                                )
                              }
                            >
                              {isWishlisted
                                ? "♥"
                                : "♡"}
                            </button>

                          </div>


                          <div className="ai-food-info">


                            <div className="ai-food-top">

                              <span>
                                {food.category}
                              </span>

                              <span>
                                ★{" "}
                                {food.rating ||
                                  "4.5"}
                              </span>

                            </div>


                            <Link
                              to={`/food/${food.id}`}
                              className="ai-food-name"
                            >
                              {food.name}
                            </Link>


                            <div className="ai-food-details">

                              <span>
                                🕒 30–40 min
                              </span>

                            </div>


                            <div className="ai-food-bottom">

                              <strong>
                                ₹
                                {Number(
                                  food.price
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>


                              <div className="ai-card-actions">

                                <Link
                                  to={`/food/${food.id}`}
                                  className="ai-view-btn"
                                >
                                  View
                                </Link>


                                <button
                                  className="ai-add-btn"
                                  onClick={() =>
                                    addToCart(food)
                                  }
                                >
                                  Add
                                </button>

                              </div>

                            </div>

                          </div>

                        </article>

                      );

                    }
                  )}

                </div>

              )}


            {/* NO RESULTS */}

            {!loading &&
              searched &&
              recommendations.length === 0 && (

                <div className="ai-no-results">

                  <div className="ai-no-results-icon">
                    ?
                  </div>

                  <h3>
                    We couldn't find an exact match.
                  </h3>

                  <p>
                    Try a different cuisine,
                    mood or budget.
                  </p>


                  <div className="ai-no-results-suggestions">

                    {suggestions
                      .slice(0, 3)
                      .map((suggestion) => (

                        <button
                          key={suggestion}
                          onClick={() =>
                            handleSuggestion(
                              suggestion
                            )
                          }
                        >
                          {suggestion}
                        </button>

                      ))}

                  </div>

                </div>

              )}

          </div>

        </section>

      )}


      {/* ==================================================
          HOW IT WORKS
      ================================================== */}

      <section className="ai-how-section">

        <div className="ai-how-container">


          <div className="ai-section-heading">

            <span className="section-label">
              HOW IT WORKS
            </span>

            <h2>
              A simpler way to choose food.
            </h2>

            <p>
              DineBite AI turns a simple description
              into food suggestions.
            </p>

          </div>


          <div className="ai-steps">


            <div className="ai-step">

              <span>
                01
              </span>

              <h3>
                Tell us what you want
              </h3>

              <p>
                Describe your craving, cuisine,
                mood or preferred budget.
              </p>

            </div>


            <div className="ai-step">

              <span>
                02
              </span>

              <h3>
                We understand
              </h3>

              <p>
                DineBite analyses your request
                and matches it with available
                dishes.
              </p>

            </div>


            <div className="ai-step">

              <span>
                03
              </span>

              <h3>
                Discover your match
              </h3>

              <p>
                Explore the recommendations
                and choose what looks right
                for you.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          FUTURE AI
      ================================================== */}

      <section className="ai-future-section">

        <div className="ai-future-container">


          <div>

            <span className="section-label">
              COMING NEXT
            </span>

            <h2>
              More intelligent
              <br />
              recommendations.
            </h2>

          </div>


          <div className="ai-future-content">

            <p>
              The current DineBite AI experience
              uses frontend recommendation logic.
              It can later connect to your Spring Boot
              backend and a real GenAI API for more
              advanced personalized recommendations.
            </p>


            <Link
              to="/restaurants"
              className="text-link"
            >
              Explore restaurants
              <ArrowIcon />
            </Link>

          </div>

        </div>

      </section>


    </main>
  );
}


export default AIFood;
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext.jsx";

const API_URL = "http://localhost:8080";

function ReviewSection({ productId }) {
  const { user } = useApp();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(true);

  /* =========================================
     LOAD REVIEWS
  ========================================= */

  const loadReviews = async () => {
    try {
      setLoadingReviews(true);

      const response = await fetch(
        `${API_URL}/api/reviews/product/${productId}`
      );

      if (!response.ok) {
        throw new Error("Failed to load reviews");
      }

      const data = await response.json();

      console.log("REVIEWS FROM ORACLE:", data);

      setReviews(data);
    } catch (error) {
      console.error("REVIEW LOAD ERROR:", error);
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadReviews();
    }
  }, [productId]);

  /* =========================================
     SUBMIT REVIEW
  ========================================= */

  const submitReview = async (event) => {
    event.preventDefault();

    // Check login
    if (!user?.id) {
      alert("Please login to submit a review.");
      return;
    }

    // Check rating
    if (rating < 1 || rating > 5) {
      alert("Please select a rating.");
      return;
    }

    // Check comment
    if (!comment.trim()) {
      alert("Please enter your review.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: user.id,
          productId: Number(productId),
          rating: Number(rating),
          reviewComment: comment.trim(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        console.error(
          "REVIEW BACKEND ERROR:",
          errorText
        );

        throw new Error(
          errorText || "Failed to submit review"
        );
      }

      const savedReview = await response.json();

      console.log(
        "REVIEW SAVED TO ORACLE:",
        savedReview
      );

      // Add newly submitted review to the list
      setReviews((currentReviews) => [
        savedReview,
        ...currentReviews,
      ]);

      // Clear form
      setComment("");

      // Reset rating to zero
      setRating(0);

      alert("Review submitted successfully!");
    } catch (error) {
      console.error(
        "SUBMIT REVIEW ERROR:",
        error
      );

      alert(
        "Unable to submit review: " +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     DISPLAY STARS
  ========================================= */

  const renderStars = (value) => {
    const selectedRating = Number(value) || 0;

    return (
      <>
        {"★".repeat(selectedRating)}
        {"☆".repeat(5 - selectedRating)}
      </>
    );
  };

  /* =========================================
     UI
  ========================================= */

  return (
    <section className="review-section">

      <h2>Customer Reviews</h2>

      {/* =====================================
          WRITE REVIEW
      ===================================== */}

      {user ? (
        <form
          className="review-form"
          onSubmit={submitReview}
        >

          <h3>Write a Review</h3>

          {/* RATING */}

          <div className="rating-selector">

            <label>
              Your Rating:
            </label>

            <div
              className="rating-stars"
              role="radiogroup"
              aria-label="Food rating"
            >

              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    type="button"
                    className={
                      star <= rating
                        ? "star active"
                        : "star"
                    }
                    onClick={() =>
                      setRating(star)
                    }
                    aria-label={`${star} star rating`}
                  >
                    ★
                  </button>
                )
              )}

            </div>

            <div className="selected-rating-text">

              {rating === 0
                ? "Select your rating"
                : `${rating} out of 5`}

            </div>

          </div>

          {/* COMMENT */}

          <textarea
            value={comment}
            onChange={(event) =>
              setComment(event.target.value)
            }
            placeholder="Write your review..."
            rows={5}
            maxLength={4000}
          />

          {/* SUBMIT */}

          <div className="review-form-bottom">

            <span>
              {comment.length}/4000
            </span>

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Review"}
            </button>

          </div>

        </form>
      ) : (

        <div className="review-login-message">
          Please login to write a review.
        </div>

      )}

      {/* =====================================
          EXISTING REVIEWS
      ===================================== */}

      <div className="reviews-list">

        <h3>
          {reviews.length} Review
          {reviews.length !== 1
            ? "s"
            : ""}
        </h3>

        {loadingReviews ? (

          <p>
            Loading reviews...
          </p>

        ) : reviews.length === 0 ? (

          <p>
            No reviews yet. Be the first
            to review this food!
          </p>

        ) : (

          reviews.map((review) => (

            <div
              className="review-card"
              key={review.id}
            >

              <div className="review-header">

                <strong>
                  {review.userName ||
                    "User"}
                </strong>

                <span className="review-date">

                  {review.createdAt
                    ? new Date(
                        review.createdAt
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : ""}

                </span>

              </div>

              <div className="review-rating">

                {renderStars(
                  review.rating
                )}

              </div>

              <p>
                {review.reviewComment}
              </p>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default ReviewSection;
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

function FoodCard({ food }) {
  const { addToCart, toggleWishlist, wishlist } = useApp();

  const liked = wishlist.some((item) => item.id === food.id);

  return (
    <div className="food-card">

      <div className="food-image-container">
        <img src={food.image} alt={food.name} />

        <button
          className="wishlist-btn"
          onClick={() => toggleWishlist(food)}
        >
          {liked ? "❤️" : "♡"}
        </button>
      </div>

      <div className="food-content">

        <h3>{food.name}</h3>

        <p className="restaurant">
          {food.restaurant}
        </p>

        <div className="food-info">
          <span>⭐ {food.rating}</span>
          <span>🕒 {food.time}</span>
        </div>

        <h4>₹{food.price}</h4>

        <div className="food-buttons">

          <Link
            to={`/food/${food.id}`}
            className="view-btn"
          >
            View
          </Link>

          <button
            className="add-btn"
            onClick={() => addToCart(food)}
          >
            Add
          </button>

        </div>

      </div>
    </div>
  );
}

export default FoodCard;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

const API_URL = "http://localhost:8080";

function Restaurants() {
  const { addToCart } = useApp();

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/foods`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load foods");
        }

        return response.json();
      })
      .then((data) => {
        console.log("FOODS FROM ORACLE:", data);
        setFoods(data);
      })
      .catch((error) => {
        console.error("FOOD LOAD ERROR:", error);
      });
  }, []);

  return (
    <div>
      <h1>Our Foods</h1>

      <div className="food-grid">
        {foods.map((food) => (
          <div className="food-card" key={food.id}>

            <img
              src={food.imageUrl}
              alt={food.name}
            />

            <h3>{food.name}</h3>

            <p>{food.description}</p>

            <p>⭐ {food.rating}</p>

            <h4>₹{food.price}</h4>

            <Link to={`/food/${food.id}`}>
              View Details
            </Link>

            <button onClick={() => addToCart(food)}>
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
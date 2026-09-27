import { useState } from "react";

function AddFood() {
  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    imageUrl: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: food.name,
          category: food.category,
          price: Number(food.price),
          description: food.description,
          imageUrl: food.imageUrl,
          stock: Number(food.stock),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add food");
      }

      alert("Food added successfully!");

      setFood({
        name: "",
        category: "",
        price: "",
        description: "",
        imageUrl: "",
        stock: "",
      });
    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>Add Food</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Food Name"
          value={food.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={food.category}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={food.price}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={food.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={food.imageUrl}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={food.stock}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">
          Add Food
        </button>
      </form>
    </div>
  );
}

export default AddFood;
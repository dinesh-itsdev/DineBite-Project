const foods = [
  {
    id: 1,
    name: "Masala Dosa",
    category: "South Indian",
    price: 120,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    description:
      "Crispy golden dosa served with flavorful potato masala, sambar and chutney.",
  },

  {
    id: 2,
    name: "Paneer Butter Masala",
    category: "North Indian",
    price: 280,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    description:
      "Soft paneer cooked in a rich, creamy tomato and butter gravy.",
  },

  {
    id: 3,
    name: "Veg Fried Rice",
    category: "Chinese",
    price: 190,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    description:
      "Fragrant fried rice tossed with fresh vegetables and aromatic sauces.",
  },

  {
    id: 4,
    name: "Chicken Biryani",
    category: "North Indian",
    price: 320,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=800&q=80",
    description:
      "Aromatic basmati rice layered with tender chicken and traditional spices.",
  },

  {
    id: 5,
    name: "Margherita Pizza",
    category: "Western",
    price: 299,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    description:
      "Classic pizza topped with tomato sauce, mozzarella and fresh basil.",
  },

  {
    id: 6,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 150,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description:
      "Rich and fudgy chocolate brownie with an indulgent chocolate flavour.",
  },

  {
    id: 7,
    name: "Cold Coffee",
    category: "Beverages",
    price: 140,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80",
    description:
      "Smooth chilled coffee blended with milk for a refreshing drink.",
  },

  {
    id: 8,
    name: "Idli Sambar",
    category: "South Indian",
    price: 100,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    description:
      "Soft steamed idlis served with traditional sambar and coconut chutney.",
  },

  {
    id: 9,
    name: "Masala Vada",
    category: "South Indian",
    price: 90,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    description:
      "Crispy lentil fritters seasoned with herbs, spices and green chilli.",
  },

  {
    id: 10,
    name: "Pongal",
    category: "South Indian",
    price: 110,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80",
    description:
      "Comforting South Indian rice and lentil dish finished with aromatic spices.",
  },

  {
    id: 11,
    name: "Chole Bhature",
    category: "North Indian",
    price: 220,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
    description:
      "Spicy chickpea curry served with fluffy deep-fried bhature.",
  },

  {
    id: 12,
    name: "Butter Naan",
    category: "North Indian",
    price: 80,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    description:
      "Soft tandoor-baked naan brushed with butter.",
  },

  {
    id: 13,
    name: "Dal Makhani",
    category: "North Indian",
    price: 240,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    description:
      "Slow-cooked black lentils prepared with butter and creamy spices.",
  },

  {
    id: 14,
    name: "Veg Manchurian",
    category: "Chinese",
    price: 210,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    description:
      "Crispy vegetable balls tossed in a savoury Indo-Chinese sauce.",
  },

  {
    id: 15,
    name: "Hakka Noodles",
    category: "Chinese",
    price: 200,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    description:
      "Stir-fried noodles tossed with fresh vegetables and Chinese sauces.",
  },

  {
    id: 16,
    name: "Chilli Paneer",
    category: "Chinese",
    price: 250,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    description:
      "Crispy paneer cubes tossed with peppers, onions and spicy sauce.",
  },

  {
    id: 17,
    name: "Chicken Burger",
    category: "Western",
    price: 260,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    description:
      "Juicy chicken patty layered with fresh vegetables and creamy sauce.",
  },

  {
    id: 18,
    name: "Pasta Alfredo",
    category: "Western",
    price: 320,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    description:
      "Creamy Alfredo pasta prepared with herbs and parmesan-style sauce.",
  },

  {
    id: 19,
    name: "Veggie Burger",
    category: "Western",
    price: 230,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80",
    description:
      "A flavourful vegetable patty served with fresh lettuce and sauce.",
  },

  {
    id: 20,
    name: "French Fries",
    category: "Western",
    price: 140,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
    description:
      "Crispy golden fries served hot with your choice of dip.",
  },

  {
    id: 21,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 120,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1601303516534-7c2e8e8b7b2a?auto=format&fit=crop&w=800&q=80",
    description:
      "Soft milk-solid dumplings soaked in fragrant sugar syrup.",
  },

  {
    id: 22,
    name: "Cheesecake",
    category: "Desserts",
    price: 260,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    description:
      "Creamy cheesecake with a smooth texture and delicious biscuit base.",
  },

  {
    id: 23,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 220,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    description:
      "Moist chocolate cake layered with rich chocolate cream.",
  },

  {
    id: 24,
    name: "Mango Smoothie",
    category: "Beverages",
    price: 170,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=800&q=80",
    description:
      "Refreshing mango smoothie made with ripe mangoes and chilled milk.",
  },

  {
    id: 25,
    name: "Fresh Lime Soda",
    category: "Beverages",
    price: 100,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    description:
      "Refreshing lime drink with a bright citrus flavour.",
  },

  {
    id: 26,
    name: "Masala Chai",
    category: "Beverages",
    price: 80,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80",
    description:
      "Traditional Indian tea brewed with milk and aromatic spices.",
  },

  {
    id: 27,
    name: "Chicken Tikka",
    category: "North Indian",
    price: 300,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    description:
      "Tender chicken pieces marinated with spices and grilled to perfection.",
  },

  {
    id: 28,
    name: "Tandoori Chicken",
    category: "North Indian",
    price: 360,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    description:
      "Classic tandoori chicken marinated with yoghurt and aromatic spices.",
  },

  {
    id: 29,
    name: "Veg Thali",
    category: "South Indian",
    price: 250,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    description:
      "A complete traditional meal featuring rice, vegetables, curries and sides.",
  },

  {
    id: 30,
    name: "Paneer Pizza",
    category: "Western",
    price: 340,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    description:
      "Loaded pizza topped with paneer, vegetables, mozzarella and herbs.",
  },
];

export default foods;
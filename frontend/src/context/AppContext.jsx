import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AppContext = createContext();

const API_URL = "http://localhost:8080";

export function AppProvider({ children }) {

  /* =========================================
     USER
  ========================================= */

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem(
        "dinebite_user"
      );

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });


  /* =========================================
     CART
  ========================================= */

  const [cart, setCart] = useState([]);


  /* =========================================
     WISHLIST
  ========================================= */

  const [wishlist, setWishlist] =
    useState(() => {

      const savedWishlist =
        localStorage.getItem(
          "dinebite_wishlist"
        );

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    });


  /* =========================================
     LOAD CART FROM ORACLE
  ========================================= */

  const loadCart = async (userId) => {

    if (!userId) {

      setCart([]);

      return;
    }

    try {

      console.log(
        "LOADING CART FOR USER:",
        userId
      );

      const response = await fetch(
        `${API_URL}/api/cart/${userId}`
      );

      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "LOAD CART BACKEND ERROR:",
          errorText
        );

        throw new Error(
          errorText ||
          "Failed to load cart"
        );
      }

      const data =
        await response.json();

      console.log(
        "CART FROM ORACLE:",
        data
      );


      /* =====================================
         CONVERT BACKEND CART
         TO FRONTEND CART
      ===================================== */

      const formattedCart =
        data.map((item) => ({

          /*
           * IMPORTANT
           * item.id = CART_ITEMS.ID
           *
           * item.product.id =
           * FOOD.ID
           */

          id: item.product.id,

          cartItemId: item.id,

          name:
            item.product.name,

          description:
            item.product.description,

          price:
            item.product.price,

          category:
            item.product.category,

          image:
            item.product.imageUrl,

          quantity:
            item.quantity,

        }));


      console.log(
        "FORMATTED CART:",
        formattedCart
      );

      setCart(formattedCart);

    } catch (error) {

      console.error(
        "LOAD CART ERROR:",
        error
      );

      setCart([]);
    }
  };


  /* =========================================
     LOAD CART WHEN USER CHANGES
  ========================================= */

  useEffect(() => {

    if (user?.id) {

      console.log(
        "Loading cart for Oracle USER_ID:",
        user.id
      );

      loadCart(user.id);

    } else {

      setCart([]);

    }

  }, [user]);


  /* =========================================
     ADD TO CART
  ========================================= */

  const addToCart = async (food) => {

    if (!user?.id) {

      alert(
        "Please login first."
      );

      return;
    }


    if (!food?.id) {

      alert(
        "Food ID is missing."
      );

      return;
    }


    console.log(
      "ADDING FOOD TO ORACLE:",
      {
        userId: user.id,
        productId: food.id,
        quantity: 1,
      }
    );


    try {

      const response = await fetch(
        `${API_URL}/api/cart/${user.id}/add?productId=${food.id}&quantity=1`,
        {
          method: "POST",
        }
      );


      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "ADD CART BACKEND ERROR:",
          errorText
        );

        throw new Error(
          errorText ||
          "Failed to add product"
        );
      }


      const result =
        await response.json();

      console.log(
        "CART SAVED TO ORACLE:",
        result
      );


      /* Reload from Oracle */

      await loadCart(user.id);

    } catch (error) {

      console.error(
        "ADD TO CART ERROR:",
        error
      );

      alert(
        "Add to cart failed: " +
        error.message
      );
    }
  };


  /* =========================================
     INCREASE QUANTITY
  ========================================= */

  const increaseQuantity = async (
    foodId
  ) => {

    if (!user?.id) {

      alert(
        "Please login first."
      );

      return;
    }


    const item =
      cart.find(
        (cartItem) =>
          String(cartItem.id) ===
          String(foodId)
      );


    if (!item) {

      console.error(
        "CART ITEM NOT FOUND:",
        foodId
      );

      return;
    }


    const newQuantity =
      Number(item.quantity) + 1;


    try {

      const response = await fetch(
        `${API_URL}/api/cart/${user.id}/update?productId=${foodId}&quantity=${newQuantity}`,
        {
          method: "PUT",
        }
      );


      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText ||
          "Failed to update quantity"
        );
      }


      await loadCart(user.id);

    } catch (error) {

      console.error(
        "INCREASE QUANTITY ERROR:",
        error
      );

      alert(
        "Unable to increase quantity."
      );
    }
  };


  /* =========================================
     DECREASE QUANTITY
  ========================================= */

  const decreaseQuantity = async (
    foodId
  ) => {

    if (!user?.id) {
      return;
    }


    const item =
      cart.find(
        (cartItem) =>
          String(cartItem.id) ===
          String(foodId)
      );


    if (!item) {
      return;
    }


    const newQuantity =
      Math.max(
        1,
        Number(item.quantity) - 1
      );


    try {

      const response = await fetch(
        `${API_URL}/api/cart/${user.id}/update?productId=${foodId}&quantity=${newQuantity}`,
        {
          method: "PUT",
        }
      );


      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText ||
          "Failed to update quantity"
        );
      }


      await loadCart(user.id);

    } catch (error) {

      console.error(
        "DECREASE QUANTITY ERROR:",
        error
      );

      alert(
        "Unable to decrease quantity."
      );
    }
  };


  /* =========================================
     REMOVE FROM CART
  ========================================= */

  const removeFromCart = async (
    foodId
  ) => {

    if (!user?.id) {

      alert(
        "Please login first."
      );

      return;
    }


    if (!foodId) {

      console.error(
        "REMOVE CART ERROR: Missing food ID"
      );

      return;
    }


    console.log(
      "REMOVING FROM ORACLE:",
      {
        userId: user.id,
        productId: foodId,
      }
    );


    try {

      const response = await fetch(
        `${API_URL}/api/cart/${user.id}/remove?productId=${foodId}`,
        {
          method: "DELETE",
        }
      );


      console.log(
        "REMOVE RESPONSE STATUS:",
        response.status
      );


      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "REMOVE CART BACKEND ERROR:",
          errorText
        );

        throw new Error(
          errorText ||
          "Failed to remove item"
        );
      }


      const result =
        await response.text();

      console.log(
        "REMOVE CART SUCCESS:",
        result
      );


      /*
       * IMPORTANT:
       * Reload cart from Oracle.
       *
       * This guarantees the website
       * displays the real database state.
       */

      await loadCart(user.id);

    } catch (error) {

      console.error(
        "REMOVE CART ERROR:",
        error
      );

      alert(
        "Unable to remove item: " +
        error.message
      );
    }
  };


  /* =========================================
     CLEAR CART
  ========================================= */

  const clearCart = async () => {

    if (!user?.id) {

      alert(
        "Please login first."
      );

      return;
    }


    try {

      const response = await fetch(
        `${API_URL}/api/cart/${user.id}/clear`,
        {
          method: "DELETE",
        }
      );


      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText ||
          "Failed to clear cart"
        );
      }


      setCart([]);

    } catch (error) {

      console.error(
        "CLEAR CART ERROR:",
        error
      );

      alert(
        "Unable to clear cart: " +
        error.message
      );
    }
  };


  /* =========================================
     WISHLIST
  ========================================= */

  const toggleWishlist = (id) => {

    setWishlist(
      (currentWishlist) => {

        if (
          currentWishlist.includes(id)
        ) {

          return currentWishlist.filter(
            (itemId) =>
              itemId !== id
          );
        }

        return [
          ...currentWishlist,
          id,
        ];
      }
    );
  };


  /* =========================================
     LOGIN
  ========================================= */

  const login = async (
    email,
    password
  ) => {

    try {

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );


      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "LOGIN ERROR:",
          errorText
        );

        return false;
      }


      const loggedInUser =
        await response.json();


      console.log(
        "DATABASE USER:",
        loggedInUser
      );


      const safeUser = {

        id:
          loggedInUser.id,

        name:
          loggedInUser.name,

        email:
          loggedInUser.email,

        phone:
          loggedInUser.phone,

        address:
          loggedInUser.address,

        role:
          loggedInUser.role,

      };


      setUser(safeUser);


      localStorage.setItem(
        "dinebite_user",
        JSON.stringify(safeUser)
      );


      return true;

    } catch (error) {

      console.error(
        "LOGIN REQUEST ERROR:",
        error
      );

      return false;
    }
  };


  /* =========================================
     REGISTER
  ========================================= */

  const register = async (
    name,
    email,
    password
  ) => {

    try {

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );


      if (!response.ok) {

        const errorText =
          await response.text();

        console.error(
          "REGISTER ERROR:",
          errorText
        );

        return false;
      }


      const registeredUser =
        await response.json();


      console.log(
        "REGISTERED DATABASE USER:",
        registeredUser
      );


      const safeUser = {

        id:
          registeredUser.id,

        name:
          registeredUser.name,

        email:
          registeredUser.email,

        phone:
          registeredUser.phone,

        address:
          registeredUser.address,

        role:
          registeredUser.role,

      };


      setUser(safeUser);


      localStorage.setItem(
        "dinebite_user",
        JSON.stringify(safeUser)
      );


      return true;

    } catch (error) {

      console.error(
        "REGISTER REQUEST ERROR:",
        error
      );

      return false;
    }
  };


  /* =========================================
     LOGOUT
  ========================================= */

  const logout = () => {

    setUser(null);

    setCart([]);

    localStorage.removeItem(
      "dinebite_user"
    );
  };


  /* =========================================
     SAVE WISHLIST
  ========================================= */

  useEffect(() => {

    localStorage.setItem(
      "dinebite_wishlist",
      JSON.stringify(wishlist)
    );

  }, [wishlist]);


  /* =========================================
     CART COUNT
  ========================================= */

  const cartCount =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 1),
      0
    );


  /* =========================================
     CART TOTAL
  ========================================= */

  const cartTotal =
    cart.reduce(
      (total, item) =>
        total +
        Number(item.price) *
          Number(item.quantity || 1),
      0
    );


  /* =========================================
     PROVIDER
  ========================================= */

  return (

    <AppContext.Provider
      value={{

        cart,

        setCart,

        wishlist,

        user,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        toggleWishlist,

        login,

        register,

        logout,

        cartCount,

        cartTotal,

        loadCart,

      }}
    >

      {children}

    </AppContext.Provider>
  );
}


/* =========================================
   USE APP
========================================= */

export function useApp() {

  return useContext(
    AppContext
  );
}
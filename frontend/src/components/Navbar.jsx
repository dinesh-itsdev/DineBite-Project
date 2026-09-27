import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 8.7c0 5.2-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 4h2l2.1 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6" />
      <circle cx="9" cy="19" r="1.2" />
      <circle cx="18" cy="19" r="1.2" />
    </svg>
  );
}

function Navbar() {
  const navigate = useNavigate();
  const { cartCount, user, logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="navbar-container">

        <Link to="/" className="brand">
          <span className="brand-mark">D</span>
          <span className="brand-name">
            Dine<span>Bite</span>
          </span>
        </Link>

        <nav className="main-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/restaurants"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Restaurants
          </NavLink>

          <NavLink
            to="/ai-food"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            AI Recommendations
          </NavLink>
        </nav>

        <div className="nav-actions">

          <button
            className="nav-search"
            onClick={() =>
              document
                .getElementById("food-search")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            title="Search"
          >
            <SearchIcon />
          </button>

          <Link to="/wishlist" className="nav-icon" title="Wishlist">
            <HeartIcon />
          </Link>

          <Link to="/cart" className="nav-cart">
            <CartIcon />
            <span>Cart</span>

            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </Link>

          {user ? (
            <div className="logged-user">
              <span className="user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </span>

              <span className="user-name">
                {user.name}
              </span>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}

export default Navbar;
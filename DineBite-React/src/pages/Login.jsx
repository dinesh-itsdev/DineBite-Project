import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid email or password."
        );
        return;
      }

      /*
       * Save logged-in user
       */
      localStorage.setItem(
        "dinebite_user",
        JSON.stringify(data)
      );

      navigate("/");

    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to server. Please make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <div className="auth-container">

        {/* LEFT SIDE */}

        <section className="auth-brand-panel">

          <div className="auth-brand-content">

            <span className="auth-small-label">
              WELCOME TO DINEBITE
            </span>

            <h1>
              Good food.
              <br />
              Better moments.
            </h1>

            <p>
              Discover restaurants, explore new dishes,
              and get personalised recommendations based
              on your taste.
            </p>

            <div className="auth-feature-list">

              <div className="auth-feature">
                <span>01</span>

                <div>
                  <strong>Discover</strong>

                  <p>
                    Explore dishes from different cuisines.
                  </p>
                </div>
              </div>

              <div className="auth-feature">
                <span>02</span>

                <div>
                  <strong>Personalise</strong>

                  <p>
                    Find food recommendations for your mood.
                  </p>
                </div>
              </div>

              <div className="auth-feature">
                <span>03</span>

                <div>
                  <strong>Order</strong>

                  <p>
                    Build your cart and continue to checkout.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* RIGHT SIDE */}

        <section className="auth-form-panel">

          <div className="auth-form-box">

            <div className="auth-form-heading">

              <span className="section-label">
                ACCOUNT
              </span>

              <h2>
                Welcome back
              </h2>

              <p>
                Sign in to continue to your DineBite account.
              </p>

            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />

              </div>

              <div className="form-group">

                <div className="password-label-row">

                  <label htmlFor="password">
                    Password
                  </label>

                  <span>
                    Required
                  </span>

                </div>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />

              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading
                  ? "Signing in..."
                  : "Sign in"}

                {!loading && <span>→</span>}
              </button>

            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <p className="auth-register-text">

              Don't have an account?

              <Link to="/register">
                Create an account
              </Link>

            </p>

            <Link
              to="/"
              className="auth-back-home"
            >
              ← Back to DineBite
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Login;
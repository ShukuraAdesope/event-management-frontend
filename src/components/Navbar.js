import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {

  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  // keep navbar updated when login/logout happens
  useEffect(() => {

    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    checkToken();

    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };

  }, []);

  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    // redirect to dashboard after logout
    navigate("/");

  };

  return (

    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        backgroundColor: "#ff4da6",
        color: "white"
      }}
    >

      <h2 style={{ margin: 0 }}>
        📅 MERN Mavericks
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center"
        }}
      >

        {!token && (
          <Link
            to="/login"
            style={{ color: "white", textDecoration: "none" }}
          >
            Login
          </Link>
        )}

        {!token && (
          <Link
            to="/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            Register
          </Link>
        )}

        {token && (
          <Link
            to="/"
            style={{ color: "white", textDecoration: "none" }}
          >
            Dashboard
          </Link>
        )}

        {token && (
          <Link
            to="/add"
            style={{ color: "white", textDecoration: "none" }}
          >
            Add Event
          </Link>
        )}

        {token && (

          <button
            onClick={logout}
            style={{
              backgroundColor: "white",
              color: "#ff4da6",
              border: "none",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>

        )}

      </div>

    </nav>

  );

}

export default Navbar;
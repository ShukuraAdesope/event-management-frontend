import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {

  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  // check token whenever page loads
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  });

  const logout = () => {

    localStorage.removeItem("token");

    setToken(null);

    navigate("/login", {
      state: { message: "Logout successful!" }
    });

  };

  return (

    <nav>

      <h2>📅 MERN Mavericks</h2>

      <div>

        {!token && <Link to="/login">Login</Link>}

        {!token && <Link to="/register">Register</Link>}

        {token && <Link to="/">Dashboard</Link>}

        {token && <Link to="/add">Add Event</Link>}

        {token && <button onClick={logout}>Logout</button>}

      </div>

    </nav>

  );

}

export default Navbar;
import { Link } from "react-router-dom";

function Navbar() {

  const token = localStorage.getItem("token");

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (

    <nav>

      {/* NEW LOGO */}
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
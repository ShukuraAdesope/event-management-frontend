import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  // message from logout or registration
  const message = location.state?.message;

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", user);

      // store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");

      // redirect to dashboard
      navigate("/", { replace: true });

      // refresh so Navbar updates immediately
      window.location.reload();

    }
    catch (error) {

      console.log(error);

      alert("Login failed");

    }

  };

  return (

    <div className="container">

      <h2>Login</h2>

      {/* message display (logout or registration) */}
      {message && (

        <p
          style={{
            color: "green",
            backgroundColor: "#e6ffe6",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "15px"
          }}
        >
          {message}
        </p>

      )}

      <form onSubmit={handleSubmit}>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button>
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;
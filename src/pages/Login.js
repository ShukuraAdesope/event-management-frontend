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

  // message coming from logout
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

      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      navigate("/"); // go to dashboard

    }
    catch {

      alert("Login failed");

    }

  };

  return (

    <div className="container">

      <h2>Login</h2>

      {/* logout success message */}
      {message && (

        <p
          style={{
            color: "green",
            backgroundColor: "#e6ffe6",
            padding: "10px",
            borderRadius: "5px"
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
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button>Login</button>

      </form>

    </div>

  );

}

export default Login;
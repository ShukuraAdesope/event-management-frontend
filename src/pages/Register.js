import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({

    username: "",
    email: "",
    password: ""

  });

  const handleChange = (e) => {

    setUser({

      ...user,
      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", user);

      alert("Registered successfully!");

      // redirect to login page
      navigate("/login", {
        state: { message: "Registration successful! Please login." }
      });

    }
    catch (error) {

      console.log(error);

      alert("Registration error");

    }

  };

  return (

    <div className="container">

      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

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
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;
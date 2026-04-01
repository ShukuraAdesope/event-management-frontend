import { useState } from "react";

import API from "../services/api";

function Register() {

  const [user, setUser] = useState({

    username: "",

    email: "",

    password: ""

  });

  const handleChange = e => {

    setUser({

      ...user,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async e => {

    e.preventDefault();

    try {

      await API.post("/auth/register", user);

      alert("Registered successfully");

      window.location.href = "/login";

    } catch (error) {

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

        />

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

        <button>Register</button>

      </form>

    </div>

  );

}

export default Register;
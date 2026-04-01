import { useState } from "react";

import API from "../services/api";

function Login() {

  const [user, setUser] = useState({

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

      const res = await API.post("/auth/login", user);

      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      window.location.href = "/";

    } catch {

      alert("Login failed");

    }

  };

  return (

    <div className="container">

      <h2>Login</h2>

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
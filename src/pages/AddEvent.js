import { useState } from "react";

import API from "../services/api";

function AddEvent() {

  const [event, setEvent] = useState({

    title: "",

    description: "",

    date: ""

  });

  const handleChange = e => {

    setEvent({

      ...event,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async e => {

    e.preventDefault();

    await API.post("/events", event);

    alert("Event created");

    window.location.href = "/";

  };

  return (

    <div className="container">

      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>

        <input

          name="title"

          placeholder="Event title"

          onChange={handleChange}

        />

        <input

          name="description"

          placeholder="Event description"

          onChange={handleChange}

        />

        <input

          name="date"

          type="date"

          onChange={handleChange}

        />

        <button>Create Event</button>

      </form>

    </div>

  );

}

export default AddEvent;
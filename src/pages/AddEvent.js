import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function AddEvent() {

  const navigate = useNavigate();

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

    try {

      await API.post("/events", event);

      alert("Event created successfully!");

      navigate("/"); // better navigation

    }
    catch (error) {

      console.log(error);

      alert("Error creating event");

    }

  };

  return (

    <div className="container">

      <h2>Create Event</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          placeholder="Event title"
          value={event.title}
          onChange={handleChange}
          required
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "100%",
            borderRadius: "5px"
          }}
        />

        <input
          name="description"
          placeholder="Event description"
          value={event.description}
          onChange={handleChange}
          required
          style={{
            marginBottom: "10px",
            padding: "8px",
            width: "100%",
            borderRadius: "5px"
          }}
        />

        <input
          name="date"
          type="date"
          value={event.date}
          onChange={handleChange}
          required
          style={{
            marginBottom: "15px",
            padding: "8px",
            width: "100%",
            borderRadius: "5px"
          }}
        />

        <button
          style={{
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: "#ff4da6",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Create Event
        </button>

      </form>

    </div>

  );

}

export default AddEvent;
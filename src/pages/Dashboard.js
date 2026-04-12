import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {

    fetchEvents();

  }, []);



  const fetchEvents = async () => {

    try {

      const res = await API.get("/events");

      setEvents(res.data);

    }
    catch (error) {

      console.log(error);

      alert("Error loading events");

    }

  };



  const deleteEvent = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this event?");

    if (!confirmDelete) return;

    try {

      await API.delete("/events/" + id);

      fetchEvents();

    }
    catch (error) {

      console.log(error);

      alert("Delete failed");

    }

  };



  // filter events based on search
  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );



  return (

    <div className="container">

      <h2>Event Dashboard</h2>

      {/* search bar */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "20px",
          padding: "8px",
          width: "100%",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      {filteredEvents.length === 0 && (

        <p>No events found.</p>

      )}

      {filteredEvents.map((e) => (

        <div
          className="event-card"
          key={e._id}
          style={{
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >

          <h3>{e.title}</h3>

          <p>{e.description}</p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(e.date).toLocaleDateString()}
          </p>

          {/* only logged in users can edit/delete */}
          {token && (

            <div style={{ marginTop: "10px" }}>

              <Link to={`/edit/${e._id}`}>

                <button
                  className="edit-btn"
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>

              </Link>

              <button
                className="delete-btn"
                onClick={() => deleteEvent(e._id)}
              >
                Delete
              </button>

            </div>

          )}

        </div>

      ))}

    </div>

  );

}

export default Dashboard;
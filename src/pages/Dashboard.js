import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  // check if user logged in
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



  // search filter
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );



  return (

    <div className="container">

      <h2>Event Dashboard</h2>

      {/* search */}
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



      {filteredEvents.map(event => (

        <div
          key={event._id}
          style={{
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
          }}
        >

          <h3>{event.title}</h3>

          <p>{event.description}</p>

          <p>
            <strong>Date:</strong>{" "}
            {event.date ? event.date.split("T")[0] : ""}
          </p>



          {/* show buttons ONLY if logged in */}
          {token && (

            <div style={{ marginTop: "10px" }}>

              <Link to={`/edit/${event._id}`}>

                <button style={{ marginRight: "10px" }}>
                  Edit
                </button>

              </Link>



              <button onClick={() => deleteEvent(event._id)}>
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
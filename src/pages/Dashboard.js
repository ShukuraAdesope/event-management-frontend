import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  // update token when login/logout happens
  useEffect(() => {

    const checkToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };

  }, []);

  // always fetch events (public access allowed)
  useEffect(() => {

    fetchEvents();

  }, [token]);



  const fetchEvents = async () => {

    try {

      const res = await API.get("/events");

      setEvents(res.data);

    } catch (error) {

      console.log("Error loading events", error);

    }

  };



  const deleteEvent = async (id) => {

    const confirmDelete = window.confirm("Delete this event?");

    if (!confirmDelete) return;

    try {

      await API.delete("/events/" + id);

      fetchEvents();

    } catch (error) {

      alert("Delete failed");

    }

  };



  // search works for public users
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );



  return (

    <div className="container">

      <h2>Event Dashboard</h2>

      {/* PUBLIC SEARCH */}
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "15px",
          padding: "8px",
          width: "100%",
          borderRadius: "5px"
        }}
      />



      {filteredEvents.length === 0 && (

        <p>No events created yet.</p>

      )}



      {filteredEvents.map(event => (

        <div
          key={event._id}
          style={{
            marginBottom: "15px",
            padding: "10px",
            border: "1px solid #eee",
            borderRadius: "6px"
          }}
        >

          <h3>{event.title}</h3>

          <p>{event.description}</p>

          <p>

            {event.date ? event.date.split("T")[0] : ""}

          </p>



          {/* only visible when logged in */}
          {token && (

            <div>

              <Link to={`/edit/${event._id}`}>

                <button>Edit</button>

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
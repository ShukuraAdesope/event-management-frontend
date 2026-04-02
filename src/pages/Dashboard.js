import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) {

      navigate("/login");

      return;

    }

    fetchEvents();

  }, [token, navigate]);



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

    const confirmDelete = window.confirm("Delete this event?");

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



  return (

    <div className="container">

      <h2>Event Dashboard</h2>

      {events.length === 0 && (

        <p>No events created yet.</p>

      )}

      {events.map((e) => (

        <div className="event-card" key={e._id}>

          <h3>{e.title}</h3>

          <p>{e.description}</p>

          <p>
            {new Date(e.date).toISOString().split("T")[0]}
          </p>

          <div>

            <Link to={`/edit/${e._id}`}>

              <button className="edit-btn">

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

        </div>

      ))}

    </div>

  );

}

export default Dashboard;
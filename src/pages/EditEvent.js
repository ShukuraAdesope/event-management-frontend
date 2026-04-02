import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditEvent() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      alert("Please login first");
      navigate("/login");
      return;

    }

    const loadEvent = async () => {

      try {

        const res = await API.get(`/events/${id}`);

        setEvent({

          title: res.data.title || "",
          description: res.data.description || "",
          date: res.data.date
            ? res.data.date.substring(0, 10)
            : ""

        });

        setLoading(false);

      }
      catch (error) {

        console.log(error);

        alert("Error loading event");

        navigate("/");

      }

    };

    loadEvent();

  }, [id, navigate]);



  const handleChange = (e) => {

    setEvent({

      ...event,
      [e.target.name]: e.target.value

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.put(`/events/${id}`, event);

      alert("Event updated successfully");

      navigate("/");

    }
    catch (error) {

      console.log(error);

      alert("Update failed");

    }

  };



  if (loading) {

    return (

      <div className="container">

        <h2>Loading event...</h2>

      </div>

    );

  }



  return (

    <div className="container">

      <h2>Edit Event</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="title"
          value={event.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          value={event.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={event.date}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Update Event
        </button>

      </form>

    </div>

  );

}

export default EditEvent;
import axios from "axios";

const API = axios.create({

  baseURL: "https://event-management-backend-fdja.onrender.com/api"

});

export default API;
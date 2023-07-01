import axios from "axios";

const API_URL = "https://localhost:44354";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;

import axios from "axios";

const baseURL = "http://localhost:3000/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
});

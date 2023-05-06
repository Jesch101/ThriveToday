import axios from "axios";

// const baseURL = "http://localhost:8000/api";
const baseURL = "https://thrivetoday.herokuapp.com/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 30000,
});

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;

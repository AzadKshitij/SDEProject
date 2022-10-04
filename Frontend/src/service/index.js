import axios from "axios";

const baseURL = "http://127.0.0.1:5000/";

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

export default service;

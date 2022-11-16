import axios from "axios";

const baseURL = "http://65.0.108.6:1337";

const service = axios.create({
	baseURL: baseURL,
	timeout: 5000,
});

export default service;

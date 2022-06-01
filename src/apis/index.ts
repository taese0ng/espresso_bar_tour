import axios from "axios";

const API = axios.create({
	baseURL: "",
	timeout: 5000,
});

export default API;

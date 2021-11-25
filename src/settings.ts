import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost/api/",
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
})
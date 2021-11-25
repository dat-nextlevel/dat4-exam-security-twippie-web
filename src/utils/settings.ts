import axios from "axios";

export const apiHost = "http://localhost:8080";

export const api = axios.create({
	baseURL: apiHost + "/api/",
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
})
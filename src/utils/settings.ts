import axios from "axios";

// Little scuffed but will do
export const apiHost = location.hostname.includes("localhost") ? "http://localhost:8080" : "https://dat4-security-twippie.herokuapp.com";

export const api = axios.create({
	baseURL: apiHost + "/api/",
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
})
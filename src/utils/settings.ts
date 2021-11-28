import axios from "axios";

export const apiHost = "https://dat4-security-twippie.herokuapp.com/" // "http://localhost:8080";

console.log(process.env.API_HOST)
console.log(apiHost)

export const api = axios.create({
	baseURL: apiHost + "/api/",
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
})
import { user } from "../stores/user"
import { api } from "../utils/settings";
import type { FormDataLogin, FormDataRegister, User } from "../types";
import { navigate } from "svelte-navigator";

export function handleSignOut() {
	user.set(null);
	localStorage.removeItem("token")
	navigate("/")
}

export const getSignedInUser = async (): Promise<User> => {
	const token = localStorage.getItem("token");
	if (token) {
		api.defaults.headers["Authorization"] = `Bearer ${token}`
		try {
			const response = await api.get<User>("me");
			return response.data;
		}
		catch (error) {
			console.log(error);
		}
	}
	return null;
}

export const register = async (data: FormDataRegister): Promise<User> => {
	handleSignOut();
	try {
		const token = (await api.post("register", data)).data.token;
		localStorage.setItem("token", token);

		return await getSignedInUser();
	} catch (error) {
		console.log(error)
	}
}

export const login = async (data: FormDataLogin): Promise<User> => {
	handleSignOut();
	try {
		const token = (await api.post("login", data)).data.token;
		localStorage.setItem("token", token);

		return await getSignedInUser();
	} catch (error) {
		console.log(error)
	}
}


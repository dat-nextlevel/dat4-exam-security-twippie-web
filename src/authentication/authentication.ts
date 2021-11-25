import { user } from "../stores/user"
import { api } from "../settings";
import type { FormDataLogin, FormDataRegister, User } from "../types";

export function handleSignOut() {
	user.set(null);
	localStorage.setItem("token", null)
}

export const getSignedInUser = async (): Promise<User> => {
	const token = localStorage.getItem("token");
	if (token) {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`
	}
	try {
		const response = await api.get<User>("me");

		user.set(response.data)
		return response.data;
	}
	catch (error) {
		console.log(error);
	}
}

export const register = async (data: FormDataRegister): Promise<User> => {
	try {
		const token = (await api.post("register", data)).data;
		localStorage.setItem("token", token);

		return await getSignedInUser();
	} catch (error) {
		console.log(error)
	}
}

export const login = async (data: FormDataLogin): Promise<User> => {
	try {
		const token = (await api.post("register", data)).data;
		localStorage.setItem("token", token);

		return await getSignedInUser();
	} catch (error) {
		console.log(error)
	}
}


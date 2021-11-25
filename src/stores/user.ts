import { writable } from "svelte/store";
import type { User } from "../utils/types";

export const user = writable<User>(null);
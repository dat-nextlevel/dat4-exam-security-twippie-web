import { apiHost } from "./settings";

/**
 * 
 *
 * This is scuffed... blame Spring.
 * 
 */

export function getImageUrl(imageId: string) {
	if (!imageId)
		return "";
	return apiHost + "/api/images/" + imageId;
}
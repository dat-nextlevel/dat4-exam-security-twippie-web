import { apiHost } from "./settings";
import Chance from "chance"




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

export function getColorCssClassFromUsername(username: string) {
	const colors = ["gray", "red", "yellow", "green", "blue", "indigo", "purple", "pink"]
	const variants = [200, 300, 400, 500, 600]

	const chance = new Chance(username)
	const colorI = chance.integer({ min: 0, max: colors.length - 1 })
	const variantI = chance.integer({ min: 0, max: variants.length - 1 })


	return colors[colorI] + "-" + variants[variantI]
}
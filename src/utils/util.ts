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

export function getAuditUiUtilsFromAuditType(type: string) {
	const audits = {
		USER_MUTED: {
			cssColor: "yellow-400",
			icon: "person",
			action: "update"
		},
		USER_UNMUTED: {
			cssColor: "green-400",
			icon: "person",
			action: "add"
		},
		USER_DELETED: {
			cssColor: "red-400",
			icon: "person",
			action: "remove"
		},
		POST_DELETED: {
			cssColor: "purple-400",
			icon: "forum",
			action: "remove"
		},
		DEFAULT: {
			cssColor: "indigo-400",
			icon: "settings",
			action: "update"
		}
	}

	return audits[type] || audits["DEFAULT"]
}
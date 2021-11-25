export type User = {
	"username": string,
	"likedPosts": Array<Post>,
	"posts": Array<Post>
	"createdDate": number,
	"avatar": Image,
	"email": String
}

export type Post = {
	"id": string,
	"author": User,
	"content": string,
	"image": Image,
	"createdAt": number,
	"likes": Array<String>
}

export type Image = {
	"id": string,
	"base64": string
}

export type FormDataLogin = {
	"username": string,
	"password": string,
}

export type FormDataRegister = {
	"email": string,
	"username": string,
	"password": string,
	"passwordRepeat": string,
}
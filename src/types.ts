export type User = {
	"id": string,
	"username": string,
	"likedPosts": Array<Post>,
	"posts": Array<Post>
	"createdDate": number,
	"avatar": Image,
	"email": String,
	"roles": Array<string>,
	"muted": boolean
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
	"url": string
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
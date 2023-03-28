export class DreamNotFoundError extends Error {
	readonly statusCode: number

	constructor(message: string, statusCode = 404) {
		super(message)
		this.statusCode = statusCode
		Object.setPrototypeOf(this, DreamNotFoundError.prototype)
	}
}

export class InterpretationDreamError extends Error {
	readonly statusCode: number

	constructor(message: string, statusCode = 500) {
		super(message)
		this.statusCode = statusCode
		this.name = 'InterpretationError'
		Object.setPrototypeOf(this, InterpretationDreamError.prototype)
	}
}

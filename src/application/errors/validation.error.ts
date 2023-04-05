import { ValidationError as ValidationErrorClassValidator } from 'class-validator'

export class ValidationError extends Error {
	readonly statusCode: number
	readonly errors: ValidationErrorClassValidator[]

	constructor(errors: ValidationErrorClassValidator[]) {
		super('Validation error')
		this.statusCode = 400
		this.errors = errors
		Object.setPrototypeOf(this, ValidationError.prototype)
	}
}

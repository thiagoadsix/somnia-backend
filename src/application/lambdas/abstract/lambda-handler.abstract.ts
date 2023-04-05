import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { ValidationError } from '@application/errors'

abstract class LambdaHandlerAbstract<T> {
	protected abstract handler(validatedBody: T): Promise<APIGatewayProxyResult>

	async execute(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
		try {
			const body: T = JSON.parse(event.body!) ?? undefined
			const validatedBody = await this.validate(body)
			return await this.handler(validatedBody)
		} catch (error) {
			if (error instanceof ValidationError) {
				return {
					statusCode: error.statusCode,
					body: JSON.stringify({
						message: error.errors.map((err) => ({
							property: err.property,
							value: err.value,
							constraints: err.constraints
						}))
					})
				}
			}

			return {
				statusCode: 500,
				body: JSON.stringify({
					message: 'Internal server error'
				})
			}
		}
	}

	private async validate(body: T): Promise<T> {
		const validatedObject = await plainToClass(this.getValidationClass(), body)
		const errors = await validate(validatedObject as unknown as object)

		if (errors.length > 0) {
			throw new ValidationError(errors)
		}

		return validatedObject
	}

	protected abstract getValidationClass(): new () => T
}

export { LambdaHandlerAbstract }

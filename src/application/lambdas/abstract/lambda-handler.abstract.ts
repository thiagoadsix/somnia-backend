import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { DreamNotFoundError } from '@domain/errors/dream-not-found.error'

import { ValidationError } from '@application/errors'

export type EventType = 'body' | 'pathParameters' | 'queryStringParameters' | 'body&path'

abstract class LambdaHandlerAbstract<T> {
	protected abstract handler(validatedBody: T): Promise<APIGatewayProxyResult>

	async execute(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
		let data

		try {
			if (this.eventType() === 'body') {
				console.log('Body ->', JSON.stringify(event.body))
				data = JSON.parse(event.body ?? '{}')
			} else if (this.eventType() === 'queryStringParameters') {
				console.log('Query string parameters ->', JSON.stringify(event.queryStringParameters))
				data = JSON.parse(JSON.stringify(event.queryStringParameters) ?? '{}')
			} else if (this.eventType() === 'pathParameters') {
				console.log('Path parameters ->', JSON.stringify(event.pathParameters))
				data = JSON.parse(JSON.stringify(event.pathParameters) ?? '{}')
			} else if (this.eventType() === 'body&path') {
				const body = JSON.parse(event.body ?? '{}')
				const path = JSON.parse(JSON.stringify(event.pathParameters) ?? '{}')

				data = {
					...body,
					...path
				}
			}

			const validatedBody = await this.validate(data)
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

			if (error instanceof DreamNotFoundError) {
				return {
					statusCode: error.statusCode,
					body: JSON.stringify({
						message: error.message
					})
				}
			}

			console.log('Unknown error: ' + error)

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

	protected abstract eventType(): EventType
}

export { LambdaHandlerAbstract }

import { APIGatewayProxyHandler } from 'aws-lambda'

import { AppError } from '@application/errors/app.error'
import { usecase } from '@application/factories/dream/find-dream-by-id-factory'

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const id = event.pathParameters?.id ?? ''

		const dream = await usecase.execute(id)

		const response = {
			statusCode: 201,
			body: JSON.stringify(dream)
		}

		return response
	} catch (error) {
		if (error instanceof AppError) {
			const response = {
				statusCode: error.statusCode,
				body: JSON.stringify({
					message: error.message
				})
			}

			return response
		}

		const response = {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Internal server error'
			})
		}

		return response
	}
}

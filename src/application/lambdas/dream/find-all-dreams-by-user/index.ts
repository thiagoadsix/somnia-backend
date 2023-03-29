import { APIGatewayProxyHandler } from 'aws-lambda'

import { AppError } from '@application/errors/app.error'
import { usecase } from '@application/factories/dream/find-all-dreams-by-user-factory'

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const userId = event.pathParameters?.userId ?? ''

		const dream = await usecase.execute(userId)

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

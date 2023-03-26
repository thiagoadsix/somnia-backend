import { APIGatewayProxyHandler } from 'aws-lambda'

import { AppError } from '@application/exceptions/app.error'
import { usecase } from '@application/factories/dream/create-dream-factory'

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const { title, dream, tags } = JSON.parse(event.body ?? JSON.stringify({}))

		const newDream = await usecase.execute({
			title,
			dream,
			tags
		})

		const response = {
			statusCode: 201,
			body: JSON.stringify(newDream)
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

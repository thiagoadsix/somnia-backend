import { APIGatewayProxyHandler } from 'aws-lambda'

import { AppError } from '@application/errors/app.error'
import { usecase } from '@application/factories/dream/update-dream-by-id-factory'

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const id = event.pathParameters?.id ?? ''
		const { title, dream, tags } = JSON.parse(event.body ?? JSON.stringify({}))

		const execution = await usecase.execute(id, {
			title,
			dream,
			tags
		})

		const response = {
			statusCode: 201,
			body: JSON.stringify(execution)
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

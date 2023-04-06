import { APIGatewayProxyHandler } from 'aws-lambda'

import { DeleteDreamByIdHandler } from './index'

export const run: APIGatewayProxyHandler = async (event) => {
	const deleteDreamByIdHandler = new DeleteDreamByIdHandler()

	return deleteDreamByIdHandler.execute(event)
}

import { APIGatewayProxyHandler } from 'aws-lambda'

import { UpdateDreamByIdHandler } from './index'

export const run: APIGatewayProxyHandler = async (event) => {
	const updateDreamByIdHandler = new UpdateDreamByIdHandler()

	return updateDreamByIdHandler.execute(event)
}

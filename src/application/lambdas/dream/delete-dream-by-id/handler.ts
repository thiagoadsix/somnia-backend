import { APIGatewayProxyHandler } from 'aws-lambda'

import { DeleteDreamByIdHandler } from './index'

export const run: APIGatewayProxyHandler = async (event) => {
	const createDreamHandler = new DeleteDreamByIdHandler()

	return createDreamHandler.execute(event)
}

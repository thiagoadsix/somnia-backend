import { APIGatewayProxyHandler } from 'aws-lambda'

import { CreateDreamHandler } from './index'

export const run: APIGatewayProxyHandler = async (event) => {
	const createDreamHandler = new CreateDreamHandler()

	return createDreamHandler.execute(event)
}

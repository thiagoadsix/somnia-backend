import { APIGatewayProxyHandler } from 'aws-lambda'

import { FindDreamByIdHandler } from './index'

export const run: APIGatewayProxyHandler = async (event) => {
	const findDreamByIdHandler = new FindDreamByIdHandler()

	return findDreamByIdHandler.execute(event)
}

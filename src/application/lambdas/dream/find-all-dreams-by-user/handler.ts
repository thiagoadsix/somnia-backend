import { APIGatewayProxyHandler } from 'aws-lambda'

import { FindAllDreamsByUserHandler } from './index'

export const run: APIGatewayProxyHandler = async (event) => {
	const findAllDreamsByUserHandler = new FindAllDreamsByUserHandler()

	return findAllDreamsByUserHandler.execute(event)
}

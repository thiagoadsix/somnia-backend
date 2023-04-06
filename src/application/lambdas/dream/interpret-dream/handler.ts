import { APIGatewayProxyHandler } from 'aws-lambda'

import { InterpretDreamHandler } from './index'

export const run: APIGatewayProxyHandler = async (event) => {
	const interpretDreamHandler = new InterpretDreamHandler()

	return interpretDreamHandler.execute(event)
}

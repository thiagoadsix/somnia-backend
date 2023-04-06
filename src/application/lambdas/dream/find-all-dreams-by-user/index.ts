import { APIGatewayProxyResult } from 'aws-lambda'
import { instanceToPlain } from 'class-transformer'

import { usecase } from '@application/factories/dream/find-all-dreams-by-user-factory'
import { EventType, LambdaHandlerAbstract } from '@application/lambdas/abstract/lambda-handler.abstract'

import { FindAllDreamsByUserInput } from './types'

export class FindAllDreamsByUserHandler extends LambdaHandlerAbstract<FindAllDreamsByUserInput> {
	protected async handler(validatedBody: FindAllDreamsByUserInput): Promise<APIGatewayProxyResult> {
		const { userId } = validatedBody

		const newDream = await usecase.execute(userId)

		const response = {
			statusCode: 200,
			body: JSON.stringify(instanceToPlain(newDream))
		}

		return response
	}

	protected getValidationClass(): new () => FindAllDreamsByUserInput {
		return FindAllDreamsByUserInput
	}

	protected eventType(): EventType {
		return 'pathParameters'
	}
}

import { APIGatewayProxyResult } from 'aws-lambda'
import { instanceToPlain } from 'class-transformer'

import { usecase } from '@application/factories/dream/find-dream-by-id-factory'
import { EventType, LambdaHandlerAbstract } from '@application/lambdas/abstract/lambda-handler.abstract'

import { FindDreamByIdInput } from './types'

export class FindDreamByIdHandler extends LambdaHandlerAbstract<FindDreamByIdInput> {
	protected async handler(validatedBody: FindDreamByIdInput): Promise<APIGatewayProxyResult> {
		const { id } = validatedBody

		const newDream = await usecase.execute(id)

		const response = {
			statusCode: 200,
			body: JSON.stringify(instanceToPlain(newDream))
		}

		return response
	}

	protected getValidationClass(): new () => FindDreamByIdInput {
		return FindDreamByIdInput
	}

	protected eventType(): EventType {
		return 'pathParameters'
	}
}

import { APIGatewayProxyResult } from 'aws-lambda'
import { instanceToPlain } from 'class-transformer'

import { usecase } from '@application/factories/dream/interpret-dream-factory'
import { EventType, LambdaHandlerAbstract } from '@application/lambdas/abstract/lambda-handler.abstract'

import { InterpretDreamInput } from './types'

export class InterpretDreamHandler extends LambdaHandlerAbstract<InterpretDreamInput> {
	protected async handler(validatedBody: InterpretDreamInput): Promise<APIGatewayProxyResult> {
		const { id, ...input } = validatedBody

		const newDream = await usecase.execute(id, { ...input })

		const response = {
			statusCode: 200,
			body: JSON.stringify(instanceToPlain(newDream))
		}

		return response
	}

	protected getValidationClass(): new () => InterpretDreamInput {
		return InterpretDreamInput
	}

	protected eventType(): EventType {
		return 'body&path'
	}
}

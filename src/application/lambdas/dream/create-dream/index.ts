import { APIGatewayProxyResult } from 'aws-lambda'
import { instanceToPlain } from 'class-transformer'

import { usecase } from '@application/factories/dream/create-dream-factory'
import { EventType, LambdaHandlerAbstract } from '@application/lambdas/abstract/lambda-handler.abstract'

import { CreateDreamInput } from './types'

export class CreateDreamHandler extends LambdaHandlerAbstract<CreateDreamInput> {
	protected async handler(validatedBody: CreateDreamInput): Promise<APIGatewayProxyResult> {
		const { userId, title, dream, tags } = validatedBody

		const newDream = await usecase.execute({
			userId,
			title,
			dream,
			tags
		})

		const response = {
			statusCode: 201,
			body: JSON.stringify(instanceToPlain(newDream))
		}

		return response
	}

	protected getValidationClass(): new () => CreateDreamInput {
		return CreateDreamInput
	}

	protected eventType(): EventType {
		return 'body'
	}
}

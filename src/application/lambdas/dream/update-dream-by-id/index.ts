import { APIGatewayProxyResult } from 'aws-lambda'
import { instanceToPlain } from 'class-transformer'

import { usecase } from '@application/factories/dream/update-dream-by-id-factory'
import { EventType, LambdaHandlerAbstract } from '@application/lambdas/abstract/lambda-handler.abstract'

import { UpdateDreamByIdInput } from './types'

export class UpdateDreamByIdHandler extends LambdaHandlerAbstract<UpdateDreamByIdInput> {
	protected async handler(validatedBody: UpdateDreamByIdInput): Promise<APIGatewayProxyResult> {
		const { id, ...input } = validatedBody

		const newDream = await usecase.execute(id, { ...input })

		const response = {
			statusCode: 201,
			body: JSON.stringify(instanceToPlain(newDream))
		}

		return response
	}

	protected getValidationClass(): new () => UpdateDreamByIdInput {
		return UpdateDreamByIdInput
	}

	protected eventType(): EventType {
		return 'body&path'
	}
}

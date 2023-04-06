import { APIGatewayProxyResult } from 'aws-lambda'
import { instanceToPlain } from 'class-transformer'

import { usecase } from '@application/factories/dream/delete-dream-by-id-factory'
import { EventType, LambdaHandlerAbstract } from '@application/lambdas/abstract/lambda-handler.abstract'

import { DeleteDreamByIdInput } from './types'

export class DeleteDreamByIdHandler extends LambdaHandlerAbstract<DeleteDreamByIdInput> {
	protected async handler(validatedBody: DeleteDreamByIdInput): Promise<APIGatewayProxyResult> {
		const { id } = validatedBody

		const newDream = await usecase.execute(id)

		const response = {
			statusCode: 201,
			body: JSON.stringify(instanceToPlain(newDream))
		}

		return response
	}

	protected getValidationClass(): new () => DeleteDreamByIdInput {
		return DeleteDreamByIdInput
	}

	protected eventType(): EventType {
		return 'pathParameters'
	}
}

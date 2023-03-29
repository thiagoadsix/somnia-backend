import { DreamRepositoryContract } from '@domain/usecases/contracts/repositories/dream.repository.contract'

import { OpenAIApiContract } from '../contracts/api/open-ai.api.contract'

export class InterpretDreamUseCase {
	constructor(
		private readonly dreamRepositoryContract: DreamRepositoryContract,
		private readonly openAIApi: OpenAIApiContract
	) {
		this.dreamRepositoryContract = dreamRepositoryContract
		this.openAIApi = openAIApi
	}

	async execute(id: string, input: InterpretDreamUseCase.Input): Promise<InterpretDreamUseCase.Output> {
		const { dream } = input

		const dreamInterpreted = await this.openAIApi.interpretDream({ dream })

		await this.dreamRepositoryContract.updateById(id, { dreamInterpreted })
	}
}

export namespace InterpretDreamUseCase {
	export type Input = {
		dream: string
	}

	export type Output = Promise<void>
}

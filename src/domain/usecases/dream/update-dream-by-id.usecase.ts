import { Dream } from '@domain/entities/dream'
import { DreamNotFoundError } from '@domain/errors/dream-not-found.error'

import { DreamRepositoryContract } from '../contracts/repositories/dream.repository.contract'

export class UpdateDreamByIdUseCase {
	constructor(private readonly dreamRepositoryContract: DreamRepositoryContract) {}

	async execute(id: string, input: UpdateDreamByIdUseCase.Input): UpdateDreamByIdUseCase.Output {
		const dream = await this.dreamRepositoryContract.findById(id)

		if (!dream) {
			throw new DreamNotFoundError('Dream does not exists.')
		}

		await this.dreamRepositoryContract.updateById(id, input)
	}
}

export namespace UpdateDreamByIdUseCase {
	export type Input = Partial<Omit<Dream, 'id' | 'userId' | 'dreamInterpreted' | 'liked' | 'createdAt'>>

	export type Output = Promise<void>
}

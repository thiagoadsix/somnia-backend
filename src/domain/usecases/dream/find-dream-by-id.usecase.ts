import { Dream } from '@domain/entities/dream'
import { DreamNotFoundError } from '@domain/errors/dream-not-found.error'

import { DreamRepositoryContract } from '../contracts/repositories/dream.repository.contract'

export class FindDreamByIdUseCase {
	constructor(private readonly dreamRepositoryContract: DreamRepositoryContract) {
		this.dreamRepositoryContract = dreamRepositoryContract
	}

	async execute(id: string): FindDreamByIdUseCase.Output {
		const dream = await this.dreamRepositoryContract.findById(id)

		if (!dream) {
			throw new DreamNotFoundError('Dream not found.')
		}

		return dream
	}
}

export namespace FindDreamByIdUseCase {
	export type Output = Promise<Dream>
}

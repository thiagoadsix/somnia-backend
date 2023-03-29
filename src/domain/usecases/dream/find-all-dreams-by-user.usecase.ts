import { Dream } from '@domain/entities/dream'
import { DreamNotFoundError } from '@domain/errors/dream-not-found.error'

import { DreamRepositoryContract } from '../contracts/repositories/dream.repository.contract'

export class FindAllDreamsByUserUseCase {
	constructor(private readonly dreamRepositoryContract: DreamRepositoryContract) {
		this.dreamRepositoryContract = dreamRepositoryContract
	}

	async execute(userId: string): FindAllDreamsByUserUseCase.Output {
		const dream = await this.dreamRepositoryContract.findAllByUser(userId)

		if (!dream) {
			throw new DreamNotFoundError('Dream not found.')
		}

		return dream
	}
}

export namespace FindAllDreamsByUserUseCase {
	export type Output = Promise<Array<Dream>>
}

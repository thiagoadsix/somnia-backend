import { DreamNotFoundError } from '@domain/errors/dream-not-found.error'

import { DreamRepositoryContract } from '../contracts/repositories/dream.repository.contract'

export class DeleteDreamByIdUseCase {
	constructor(private readonly dreamRepositoryContract: DreamRepositoryContract) {}

	async execute(id: string): DeleteDreamByIdUseCase.Output {
		const dream = await this.dreamRepositoryContract.findById(id)

		if (!dream) {
			throw new DreamNotFoundError('Dream not found.')
		}

		await this.dreamRepositoryContract.deleteById(id)
	}
}

export namespace DeleteDreamByIdUseCase {
	export type Output = Promise<void>
}

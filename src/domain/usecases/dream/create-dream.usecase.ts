import { Dream } from '@domain/entities/dream'

import { DreamRepositoryContract } from '../contracts/repositories/dream.repository.contract'

export class CreateDreamUseCase {
	constructor(private readonly dreamRepositoryContract: DreamRepositoryContract) {
		this.dreamRepositoryContract = dreamRepositoryContract
	}

	async execute(request: CreateDreamUseCase.Input): Promise<CreateDreamUseCase.Output> {
		const { userId, title, dream, tags } = request

		const newDream = new Dream({ userId, title, dream, tags })

		await this.dreamRepositoryContract.save(newDream)

		return newDream
	}
}

export namespace CreateDreamUseCase {
	export type Input = {
		userId: string
		title: string
		dream: string
		tags: string[]
	}

	export type Output = Dream
}

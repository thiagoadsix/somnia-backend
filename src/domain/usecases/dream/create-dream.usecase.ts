import { Dream } from '@domain/entities/dream'
import { DreamRepositoryContract } from '@domain/usecases/contracts/dream.repository.contract'

export class CreateDreamUseCase {
	constructor(private readonly dreamRepositoryContract: DreamRepositoryContract) {
		this.dreamRepositoryContract = dreamRepositoryContract
	}

	async execute(request: CreateDreamUseCase.Input): Promise<CreateDreamUseCase.Output> {
		const { title, dream, tags } = request

		const newDream = new Dream({ title, dream, tags })

		await this.dreamRepositoryContract.save(newDream)

		return newDream
	}
}

export namespace CreateDreamUseCase {
	export type Input = {
		title: string
		dream: string
		tags: string[]
	}

	export type Output = Dream
}

import { IsString } from 'class-validator'

import { Dream } from '@domain/entities/dream'

export class FindAllDreamsByUserInput {
	@IsString()
	userId: string

	constructor(init?: Partial<FindAllDreamsByUserInput>) {
		Object.assign(this, init)
	}
}

export type FindAllDreamsByUserOutput = Dream[]

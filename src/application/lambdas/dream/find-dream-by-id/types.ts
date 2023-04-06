import { IsString } from 'class-validator'

import { Dream } from '@domain/entities/dream'

export class FindDreamByIdInput {
	@IsString()
	id: string

	constructor(init?: Partial<FindDreamByIdInput>) {
		Object.assign(this, init)
	}
}

export type FindDreamByIdOutput = Dream

import { IsString } from 'class-validator'

export class DeleteDreamByIdInput {
	@IsString()
	id: string

	constructor(init?: Partial<DeleteDreamByIdInput>) {
		Object.assign(this, init)
	}
}

export type DeleteDreamByIdOutput = void

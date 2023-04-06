import { IsString } from 'class-validator'

export class InterpretDreamInput {
	@IsString()
	id: string

	@IsString()
	dream: string

	@IsString()
	userId: string

	constructor(init?: Partial<InterpretDreamInput>) {
		Object.assign(this, init)
	}
}

export type InterpretDreamOutput = void

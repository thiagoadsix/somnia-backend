import { IsArray, IsString } from 'class-validator'

export class CreateDreamInput {
	@IsString()
	userId: string

	@IsString()
	title: string

	@IsString()
	dream: string

	@IsArray()
	tags: string[]

	constructor(init?: Partial<CreateDreamInput>) {
		Object.assign(this, init)
	}
}

export class CreateDreamOutput {
	id: string
	userId: string
	title: string
	dream: string
	dreamInterpreted?: string
	tags: string[]
	liked: boolean
}

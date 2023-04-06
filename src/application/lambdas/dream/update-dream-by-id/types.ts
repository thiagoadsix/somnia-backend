import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateDreamByIdInput {
	@IsString()
	@IsNotEmpty()
	id: string

	@IsString()
	@IsOptional()
	title: string

	@IsString()
	@IsOptional()
	dream: string

	@IsArray()
	@IsOptional()
	tags: string[]

	constructor(init?: Partial<UpdateDreamByIdInput>) {
		Object.assign(this, init)
	}
}

export type UpdateDreamByIdOutput = void

import { v4 as uuidV4 } from 'uuid'

export class Dream {
	readonly id: string
	readonly title: string
	readonly dream: string
	readonly dreamInterpreted?: string
	readonly tags: string[]
	readonly liked?: boolean
	readonly createdAt: string

	constructor(props: Omit<Dream, 'id' | 'createdAt'>) {
		Object.assign(this, props)
		this.id = uuidV4()
		this.createdAt = new Date().toISOString()
	}
}

import { Dream } from '@domain/entities/dream'

export interface DreamRepositoryContract {
	save(input: Dream): Promise<void>
	updateById(id: string, input: Partial<Omit<Dream, 'id' | 'userId' | 'liked' | 'createdAt'>>): Promise<void>
	deleteById(id: string): Promise<void>
	findById(id: string): Promise<Dream>
	findAllByUser(userId: string): Promise<Array<Dream>>
}

import { Dream } from '@domain/entities/dream'

export interface DreamRepositoryContract {
	save(input: Dream): Promise<void>
	update(id: string, input: Partial<Omit<Dream, 'id' | 'createdAt'>>): Promise<void>
	delete(id: string): Promise<void>
	findById(id: string): Promise<Dream>
	findAll(): Promise<Array<Dream>>
}

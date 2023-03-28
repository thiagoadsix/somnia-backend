import { Dream } from '@domain/entities/dream'

export interface OpenAIApiContract {
	interpretDream(input: Pick<Dream, 'dream'>): Promise<string>
}

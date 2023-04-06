import { Configuration, OpenAIApi } from 'openai'

import { Dream } from '@domain/entities/dream'
import { OpenAIApiContract } from '@domain/usecases/contracts/api/open-ai.api.contract'

import { InterpretationDreamError } from '@infrastructure/errors/open-ai/interpretation-dream.error'

export class OpenAI implements OpenAIApiContract {
	private readonly configuration: Configuration
	private readonly openAIApi: OpenAIApi

	constructor(private readonly organization: string, private readonly apiKey: string) {
		this.organization = organization
		this.apiKey = apiKey
		this.configuration = new Configuration({ organization: this.organization, apiKey: this.apiKey })
		this.openAIApi = new OpenAIApi(this.configuration)
	}

	async interpretDream(input: Pick<Dream, 'dream' | 'userId'>): Promise<string> {
		const prompt = `Interprete o sonho: ${input.dream}. Traga detalhes na interpretação, seja livre e criativo para interpretar cada parte do sonho. Explique parte por parte. Seja detalhista na explicação. A explicação precisar ser realizada de maneira séria.`

		try {
			const response = await this.openAIApi.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages: [{ role: 'user', content: prompt }],
				max_tokens: 1600,
				temperature: 0.2,
				stop: ['Fim da interpretação.', 'Obrigado por compartilhar seu sonho.'],
				presence_penalty: 0.5,
				frequency_penalty: 0.5,
				user: input.userId
			})

			const message = response.data.choices.shift()?.message?.content

			if (!message) {
				throw new InterpretationDreamError('Was not possible to interpret the dream')
			}

			return message
		} catch (error) {
			console.error('Error on OpenAI', JSON.stringify(error))
			throw new Error('Was not possible to interpret the dream')
		}
	}
}

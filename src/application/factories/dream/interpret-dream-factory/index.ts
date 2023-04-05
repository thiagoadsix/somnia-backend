import { InterpretDreamUseCase } from '@domain/usecases/dream/interpret-dream.usecase'

import { OpenAI } from '@infrastructure/api/open-ai'
import { DreamRepository } from '@infrastructure/repositories/dream'

const repository = new DreamRepository('Dreams')
const openAPI = new OpenAI(process.env.OPEN_AI_ORGANIZATION!, process.env.OPEN_AI_API_KEY!)
const usecase = new InterpretDreamUseCase(repository, openAPI)

export { usecase }

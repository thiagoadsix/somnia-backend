import { InterpretDreamUseCase } from '@domain/usecases/dream/interpret-dream.usecase'

import { OpenAI } from '@infrastructure/api/open-ai'
import { DreamRepository } from '@infrastructure/repositories/dream'

const repository = new DreamRepository('Dreams')
const openAPI = new OpenAI('org-WFzaEB1zxyoda90F6bklHamy', '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')
const usecase = new InterpretDreamUseCase(repository, openAPI)

export { usecase }

import { CreateDreamUseCase } from '@domain/usecases/dream/create-dream.usecase'

import { DreamRepository } from '@infrastructure/repositories/dream'

const repository = new DreamRepository('Dreams')
const usecase = new CreateDreamUseCase(repository)

export { usecase }

import { FindDreamByIdUseCase } from '@domain/usecases/dream/find-dream-by-id.usecase'

import { DreamRepository } from '@infrastructure/repositories/dream'

const repository = new DreamRepository('Dreams')
const usecase = new FindDreamByIdUseCase(repository)

export { usecase }

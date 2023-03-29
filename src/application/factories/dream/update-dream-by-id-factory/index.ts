import { UpdateDreamByIdUseCase } from '@domain/usecases/dream/update-dream-by-id.usecase'

import { DreamRepository } from '@infrastructure/repositories/dream'

const repository = new DreamRepository('Dreams')
const usecase = new UpdateDreamByIdUseCase(repository)

export { usecase }

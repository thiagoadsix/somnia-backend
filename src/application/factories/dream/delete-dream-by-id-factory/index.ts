import { DeleteDreamByIdUseCase } from '@domain/usecases/dream/delete-dream-by-id.usecase'

import { DreamRepository } from '@infrastructure/repositories/dream'

const repository = new DreamRepository('Dreams')
const usecase = new DeleteDreamByIdUseCase(repository)

export { usecase }

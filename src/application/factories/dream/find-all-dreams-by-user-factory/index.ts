import { FindAllDreamsByUserUseCase } from '@domain/usecases/dream/find-all-dreams-by-user.usecase'

import { DreamRepository } from '@infrastructure/repositories/dream'

const repository = new DreamRepository('Dreams')
const usecase = new FindAllDreamsByUserUseCase(repository)

export { usecase }

import { Patrimonio } from "./patrimonio"
import { Pessoa } from "./pessoa"

export class Posse {
    id!: number
    observacao: string = ''
    dtInicio!: Date
    dtFim?: Date
    pessoa = new Pessoa()
    patrimonio = new Patrimonio()
}

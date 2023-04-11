import { Especificacoes } from "./especificacoes"
import { Marca } from "./marca"

export class Modelo {
    id!: number
    nome: string = ''
    marca = new Marca()
}

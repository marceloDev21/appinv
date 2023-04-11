import { Marca } from "./marca"
import { Modelo } from "./modelo"

export class Especificacoes {
    id!: number
    serie: string = ''
    descricoes: string = ''
    marca = new Marca()
    modelo = new Modelo()
}

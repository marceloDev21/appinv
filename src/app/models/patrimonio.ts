import { Departamento } from "./departamento"
import { Especificacoes } from "./especificacoes"
import { Modelo } from "./modelo"
import { Pessoa } from "./pessoa"
import { Posse } from "./posse"
import { Propriedade } from "./propriedade"
import { Tipo } from "./tipo"

export class Patrimonio {
    id!: number
    nome: string = ''
    situacao: string = 'EM_USO' //EM_USO/ DISPONÍVEL/DANIFICADO/
    observacao: string = ''
    codigo?: number
    valor?: number
    dt_entrega?: Date
    responsavel = new Pessoa()
    departamento = new Departamento()
    modelo? = new Modelo()
    especificacoes = new Especificacoes()
    tipo? = new Tipo()
    propriedade? = new Propriedade()
    posse = new Array<Posse>()
}

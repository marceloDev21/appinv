import { Fornecedor } from "./fornecedor"

export class Propriedade {
    id!: number
    tipo: string= ''
    fornecedor = new Fornecedor()
}

import { Cliente } from "./model/cliente";
import { Operacao } from "./operacao.enum";

export class Extrato {
    constructor(
        public operacao: Operacao = Operacao.DEPOSITO,
        public data: Date = new Date(),
        public valor: number = 0
    ){}
}

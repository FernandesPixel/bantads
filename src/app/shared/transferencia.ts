import { Extrato } from "./extrato";
import { Cliente } from "./model/cliente";
import { Operacao } from "./operacao.enum";

export class Transferencia {
    constructor(
        public clientePagador: Cliente = new Cliente(),
        public clienteRecebedor: Cliente = new Cliente(),
        public operacao: Operacao = Operacao.DEPOSITO,
        public data: Date = new Date(),
        public valor: number = 0
    ){}
}

import { Injectable } from '@angular/core';

interface Cliente {
  nome: string;
  idade: number;
  email: string;
  numeroConta: string;
  saldo: number;
  transacoes: Transacao[];
}

interface Transacao {
  tipo: 'debito' | 'credito';
  valor: number;
  data: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BancoService {
  private clientes: Cliente[] = [];
  private numeroContaCounter = 1000; // Para gerar números de conta automaticamente

  cadastrarCliente(nome: string, idade: number, email: string) {
    const novoCliente: Cliente = {
      nome,
      idade,
      email,
      numeroConta: (this.numeroContaCounter++).toString(),
      saldo: 0,
      transacoes: [],
    };
    this.clientes.push(novoCliente);
    return novoCliente;
  }

  realizarTransacao(
    numeroConta: string,
    tipo: 'debito' | 'credito',
    valor: number
  ) {
    const cliente = this.clientes.find((c) => c.numeroConta === numeroConta);
    if (cliente) {
      if (tipo === 'debito' && cliente.saldo >= valor) {
        cliente.saldo -= valor;
      } else if (tipo === 'credito') {
        cliente.saldo += valor;
      }
      const novaTransacao: Transacao = { tipo, valor, data: new Date() };
      cliente.transacoes.push(novaTransacao);
      return cliente;
    }
    return null;
  }

  getExtrato(numeroConta: string) {
    const cliente = this.clientes.find((c) => c.numeroConta === numeroConta);
    return cliente ? cliente : null;
  }
}

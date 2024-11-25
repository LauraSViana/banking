import { Component } from '@angular/core';

import { BancoService } from '../services/Banco.service';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: false,
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.css',
})
export class CadastroClientesComponent {
  nome: string = '';
  idade: number = 0;
  email: string = '';
  clienteCadastrado: any;

  constructor(private bancoService: BancoService) {}

  cadastrar() {
    this.clienteCadastrado = this.bancoService.cadastrarCliente(
      this.nome,
      this.idade,
      this.email
    );
    this.nome = '';
    this.idade = 0;
    this.email = '';
  }
}

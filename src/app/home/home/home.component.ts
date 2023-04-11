// import { KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DepartamentoService } from 'src/app/departamento/departamento.service';
import { Departamento } from 'src/app/models/departamento';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  departamentos = new Array<Departamento>()
  departamento = new Departamento
  departamentosLazyLoad = new Array<Departamento>()

  loading: boolean = false

  usuario = ''
  logado = false

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private messageService: MessageService,
    // private keycloakService: KeycloakService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getDepartamentos()
  }

  // Recebe itens da tabela Locais
  getDepartamentos() {
    this.departamentoService.listar().subscribe(
      (response) => {
        this.departamentos = [...response]
        this.departamentosLazyLoad = [...response]
      }, erro => {
        if (erro.status == 404) {
          this.messageService.add({ key: 'bc', severity: 'error', summary: 'Erro 404', detail: 'Não encontramos a página.' });
        } else if (erro.status == 500) {
          this.messageService.add({ key: 'bc', severity: 'error', summary: 'Erro 500', detail: 'Houve um erro ao carregar as informações.' });
        } else if (erro != null) {
          this.messageService.add({ key: 'bc', severity: 'error', summary: 'Erro desconhecido', detail: 'Estamos enfrentado alguns erros no sistema. Tente novamente mais tarde.' });
        }
      })
  }

  paraLocalItens(departamento: Departamento) {
    const ambiente = departamento
    this.router.navigateByUrl('/patrimonios/departamento/' + ambiente.id)
  }
  // Define um tempo de recarga até receber as informações do back
  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.departamentos) {
        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.departamentos = [...this.departamentosLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.loading = false;
      }
    }, 1000);
  }
  
  lectionChange(value = []) {
    this.departamentos = [...value];
  }


}

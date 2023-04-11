import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { KeycloakService } from 'keycloak-angular';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuario = '';
  logado = false;

  exibirNav = false;
  exibirInventario = false;

  items!: MenuItem[];
  itemMenu!: MenuItem[];

  constructor(
    private router: Router,
    // private keycloakService: KeycloakService
  ) { }

  ngOnInit() {
    this.getItensMenu()
    // this.initializeUserOptions()
    // if (this.keycloakService.getKeycloakInstance().authenticated == true) {
    //   this.statusLogado();
    // }
    // console.log(this.keycloakService.getKeycloakInstance())
  }

  private initializeUserOptions(): void {
    // const nome = this.keycloakService.getKeycloakInstance().profile?.firstName
    // const sobrenome = this.keycloakService.getKeycloakInstance().profile?.lastName
    // const nomeCompleto = `${nome} ${sobrenome}`;
    // this.usuario = nomeCompleto
  }

  statusLogado() {
    this.logado = true
  }

  getItensMenu() {
    this.itemMenu = [
      // {
      //   label: this.keycloakService.getKeycloakInstance().profile?.firstName,
      //   icon: 'pi pi-fw pi-user',
      //   command: () => this.exibirNav = false
      // },
      {
        label: 'Adicionar um novo Item',
        icon: 'pi pi-fw pi-plus',
        routerLink: '/patrimonios/novo',
            command: () => this.exibirNavegador()
      },
      {
        label: 'Ler Qr-Code',
        icon: 'pi pi-fw pi-qrcode',
        command: () => this.leitor(),
      },
      {
        label: 'Inventário',
        // visible: this.exibirInventario,
        items: [
          {
            label: 'Departamentos',
            icon: 'pi pi-fw pi-tags',
            routerLink: '/departamentos',
            command: () => this.exibirNavegador()
          },
          {
            label: 'Responsaveis',
            icon: 'pi pi-fw pi-users',
            routerLink: '/responsaveis',
            command: () => this.exibirNavegador()
          },
          {
            label: 'Ver Posses',
            icon: 'pi pi-fw pi-id-card',
            routerLink: '/posses',
            command: () => this.exibirNavegador()
          },
          {
            label: 'Tipo de patrimonio',
            icon: 'pi pi-fw pi-box',
            routerLink: '/tipos',
            command: () => this.exibirNavegador()
          },
          {
            label: 'Todos os itens',
            icon: 'pi pi-fw pi-th-large',
            routerLink: '/patrimonios',
            command: () => this.exibirNavegador()
          }
        ]
      },
      {
        label: 'Equipamentos',
        // visible: this.exibirInventario,
        items: [
          {
            label: 'Marcas',
            icon: 'pi pi-fw pi-arrow-down-right',
            routerLink: '/marcas',
            command: () => this.exibirNavegador()
          },
          {
            label: 'Modelos',
            icon: 'pi pi-fw pi-arrow-down-right',
            routerLink: '/modelos',
            command: () => this.exibirNavegador()
          },
          {
            label: 'Todos os Equipamentos',
            icon: 'pi pi-fw pi-desktop',
            routerLink: '/equipamentos',
            command: () => this.exibirNavegador()
          },
        ]
      },
      {
        label: 'Propriedades',
        // visible: this.exibirInventario,
        items: [
          {
            label: 'Tipos de propriedades',
            icon: 'pi pi-fw pi-briefcase',
            routerLink: '/propriedades',
            command: () => this.exibirNavegador()
          },
          {
            label: 'Todos os fornecedores',
            icon: 'pi pi-fw pi-truck',
            routerLink: '/fornecedores',
            command: () => this.exibirNavegador()
          },
        ]
      },
      {
        label: 'Sair',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.logout(),
      },
    ];
  }

  exibirNavegador(){
    this.exibirNav = false
    setTimeout(() => {
      window.location.reload()
    }, 10);
    
  }

  logout() {
    this.exibirNav = false
    this.logado = false;
    // this.keycloakService.logout() 
    this.router.navigate(['/wait'])
  }

  leitor() {
    this.exibirNav = false
    this.router.navigate(['/leitor'])
  }

}

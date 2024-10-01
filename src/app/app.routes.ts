import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CartComponent } from './pages/cart/cart.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CupCakesListComponent } from './pages/cup-cakes-list/cup-cakes-list.component';
import { CupCakesReportComponent } from './pages/cup-cakes-report/cup-cakes-report.component';
import { CupCakeCreateComponent } from './pages/cup-cake-create/cup-cake-create.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoggedComponent } from './pages/logged/logged.component';
import { MeusPedidosComponent } from './pages/logged/meus-pedidos/meus-pedidos.component';
import { MeusEnderecosComponent } from './pages/logged/meus-enderecos/meus-enderecos.component';
import { MeusDadosComponent } from './pages/logged/meus-dados/meus-dados.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
  },
  {
    path: 'admin/cupcakes',
    component: CupCakesListComponent
  },
  {
    path: 'admin/cupcakes/relatorio',
    component: CupCakesReportComponent
  },
  {
    path: 'admin/cupcakes/novo',
    component: CupCakeCreateComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'logged',
    component: LoggedComponent,
  },
  // {
  //   path: 'logged',
  //   component: LoggedComponent,
  //   children: [
  //     { path: 'pedidos', component: MeusPedidosComponent },
  //     { path: 'enderecos', component: MeusEnderecosComponent },
  //     { path: 'dados', component: MeusDadosComponent }
  //   ]
  // },
  {
    path: 'pedidos',
    component: MeusPedidosComponent
  },
  {
    path: 'enderecos',
    component: MeusEnderecosComponent
  },
  {
    path: 'dados',
    component: MeusDadosComponent
  }
];

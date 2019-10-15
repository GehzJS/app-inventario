import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputsComponent } from './inputs/inputs.component';
import { ProductsComponent } from './products/products.component';
import { ProvidersComponent } from './providers/providers.component';
import { OutputsComponent } from './outputs/outputs.component';
import { UsersComponent } from './users/users.component';
import { InputComponent } from './inputs/input.component';
import { ProductComponent } from './products/product.component';
import { ProviderComponent } from './providers/provider.component';
import { OutputComponent } from './outputs/output.component';
import { UserComponent } from './users/user.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RoleGuard } from 'src/app/guards/role.guard';
import { InputPrintComponent } from './inputs/print.component';
import { OutputPrintComponent } from './outputs/print.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { path: 'inputs', component: InputsComponent, canActivate: [AuthGuard] },
  {
    path: 'inputs/print/:id',
    component: InputPrintComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inputs/:id',
    component: InputComponent,
    canActivate: [AuthGuard]
  },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  {
    path: 'products/:id',
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'providers',
    component: ProvidersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'providers/:id',
    component: ProviderComponent,
    canActivate: [AuthGuard]
  },
  { path: 'outputs', component: OutputsComponent, canActivate: [AuthGuard] },
  {
    path: 'outputs/:id',
    component: OutputComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'outputs/print/:id',
    component: OutputPrintComponent,
    canActivate: [AuthGuard]
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'users/:id',
    component: UserComponent,
    canActivate: [AuthGuard, RoleGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}

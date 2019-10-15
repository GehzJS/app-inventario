import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { InputsComponent } from './inputs/inputs.component';
import { ProductsComponent } from './products/products.component';
import { ProvidersComponent } from './providers/providers.component';
import { OutputsComponent } from './outputs/outputs.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './inputs/input.component';
import { ProductComponent } from './products/product.component';
import { ProviderComponent } from './providers/provider.component';
import { OutputComponent } from './outputs/output.component';
import { UserComponent } from './users/user.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { LoginComponent } from './login/login.component';
import { InputPrintComponent } from './inputs/print.component';
import { OutputPrintComponent } from './outputs/print.component';

import { NgxPrintModule } from 'ngx-print';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export let options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    InputsComponent,
    ProductsComponent,
    ProvidersComponent,
    OutputsComponent,
    UsersComponent,
    HomeComponent,
    InputComponent,
    ProductComponent,
    ProviderComponent,
    OutputComponent,
    UserComponent,
    TableComponent,
    PaginationComponent,
    SearchComponent,
    LoginComponent,
    InputPrintComponent,
    OutputPrintComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    NgxMaskModule.forRoot(options)
  ],
  exports: [
    InputsComponent,
    ProductsComponent,
    ProvidersComponent,
    OutputsComponent,
    UsersComponent,
    InputComponent,
    ProductComponent,
    ProviderComponent,
    OutputComponent,
    UserComponent,
    InputPrintComponent,
    OutputPrintComponent
  ]
})
export class PagesModule {}

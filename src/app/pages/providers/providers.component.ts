import { Component, OnInit } from '@angular/core';
import { providerTitles } from 'src/app/config/table.config';
import { AuthService } from 'src/app/services/auth.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ProviderService } from 'src/app/services/provider.service';
import { ModalService } from 'src/app/services/modal.service';
import { ProviderModel } from 'src/app/models/provider.model';
import { providersURL } from 'src/app/config/endpoints.configuration';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: []
})
export class ProvidersComponent implements OnInit {
  public tableTitles: string[] = providerTitles;
  public providers: ProviderModel[];

  constructor(
    public _auth: AuthService,
    private _pagination: PaginationService,
    private _provider: ProviderService,
    private _modal: ModalService
  ) {}

  ngOnInit() {
    this._pagination.resetPagination();
    this.loadProviders();
  }

  public loadProviders: any = (): void => {
    this._provider
      .loadProviders()
      .subscribe((response: ProviderModel[]) => (this.providers = response));
  };

  public searchProviders: any = (word: string): void => {
    this._provider
      .searchProvider(word)
      .subscribe((response: ProviderModel[]) => (this.providers = response));
  };

  public openModal(id: number): void {
    this._modal.deleteModal().then((response: boolean) => {
      if (response) {
        this.deleteProvider(id);
      }
    });
  }

  private deleteProvider(id: number) {
    this._provider.deleteProvider(id).subscribe(
      (response: ProviderModel) => {
        this.loadProviders();
        this._modal.successModal(
          2,
          `El producto ${response.name}`,
          `/${providersURL}`
        );
      },
      () => this._modal.errorModal(2)
    );
  }
}

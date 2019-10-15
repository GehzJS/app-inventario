import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styles: []
})
export class ConfigurationComponent implements OnInit {
  private key: string = '';
  public apiURL: string;
  public clientId: string;
  public clientSecret: string;
  public valid: boolean = false;

  constructor(private _pagination: PaginationService) {}

  ngOnInit() {
    const url = localStorage.getItem('apiURL');
    const id = localStorage.getItem('clientId');
    const secret = localStorage.getItem('clientSecret');
    if (url !== null) this.apiURL = url;
    if (id !== null) this.clientId = id;
    if (secret !== null) this.clientSecret = secret;
  }

  public setKey(key: string): void {
    this.key = key;
  }

  public setApiUrl(url: string): void {
    this.apiURL = url;
  }

  public setClientId(id: number): void {
    this.clientId = id.toString();
  }

  public setClientSecret(secret: string): void {
    this.clientSecret = secret;
  }

  public saveApiUrl(): void {
    if (this.apiURL) {
      localStorage.setItem('apiURL', this.apiURL);
    }
  }

  public saveClientId(): void {
    if (this.clientId) {
      localStorage.setItem('clientId', this.clientId);
    }
  }

  public saveClientSecret(): void {
    if (this.clientSecret) {
      localStorage.setItem('clientSecret', this.clientSecret);
    }
  }

  public isValid(): void {
    this.key === 'devsOnly' ? (this.valid = true) : (this.valid = false);
  }

  public hideConfig(): void {
    this._pagination.changeRouterVisibility(true);
    this._pagination.changeSidebarVisibility(true);
  }
  public hideConfigWithReload(): void {
    this.hideConfig();
    window.location.reload();
  }
}

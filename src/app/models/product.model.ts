import { ProviderModel } from './provider.model';

export class ProductModel {
  public id: number;
  public name: string;
  public barcode: string;
  public price: number;
  public stock: number;
  public provider: ProviderModel;
  public provider_id?: number;
}

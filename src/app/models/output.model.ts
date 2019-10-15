import { ProductModel } from './product.model';

export class OutputModel {
  public id: number;
  public state: boolean;
  public operator: string;
  public quantity: number;
  public product: ProductModel;
  public product_id?: number;
}

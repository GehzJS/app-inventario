import { UserModel } from './user.model';
import { ProductModel } from './product.model';

export class InputModel {
  public id: number;
  public total: number;
  public state: boolean;
  public quantity: number;
  public product: ProductModel;
  public user: UserModel;
  public product_id?: number;
  public user_id: number;
}

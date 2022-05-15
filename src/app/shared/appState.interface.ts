import { CartState, ProductsState } from "../home/reducers/home.reducers";
import { UserState } from "../login/reducers/login.reducers";

export interface AppState {
  home: {
    home: ProductsState,
    cart: CartState
  },
  user: UserState
}
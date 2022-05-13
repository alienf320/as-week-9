import { createAction, props } from "@ngrx/store";
import { Product } from "../interfaces/Product";


export const getProducts = createAction(
  "[From Home Init] Call to get Products",
);

export const productsReceived = createAction(
  "[From Server Products] Products received",
  props<{products: Product[]}>()
)

// export const loginResponseError = createAction(
//   "[From Login Form] Login Error",
//   // props<{user: UserResponse}>()
// )
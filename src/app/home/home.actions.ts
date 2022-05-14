import { createAction, props } from "@ngrx/store";
import { Product } from "../interfaces/Product";


export const getProducts = createAction(
  "[From Home Init] Call to get Products",
);

export const productsReceived = createAction(
  "[From Server Products] Products received",
  props<{products: Product[]}>()
)

export const productsFailed = createAction(
  "[From Server Products] Error in request",
  // props<{products: Product[]}>()
)

export const like = createAction(
  "[From Products] Give Like",
  props<{id: string, action: string}>()
)

export const dislike = createAction(
  "[From Products] Give Disike",
  props<{id: string, action: string}>()
)

export const likeFailed = createAction(
  "[From Products] Give Like Failed",
  props<{id: string, action: string}>()
)

export const categories = createAction(
  "[From Home] Get categories"
)
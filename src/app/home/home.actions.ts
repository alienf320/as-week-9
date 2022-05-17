import { createAction, props } from "@ngrx/store";
import { Product } from "../interfaces/Product";
import { Cart, CartResponse } from "../interfaces/cartResponse";
import { create } from "lodash";


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
  "[From Products] Give Dislike",
  props<{id: string, action: string}>()
)

export const likeResponse = createAction(
  "[From Server] Update Likes from Response",
  props<{productId: number, kind: 0|1}>()
)

export const likeFailed = createAction(
  "[From Products] Give Like Failed",
  props<{id: string, action: string}>()
)

export const categories = createAction(
  "[From Home] Get categories"
)

export const getAllCartProducts = createAction(
  "[From Cart] Get All Products"
)

export const buyItem = createAction(
  "[From Products] Buy Product",
  props<{product: Product}>()
)

export const errorBuyingItem = createAction(
  "[From Server] Error trying to add a product",
  props<{error: any}>()
)

export const cartReceived = createAction(
  "[From Server] Cart Received",
  props<{cart: Cart}>()
)

export const sendItemChange = createAction(
  "[From Cart] Increase Item",
  props<{id: number, quantity: number, action: string, cartItemVariant: any}>()
)
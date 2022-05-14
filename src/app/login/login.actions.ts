import { createAction, props } from "@ngrx/store";
import { UserResponse } from "../interfaces/UserResponse";


export const login = createAction(
  "[From Login Form] Call login",
  props<{email: string, password: string}>()
);

export const loginResponse = createAction(
  "[From Login Form] Response of login",
  props<{user: {token: string, user: UserResponse}}>()
)

export const loginResponseError = createAction(
  "[From Login Form] Login Error",
  // props<{user: UserResponse}>()
)

export const logout = createAction(
  "[From Login] Call logout",
  // props<{user: UserResponse}>()
)
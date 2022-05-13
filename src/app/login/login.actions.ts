import { createAction, props } from "@ngrx/store";
import { UserResponse } from "../interfaces/UserResponse";


export const login = createAction(
  "[From Login Form] Call login",
);

export const loginResponse = createAction(
  "[From Login Form] Response of login",
  props<{user: UserResponse}>()
)
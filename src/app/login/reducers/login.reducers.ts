import { createReducer, on } from "@ngrx/store"
import { LoginActions } from "../login-types"

export interface UserState {
  user: any
}

export const initialAuthState: UserState = {user: { }}

export const loginReducer = createReducer(
  initialAuthState,
  on(LoginActions.loginResponse,
    (state, {user}) => { 
      return {...state, 'user': user.user} 
    }
  ),
  on(LoginActions.logout,
    (state) => {
      return {...state, 'user': {}}
    })
)
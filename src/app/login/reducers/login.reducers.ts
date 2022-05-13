import { createReducer, on } from "@ngrx/store"
import { UserResponse } from "src/app/interfaces/UserResponse"
import { LoginActions } from "../login-types"

export interface UserState {
  user: UserResponse
}

export const initialAuthState: UserState = {user: { }}



// export const loginReducer = createReducer(
//   initialAuthState,
//   on(LoginActions.login, 
//     (state, action) => {
//     return {
//       id: state.id,
//       username: action.username,
//       email: action.email
//     }
//   })
// ) 

export const loginReducer = createReducer(
  initialAuthState,
  on(LoginActions.loginResponse,
    (state, {user}) => { 
      console.log(state, user)
      return {...state, 'user': user} 
    }
  )
)
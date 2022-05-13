import { UserResponse } from "./UserResponse";

export interface ServerResponseI {
  token: string;
  user: UserResponse
  // {
  //   id: number;
  //   email: string;
  //   name: string;
  // }
}
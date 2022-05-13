import { UserResponse } from "./UserResponse";

export interface ServerResponseI {
  data: {
    token: string,
    user: UserResponse
  }
  // {
  //   id: number;
  //   email: string;
  //   name: string;
  // }
}
/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Owner = "Owner",
}

export interface AllVideoInput {
  page?: number | null;
}

export interface CreateAccountInput {
  userName: string;
  firstName: string;
  email: string;
  password: string;
  role?: UserRole | null;
}

export interface LoginInput {
  userName: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

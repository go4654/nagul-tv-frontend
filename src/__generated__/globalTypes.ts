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

export interface CreateCommentInput {
  comment: string;
  videoId: number;
}

export interface CreateVideoInput {
  video: string;
  coverImg?: string | null;
  videoName: string;
  videoDesc: string;
}

export interface DeleteVideoInput {
  videoId: number;
}

export interface EditProfileInput {
  firstName?: string | null;
  email?: string | null;
  password?: string | null;
  avatar?: string | null;
}

export interface LoginInput {
  userName: string;
  password: string;
}

export interface VideoDetailInput {
  videoId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================

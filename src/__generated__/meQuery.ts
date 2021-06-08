/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me_comments {
  __typename: "Comment";
  id: number;
  createdAt: any;
  updatedAt: any;
  comment: string;
}

export interface meQuery_me {
  __typename: "User";
  id: number;
  userName: string;
  firstName: string;
  email: string;
  avatar: string | null;
  role: UserRole | null;
  comments: meQuery_me_comments[];
}

export interface meQuery {
  me: meQuery_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SeeCommentInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: seeComment
// ====================================================

export interface seeComment_seeComment_comment {
  __typename: "Comment";
  id: number;
  createdAt: any;
  updatedAt: any;
  comment: string;
}

export interface seeComment_seeComment {
  __typename: "SeeCommentOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  comment: seeComment_seeComment_comment[] | null;
}

export interface seeComment {
  seeComment: seeComment_seeComment;
}

export interface seeCommentVariables {
  input: SeeCommentInput;
}

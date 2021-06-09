/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCommentInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editComment
// ====================================================

export interface editComment_editComment {
  __typename: "EditCommentOutput";
  ok: boolean;
  error: string | null;
}

export interface editComment {
  editComment: editComment_editComment;
}

export interface editCommentVariables {
  input: EditCommentInput;
}

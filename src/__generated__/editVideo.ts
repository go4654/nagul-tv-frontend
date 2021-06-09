/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditVideoInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editVideo
// ====================================================

export interface editVideo_editVideo {
  __typename: "EditVideoOutput";
  ok: boolean;
  error: string | null;
}

export interface editVideo {
  editVideo: editVideo_editVideo;
}

export interface editVideoVariables {
  input: EditVideoInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteVideoInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteVideo
// ====================================================

export interface deleteVideo_deleteVideo {
  __typename: "DeleteVideoOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteVideo {
  deleteVideo: deleteVideo_deleteVideo;
}

export interface deleteVideoVariables {
  input: DeleteVideoInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllVideoInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: allVideo
// ====================================================

export interface allVideo_allVideo_videos {
  __typename: "Video";
  id: number;
  video: string;
  coverImg: string | null;
  videoName: string;
  videoDesc: string;
}

export interface allVideo_allVideo {
  __typename: "AllVideoOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  videos: allVideo_allVideo_videos[] | null;
}

export interface allVideo {
  allVideo: allVideo_allVideo;
}

export interface allVideoVariables {
  input: AllVideoInput;
}

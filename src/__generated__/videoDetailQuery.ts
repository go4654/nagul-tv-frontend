/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VideoDetailInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: videoDetailQuery
// ====================================================

export interface videoDetailQuery_videoDetail_video {
  __typename: "Video";
  video: string;
  coverImg: string | null;
  videoName: string;
  videoDesc: string;
}

export interface videoDetailQuery_videoDetail {
  __typename: "VideoDetailOutput";
  ok: boolean;
  error: string | null;
  video: videoDetailQuery_videoDetail_video | null;
}

export interface videoDetailQuery {
  videoDetail: videoDetailQuery_videoDetail;
}

export interface videoDetailQueryVariables {
  input: VideoDetailInput;
}

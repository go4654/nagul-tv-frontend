/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VideoDetailInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: videoDetail
// ====================================================

export interface videoDetail_videoDetail_video_comments_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface videoDetail_videoDetail_video_comments {
  __typename: "Comment";
  createdAt: any;
  updatedAt: any;
  comment: string;
  user: videoDetail_videoDetail_video_comments_user;
}

export interface videoDetail_videoDetail_video {
  __typename: "Video";
  video: string;
  videoName: string;
  videoDesc: string;
  comments: videoDetail_videoDetail_video_comments[] | null;
}

export interface videoDetail_videoDetail {
  __typename: "VideoDetailOutput";
  ok: boolean;
  error: string | null;
  video: videoDetail_videoDetail_video | null;
}

export interface videoDetail {
  videoDetail: videoDetail_videoDetail;
}

export interface videoDetailVariables {
  input: VideoDetailInput;
}

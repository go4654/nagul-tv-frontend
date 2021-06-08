/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editProfileAvatar
// ====================================================

export interface editProfileAvatar_editProfile {
  __typename: "EditProfileOutput";
  ok: boolean;
  error: string | null;
}

export interface editProfileAvatar {
  editProfile: editProfileAvatar_editProfile;
}

export interface editProfileAvatarVariables {
  input: EditProfileInput;
}

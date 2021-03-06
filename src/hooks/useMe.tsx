import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { meQuery } from "../__generated__/meQuery";

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      userName
      firstName
      email
      avatar
      role
      comments {
        id
        createdAt
        updatedAt
        comment
      }
    }
  }
`;

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
};

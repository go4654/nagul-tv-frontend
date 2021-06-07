import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = " TOKEN";

const token = localStorage.getItem(TOKEN);
console.log(token);

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const userLoggedIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const userLoggedOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": localStorage.getItem(TOKEN) || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedInVar: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return localStorage.getItem(TOKEN);
            },
          },
        },
      },
    },
  }),
});

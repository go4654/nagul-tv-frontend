import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = " TOKEN";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const userLoggedIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  window.location.reload();
};

export const userLoggedOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedInVar: {
            read() {
              return isLoggedInVar();
            },
          },
        },
      },
    },
  }),
});

import { InMemoryCache, ApolloClient } from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
})

export default client

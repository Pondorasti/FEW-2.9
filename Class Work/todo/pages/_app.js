import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client"
import client from "../lib/client"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp

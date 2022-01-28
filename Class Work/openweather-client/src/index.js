import React from "react"
import ReactDOM from "react-dom"
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client"
import App from "./components/App"

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

import { gql, ApolloServer } from "apollo-server-micro"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

const typeDefs = gql`
  type Todo {
    id: ID!
    name: String!
    date: String!
    completed: String!
  }

  type Query {
    getAllTodos: [Todo!]!
    getTodo(id: ID!): Todo
    # getCompletedTodo
  }
`

const resolvers = {
  Query: {
    getAllTodos: () => {
      return [{ id: "1", name: "hello", date: "Today", completed: false }]
    },
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

const startServer = apolloServer.start()

export default async function handler(req, res) {
  await startServer
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}

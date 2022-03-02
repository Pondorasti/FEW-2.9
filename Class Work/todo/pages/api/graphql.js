import { gql, ApolloServer } from "apollo-server-micro"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

const typeDefs = gql`
  type Todo {
    id: ID!
    name: String!
    completed: String!
  }

  type Query {
    getAllTodos: [Todo!]!
    getTodo(id: ID!): Todo
    # getCompletedTodos: [Todo!]!
  }

  type Mutation {
    addTodo(name: String!): Todo!
  }
`

let todos = []

const resolvers = {
  Query: {
    getAllTodos: () => {
      return todos
    },
  },
  Mutation: {
    addTodo: (_, { name }) => {
      const newTodo = { id: Math.floor(Math.random() * 10000), name, completed: false }
      todos.push(newTodo)
      return newTodo
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

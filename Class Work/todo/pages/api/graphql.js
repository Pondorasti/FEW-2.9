import { gql, ApolloServer } from "apollo-server-micro"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

const typeDefs = gql`
  type Todo {
    id: ID!
    name: String!
    completed: Boolean!
    date: String!
  }

  type Query {
    getAllTodos: [Todo!]!
    getTodo(id: ID!): Todo
    getCompletedTodos: [Todo!]!
  }

  type Mutation {
    addTodo(name: String!): Todo!
    updateTodo(id: ID!, completed: Boolean): Todo
  }
`

let todos = []

const resolvers = {
  Query: {
    getAllTodos: () => {
      return todos.sort((a, b) => b.date - a.date)
    },
    getTodo: (_, { id }) => {
      return todos.find((value) => value.id == id)
    },
    getCompletedTodos: () => {
      return todos.filter((value) => value.completed)
    },
  },
  Mutation: {
    addTodo: (_, { name }) => {
      const newTodo = {
        id: Math.floor(Math.random() * 10000),
        name,
        completed: false,
        date: new Date(),
      }
      todos.push(newTodo)
      return newTodo
    },
    updateTodo: (_, { id, completed }) => {
      const todo = todos.find((value) => value.id == id)
      if (!todo) return null

      todo.completed = completed
      return todo
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

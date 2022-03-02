import Head from "next/head"
import { gql, useQuery } from "@apollo/client"

const getAllTodos = gql`
  query {
    getAllTodos {
      id
      name
    }
  }
`

export default function Home() {
  const { loading, error, data } = useQuery(getAllTodos)

  console.log(data?.getAllTodos)
  return (
    <div>
      <Head>
        <title>Todo</title>
      </Head>

      <main>{loading ? "Loading" : "helo"}</main>
    </div>
  )
}

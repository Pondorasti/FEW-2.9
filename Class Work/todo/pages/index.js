import Head from "next/head"
import { gql, useQuery } from "@apollo/client"
import { Button } from "@nextui-org/react"

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
      <Button>Click me</Button>
      <main>
        {loading ? "Loading" : "helo"}
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </div>
  )
}

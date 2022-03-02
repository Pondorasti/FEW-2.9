import Head from "next/head"
import { gql, useQuery } from "@apollo/client"
import { Button, Input, Checkbox } from "@nextui-org/react"

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
    <div className="bg-neutral-100">
      <Head>
        <title>GraphDo</title>
      </Head>
      <main className="flex flex-col max-w-md mx-auto mt-8 space-y-1">
        {/* {loading ? "Loading" : "helo"} */}
        <h1 className="text-3xl font-bold tracking-tighter mb-4">GraphDo</h1>
        <div className="flex space-x-4 !mb-4">
          <Input clearable bordered placeholder="Add new todo" fullWidth color="primary" />
          <Button
            auto
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            }
          />
        </div>
        <Checkbox color="primary" line>
          Hello
        </Checkbox>
        <Checkbox color="primary" line>
          Hello
        </Checkbox>
        <Checkbox color="primary" line>
          Hello
        </Checkbox>
      </main>
    </div>
  )
}

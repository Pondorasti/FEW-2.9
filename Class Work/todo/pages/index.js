import { useRef } from "react"
import Head from "next/head"
import { gql, useQuery, useMutation } from "@apollo/client"
import { Button, Input, Checkbox, Loading, Text } from "@nextui-org/react"

const getAllTodos = gql`
  query {
    getAllTodos {
      id
      name
      completed
    }
  }
`

const addTodoMutation = gql`
  mutation AddTodo($name: String!) {
    addTodo(name: $name) {
      id
      name
      completed
    }
  }
`

const updateTodoMutation = gql`
  mutation UpdateTodo($id: ID!, $completed: Boolean!) {
    updateTodo(id: $id, completed: $completed) {
      name
      completed
      id
    }
  }
`

export default function Home() {
  const textInput = useRef(null)
  const { loading, error, data } = useQuery(getAllTodos)
  const [addTodo, { _0, addLoading, addError }] = useMutation(addTodoMutation, {
    refetchQueries: [getAllTodos],
  })
  const [updateTodo, { _1, updateLoading, updateError }] = useMutation(updateTodoMutation, {
    refetchQueries: [getAllTodos],
  })

  return (
    <div className="bg-neutral-100">
      <Head>
        <title>GraphDo</title>
      </Head>
      <main className="flex flex-col max-w-md mx-auto mt-8 space-y-1">
        <Text h1 className="w-full text-left mb-4 font-sans">
          GraphDo
        </Text>
        <form
          className="flex space-x-4 !mb-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (textInput.current.value !== "") {
              addTodo({ variables: { name: textInput.current.value } })
            }
            textInput.current.value = ""
          }}
        >
          <Input
            clearable
            bordered
            placeholder="Add new todo"
            fullWidth
            color="primary"
            ref={textInput}
          />
          <Button
            auto
            disabled={addLoading}
            icon={
              !addLoading ? (
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
              ) : (
                <Loading />
              )
            }
          />
        </form>

        {error && <Text color="error">{error}</Text>}
        {addError && <Text color="error">{addError}</Text>}
        {updateError && <Text color="error">{updateError}</Text>}

        {loading ? (
          <Loading />
        ) : (
          data.getAllTodos.map((item) => (
            <Checkbox
              key={item.id}
              color="primary"
              line
              className="font-sans"
              checked={item.completed}
              onChange={() => {
                updateTodo({ variables: { id: item.id, completed: !item.completed } })
              }}
            >
              {item.name}
            </Checkbox>
          ))
        )}
      </main>
    </div>
  )
}

const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")

const schema = buildSchema(`
type About {
  message: String!
}

enum Language {
  javascript
  css
  go
}

type Framework {
  name: String!
  language: Language!
  downloads: Int!
}

type DiceRoll {
  total: Int!
  sides: Int!
  rolls: [Int!]!
}

type Query {
  getAbout: About
  
  allFrameworks: [Framework!]!
  getFramework(index: Int!): Framework
  firstFramework: Framework
  lastFramework: Framework
  frameworksLength: Int!
  frameworksInRange(start: Int!, count: Int!): [Framework]!
  getFrameworkByLanguage(language: Language!): [Framework!]!
  allLanguages: [Language!]!

  getRoll(sides: Int!, rolls: Int!): DiceRoll!
}
`)

const frameworks = [
  { name: "Next.js", language: "javascript", downloads: 456789765 },
  { name: "Tailwind CSS", language: "css", downloads: 75767 },
  { name: "Tailwind CSS", language: "css", downloads: 75767 },
  { name: "rand", language: "go", downloads: 1276 },
]

const root = {
  getAbout: () => {
    return { message: "Hello Lissa!" }
  },
  allFrameworks: () => frameworks,
  getFramework: ({ index }) => frameworks[index],
  firstFramework: () => frameworks[0],
  lastFramework: () => frameworks[frameworks.length - 1],
  frameworksLength: () => frameworks.length,
  frameworksInRange: ({ start, count }) => frameworks.slice(start, count),
  getFrameworkByLanguage: ({ language }) =>
    frameworks.filter((framework) => framework.language === language),
  allLanguages: () => ["javascript", "css", "go"],
  getRoll: ({ sides, rolls }) => {
    let total = 0
    let rolled = []
    for (let i = 0; i < rolls; ++i) {
      const newRoll = Math.floor(Math.random() * sides) + 1
      total += newRoll
      rolled.push(newRoll)
    }

    return { total, sides, rolls: rolled }
  },
}

const app = express()

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(4000, () => {
  console.log("running on port 4000")
})

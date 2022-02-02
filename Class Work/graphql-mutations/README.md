# GraphQL Mutations

This is a sample GraphQL project for showcasing CRUD operations.

## Data Model

```
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
```

Frameworks have a unique `name` properties that can be used to identify any object in the collection.

## CRUD

This GraphQL API implements `queries` and `mutations` for all standard CRUD operations.

### Create
Create new `Framework`. Passing an already existing `name` will return `null`.
```
addFramework(name: String!, language: Language!, downloads: Int!): Framework
```
### Read
```
allFrameworks: [Framework!]!
getFramework(index: Int!): Framework
firstFramework: Framework
lastFramework: Framework
```
### Update
Update `Framework`. Returns `null` if `name` doesn't belong to any `Framework`.
```
updateFramework(name: String!, language: Language, downloads: Int): Framework
```
### Delete
Delete `Framework`. Returns `null` if `name` doesn't belong to any `Framework`.
```
deleteFramework(name: String!): Framework
```
import { objectType, extendType, nonNull, stringArg, intArg } from "nexus"
import { NexusGenObjects } from "../nexus-typegen" 

export const Link = objectType({
  name: "Link",
  definition(t) {
    t.nonNull.int("id")
    t.nonNull.string("description")
    t.nonNull.string("url")
  }
})

let links: NexusGenObjects["Link"][]= [   // 1
  {
      id: 1,
      url: "www.howtographql.com",
      description: "Fullstack tutorial for GraphQL",
  },
  {
      id: 2,
      url: "graphql.org",
      description: "GraphQL official website",
  },
];

export const FeedQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("feed", {
      type: "Link",
      resolve(parent, args, context, info) {
        return links
      }
    })
  }
})

export const LinkQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("link", {
      type: "Link",
      args: {
        id: nonNull(intArg())
      },
      resolve(parent, args) {
        const { id } = args
        const link = links.find((link) => link.id === id)!

        return link
      }

    })
  }
})

export const PostMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("post", {
      type: "Link",
      args: {
        description: nonNull(stringArg()),
        url: nonNull(stringArg())
      },
      resolve(parent, args, context) {
        const { description, url } = args

        let idCount = links.length + 1
        const link = {
          id: idCount,
          description: description,
          url: url
        }
        links.push(link)

        return link
      }
    })
  }
})

export const UpdateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateLink", {
      type: "Link",
      args: {
        id: nonNull(intArg()),
        url: stringArg(),
        description: stringArg()
      },
      resolve(parent, args) {
        const {id, url, description} = args
        const link = links.find((link) => link.id === id)!

        if (url) link.url = url
        if (description) link.description = description

        return link
      }
    })
  }
})
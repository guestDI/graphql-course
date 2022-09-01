import { createServer } from '@graphql-yoga/node'
import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from './schema.graphql'
import { Query, Mutation, Post, Comment, User } from './resolvers/index.js'
import db from './db'

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Post,
    Comment,
    User
  }
})

const server = createServer({
    schema: executableSchema,
    context: {
        db
    }
  },
)

server.start()
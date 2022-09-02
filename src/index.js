import { createServer, createPubSub } from '@graphql-yoga/node'
import { makeExecutableSchema } from '@graphql-tools/schema'
import typeDefs from './schema.graphql'
import { Query, Mutation, Post, Comment, User, Subscription } from './resolvers/index.js'
import db from './db'

const pubsub = createPubSub()

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Post,
    Comment,
    User
  }
})

const server = createServer({
    schema: executableSchema,
    context: {
        db,
        pubsub
    }
  },
)

server.start()